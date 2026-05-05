import { FloatingNav } from "@/shared/ui/FloatingNav";
import { GoldButton } from "@/shared/ui/GoldButton";
import { GoldDivider } from "@/shared/ui/GoldDivider";

export default function NotFound() {
  return (
    <>
      <FloatingNav items={[{ href: "/", label: "Home" }, { href: "/gallery", label: "Gallery" }]} />
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-codex-gold">Codex Luminara</p>
          <h1 className="mt-4 font-heading text-4xl text-codex-parchment md:text-6xl">Artwork Not Found</h1>
          <GoldDivider width={170} className="mx-auto mt-5" />
          <p className="mt-6 text-lg italic text-codex-parchment/80">
            The requested folio could not be illuminated. Return to the gallery and continue the journey.
          </p>
          <div className="mt-8 flex justify-center">
            <GoldButton href="/gallery" label="Return to Gallery" />
          </div>
        </div>
      </main>
    </>
  );
}
