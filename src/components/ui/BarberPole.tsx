/**
 * El poste de barbería: el cilindro de vidrio con las franjas que suben sin parar.
 * Es puro CSS (sin JS), y con "reducir movimiento" queda quieto.
 */
export function BarberPole({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex flex-col items-center ${className}`}>
      {/* Remate de arriba */}
      <span className="block h-[6%] w-[70%] rounded-t-full bg-ink" />
      <span className="block h-[2.5%] w-full rounded-sm bg-ink" />
      {/* El vidrio con las franjas y el brillo que le da volumen */}
      <span className="relative block w-[78%] flex-1 overflow-hidden">
        <span className="pole-stripes absolute inset-0" />
        <span className="absolute inset-0 bg-[linear-gradient(90deg,rgb(0_0_0/0.35),rgb(255_255_255/0.45)_30%,rgb(255_255_255/0)_55%,rgb(0_0_0/0.4))]" />
      </span>
      <span className="block h-[2.5%] w-full rounded-sm bg-ink" />
      <span className="block h-[6%] w-[70%] rounded-b-full bg-ink" />
    </div>
  );
}
