interface HeroProps {
  title?: string;
}

export const Hero = ({ title }: HeroProps) => {
  return (
    <section className="hero">
      <h1>{title}</h1>
    </section>
  );
};