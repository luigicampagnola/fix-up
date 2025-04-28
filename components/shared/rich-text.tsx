'use client';
import {
  BlocksRenderer,
  type BlocksContent,
} from '@strapi/blocks-react-renderer';
import { CustomLink } from './custom-link';
import { cn } from '@/lib/utils';
import { CustomImage } from './custom-image';

export default function RichText({
  content,
  className = '',
}: {
  content: BlocksContent;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'prose prose-neutral dark:prose-invert max-w-3xl mx-auto',
        className
      )}
    >
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => <p>{children}</p>,
          heading: ({ children, level }) => {
            const Tag = `h${level}` as keyof JSX.IntrinsicElements;
            return <Tag>{children}</Tag>;
          },
          link: ({ children, url }) => (
            <CustomLink
              url={url}
              variant='link'
              className='text-primary hover:underline no-underline'
            >
              {children}
            </CustomLink>
          ),
          list: ({ children, format }) => (
            <>
              {format === 'ordered' ? <ol>{children}</ol> : <ul>{children}</ul>}
            </>
          ),
          'list-item': ({ children }) => <li>{children}</li>,
          quote: ({ children }) => <blockquote>{children}</blockquote>,
          code: ({ children }) => (
            <pre>
              <code>{children}</code>
            </pre>
          ),
          image: ({ image }) => (
            <figure>
              <div className='relative w-full'>
                <CustomImage
                  url={image.url}
                  alternativeText={image.alternativeText || ''}
                  width={image.width || 800}
                  height={image.height || 600}
                  sizes='(max-width: 768px) 100vw, 768px'
                  className='rounded-md object-cover'
                  priority={false}
                />
              </div>
              {image.caption && (
                <figcaption className='text-center'>{image.caption}</figcaption>
              )}
            </figure>
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong>{children}</strong>,
          italic: ({ children }) => <em>{children}</em>,
          underline: ({ children }) => <u>{children}</u>,
          strikethrough: ({ children }) => <del>{children}</del>,
          code: ({ children }) => <code>{children}</code>,
        }}
      />
    </div>
  );
}
