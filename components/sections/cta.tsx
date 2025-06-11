import { CustomLink } from '../shared/custom-link';
import Section from '../shared/section';
import { cn } from '@/lib/utils';

/*
  Improvement: 
  1. change button for link which is more descriptive
  2. standarize the parameter subtitle to camelcase subTitle
*/
export interface CtaSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  button: {
    label: string;
    url: string;
  };
}

export default function Cta({
  title,
  subtitle,
  description,
  button,
  className,
}: CtaSectionProps) {
  return (
    <Section
      name="cta"
      className="flex flex-col items-center relative bg-secondary"
    >
      <div className="container py-20">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-4xl desktop:text-4xl font-bold tracking-tight text-background capitalize text-center">
            {title} <span className="text-primary">{subtitle}</span>
          </h2>
          <p className="max-w-4xl text-background text-center text-lg">
            {description}
          </p>
        </div>
        {button && (
          <div className="text-center mt-8">
            <CustomLink
              url="/estimates"
              className={cn('capitalize', className)}
            >
              {button?.label}
            </CustomLink>
          </div>
        )}
      </div>
    </Section>
  );
}
