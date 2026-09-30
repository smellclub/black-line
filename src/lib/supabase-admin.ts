// Si alguien importa este archivo desde un componente del navegador,
// el build falla. Así la service role key nunca puede terminar en el bundle.
import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Cliente de Supabase con la service role key. Saltea RLS, así que
 * SOLO se usa en el servidor (Server Actions).
 * Devuelve null si faltan las variables de entorno.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
