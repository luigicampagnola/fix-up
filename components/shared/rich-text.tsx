'use client';
import {
  BlocksRenderer,
  type BlocksContent,
} from '@strapi/blocks-react-renderer';
import { CustomLink } from './custom-link';

export interface RichTextProps extends BlocksContent {}
export default function RichText({ content }: { content: RichTextProps }) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => (
          <p className='text-foreground desktop:prose-lg'>{children}</p>
        ),
        // ...or point to a design system
        // heading: ({ children, level }) => {
        //   switch (level) {
        // case 1:
        //   return <Typography variant='h1'>{children}</Typography>;
        // case 2:
        //   return <Typography variant='h2'>{children}</Typography>;
        // case 3:
        //   return <Typography variant='h3'>{children}</Typography>;
        // case 4:
        //   return <Typography variant='h4'>{children}</Typography>;
        // case 5:
        //   return <Typography variant='h5'>{children}</Typography>;
        // case 6:
        //   return <Typography variant='h6'>{children}</Typography>;
        // default:
        //   return <Typography variant='h1'>{children}</Typography>;
        //   }
        // },

        link: ({ children, url }) => (
          <CustomLink url={url} variant='link'>
            {children}
          </CustomLink>
        ),
      }}
      modifiers={{
        bold: ({ children }) => <strong>{children}</strong>,
        italic: ({ children }) => <span className='italic'>{children}</span>,
      }}
    />
  );
}
