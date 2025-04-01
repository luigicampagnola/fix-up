import { ImageData, Options } from './types';
import { CheckCircle2, Shield } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { cn } from '@/lib/utils';
import { CustomLink } from './shared/custom-link';
import { FadeSlideUp } from './shared/animations';

type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: ImageData;
  options?: Options[];
  position?: string;
};

export default function OptionSection2({
  title,
  subtitle,
  description,
  image,
  options,
  position,
}: Props) {
  return (
    <section className='flex flex-col items-center relative bg-background'>
      <div className='container py-20'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-center gap-2 px-4 rounded-full bg-primary/5 text-primary w-fit mx-auto'>
            <Shield className='h-4 w-4' />
            <span className='text-sm font-semibold'>Trusted Service</span>
          </div>

          <div className='text-center mt-4 mb-8'>
            <h2 className='text-4xl desktop:text-5xl font-bold tracking-tight text-foreground capitalize'>
              {title}
            </h2>
            <h3 className='text-4xl font-bold text-primary capitalize'>
              {subtitle}
            </h3>
          </div>

          <div className='space-y-4'>
            {options &&
              options.map(({ label, description }, index) => (
                <FadeSlideUp
                  key={`options-item-${index}`}
                  className='group'
                  index={index}
                >
                  <Card
                    className={cn(
                      'transition-all duration-300 border-primary/20 shadow-sm group-hover:shadow-md group-hover:border-primary/20'
                    )}
                  >
                    <CardHeader className='pb-2'>
                      <div className='flex items-center gap-3'>
                        <div
                          className={
                            'flex items-center justify-center rounded-full p-1 text-primary/90 group-hover:text-primary transition-colors duration-300'
                          }
                        >
                          <CheckCircle2 className='h-6 w-6' />
                        </div>
                        <CardTitle className='text-lg font-semibold'>
                          {label}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className='text-foreground text-sm leading-relaxed'>
                        {description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </FadeSlideUp>
              ))}
          </div>

          <FadeSlideUp className='mt-10 text-center'>
            <CustomLink url='/estimates' size='lg' className='uppercase'>
              Schedule a consultation
            </CustomLink>
          </FadeSlideUp>
        </div>
      </div>
    </section>
  );
}
