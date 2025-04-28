import { PropsWithChildren, useId } from 'react';

export default function Section({
  children,
  name,
  className,
}: { name: string; className: string } & PropsWithChildren) {
  const uniqueId = useId();
  const namePattern = /^[a-z]+(-[a-z]+)*$/;

  const baseId = name.toLowerCase();
  const suffix = uniqueId.replace(/:/g, '');

  if (!namePattern.test(baseId)) {
    throw new Error(
      `Invalid componentName: "${name}". It must use only lowercase letters and hyphens (e.g., "map", "map-header").`
    );
  }
  // generating unique id by section
  const id = `${baseId}-${suffix}`;

  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}
