import { Button, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="container not-found">
      <div className="lost-robot" aria-hidden="true">
        <div className="robot-antenna" />
        <div className="robot-face">
          <i />
          <i />
        </div>
        <div className="missing-blueprint">
          404<span>BLUEPRINT NOT FOUND</span>
        </div>
      </div>
      <Eyebrow>A SMALL DETOUR</Eyebrow>
      <h1>This page didn’t make it through the factory.</h1>
      <p>
        The link may have moved, or the blueprint never existed. Let’s get you
        back to something useful.
      </p>
      <div className="actions">
        <Button href="/">Back to the workshop</Button>
        <Button href="/services" variant="secondary">
          Explore services
        </Button>
        <Button href="/contact" variant="text">
          Contact us
        </Button>
      </div>
    </section>
  );
}
