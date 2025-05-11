import React from 'react';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { CustomImage } from './custom-image';
import { cn } from '@/lib/utils';
import { CustomLink } from './custom-link';

interface MarkdownParserProps {
  content: string;
  className?: string;
}

const MarkdownParser: React.FC<MarkdownParserProps> = ({
  content,
  className,
}) => {
  const components = {
    h1: (props: React.ComponentPropsWithoutRef<'h1'>) => <h2 {...props} />,
    img: ({ src, alt }: { src?: string; alt?: string; caption?: string }) => (
      <CustomImage
        url={src || '/placeholder.jpg'}
        alternativeText={alt || 'Image'}
        width={800}
        height={600}
        className='rounded-lg shadow-md'
      />
    ),
  };

  return (
    <div
      className={cn(
        'prose prose-neutral dark:prose-invert max-w-3xl mx-auto',
        className
      )}
    >
      <MDXRemote
        source={content}
        components={components}
        // extend extra capabilities
        // options={{
        //   mdxOptions: {
        //     remarkPlugins: [remarkGfm],
        //     rehypePlugins: [rehypeRaw],
        //   },
        // }}
      />
    </div>
  );
};

export default MarkdownParser;
