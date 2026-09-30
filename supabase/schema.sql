-- Black Line: tabla de reservas.
-- Correr UNA vez en Supabase → SQL Editor → New query → pegar todo → Run.

-- Permite combinar "=" (mismo barbero) con "&&" (horarios que se pisan)
-- en una misma restricción. Viene incluida en Supabase.
create extension if not exists btree_gist with schema extensions;

create table if not exists public.bookings (
  id                  uuid primary key default gen_random_uuid(),
  service_id          text not null check (char_length(service_id) between 1 and 50),
  barber_id           text not null check (char_length(barber_id) between 1 and 50),
  starts_at           timestamptz not null,
  ends_at             timestamptz not null,
  customer_name       text not null check (char_length(customer_name) between 2 and 80),
  customer_phone      text not null check (char_length(customer_phone) between 8 and 20),
  customer_email      text check (customer_email is null or char_length(customer_email) <= 254),
  -- IP hasheada con SHA-256 (64 caracteres). Nunca guardamos la IP real.
  ip_hash             text not null check (char_length(ip_hash) = 64),
  -- Prueba de que la persona aceptó la política de privacidad (Ley 18.331).
  privacy_accepted_at timestamptz not null,
  created_at          timestamptz not null default now(),

  constraint bookings_valid_range check (ends_at > starts_at),

  -- Impide turnos superpuestos para el mismo barbero, aunque dos pedidos
  -- lleguen exactamente al mismo tiempo. '[)' = el fin no cuenta, así un
  -- turno que termina 10:30 no choca con uno que empieza 10:30.
  constraint bookings_no_overlap exclude using gist (
    barber_id with =,
    tstzrange(starts_at, ends_at, '[)') with &&
  )
);

-- Acelera el conteo del rate limit (reservas por IP en la última hora).
create index if not exists bookings_ip_hash_created_at_idx
  on public.bookings (ip_hash, created_at);

-- Row Level Security activado y SIN políticas: nadie puede leer ni escribir
-- con la clave pública (anon). Solo el servidor, con la service role key.
alter table public.bookings enable row level security;
revoke all on public.bookings from anon, authenticated;

-- Retención (ver /privacidad): borrar reservas viejas.
-- Podés correrlo a mano cada tanto, o programarlo con pg_cron:
--   delete from public.bookings where ends_at < now() - interval '180 days';
