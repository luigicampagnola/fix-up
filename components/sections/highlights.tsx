import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { cn } from '@/lib/utils';
import { CustomLink } from '../shared/custom-link';
import { FadeSlideUp } from '../shared/animations';
import { IconCircleCheck, IconShieldCheck } from '@tabler/icons-react';
import Section from '../shared/section';
import { Link } from '@/utils/types';
import clsx from 'clsx';

type Highlight = {
  title: string;
  description: string;
};
export interface HighlightsProps {
  label?: string;
  title: string;
  subTitle?: string;
  description?: string;
  items?: Highlight[];
  cta?: Link;
  gridDisplay: boolean;
  background: 'default' | 'gray';
}

export default function Highlights({
  label,
  title,
  subTitle,
  description,
  items,
  cta,
  gridDisplay = false,
  background = 'default',
}: HighlightsProps) {
  return (
    <Section
      name='option-section'
      className={clsx('flex flex-col items-center relative', {
        'bg-background': !background || background === 'default',
        'bg-muted': background === 'gray',
      })}
    >
      <div className='container py-24'>
        <div
          className={clsx('max-w-4xl mx-auto', {
            'w-full max-w-full': gridDisplay == true,
          })}
        >
          {label && (
            <div className='py-2 flex items-center justify-center gap-2 px-4 rounded-full bg-primary/5 text-primary w-fit mx-auto'>
              <IconShieldCheck className='h-4 w-4' />
              <span className='text-sm font-semibold capitalize'>{label}</span>
            </div>
          )}
          <div className='text-center my-8'>
            <h2 className='text-4xl desktop:text-5xl font-bold tracking-tight text-foreground capitalize'>
              {title}
            </h2>
            <h3 className='text-4xl font-bold text-primary capitalize'>
              {subTitle}
            </h3>
            {description && <p className='my-4'>{description}</p>}
          </div>

          <div
            className={clsx({
              'grid tablet:grid-cols-2 gap-4': gridDisplay,
              'space-y-4': gridDisplay === false || !gridDisplay,
            })}
          >
            {items &&
              items.map(({ title, description }, index) => (
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
                    <CardHeader className={clsx({ 'pb-2': description })}>
                      <div className='flex items-center gap-3'>
                        <div
                          className={
                            'flex items-center justify-center rounded-full p-1 text-primary/90 group-hover:text-primary transition-colors duration-300'
                          }
                        >
                          <IconCircleCheck className='h-6 w-6' />
                        </div>
                        <CardTitle className='text-lg font-semibold'>
                          {title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    {description && (
                      <CardContent>
                        <CardDescription className='text-foreground text-sm leading-relaxed'>
                          {description}
                        </CardDescription>
                      </CardContent>
                    )}
                  </Card>
                </FadeSlideUp>
              ))}
          </div>

          {cta && (
            <FadeSlideUp className='mt-10 text-center'>
              <CustomLink size='lg' className='capitalize' {...cta} />
            </FadeSlideUp>
          )}
        </div>
      </div>
    </Section>
  );
}
