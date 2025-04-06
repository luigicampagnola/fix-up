import { CustomImage } from '../shared/custom-image';
import { fetchAPI } from '@/utils/api';
import { Review } from '@/utils/types';
import { ReviewSlider } from '../elements/reviews-slider';

interface GoogleReviewsProps {
  title: string;
  total: number;
  comments: Review[];
}
export default async function GoogleReviews() {
  const { data } = await fetchAPI<{ reviews: GoogleReviewsProps }>({
    path: '/api/global',
    query: {
      populate: {
        reviews: {
          fields: ['title', 'total'],
          populate: {
            comments: {
              fields: ['name', 'content', 'date', 'rate'],
            },
          },
        },
      },
    },
  });
  const { reviews } = data;

  if (!reviews)
    return (
      <div className='bg-destructive/40 text-center p-4'>
        Error while getting the reviews data...
      </div>
    );

  const { comments, title, total } = reviews;
  const commentReviews =
    comments && comments.length > 0 ? comments.slice(0, 6) : [];

  return (
    <section className='px-4 py-12 bg-background rounded-md shadow-md flex flex-col items-center'>
      <h4 className='text-3xl font-bold'>{title}</h4>
      <ReviewSlider reviews={commentReviews} />
      <div className='mt-4 inline-flex gap-2 items-center justify-center'>
        <p className='text-xs text-right tracking-tighter'>{`${total} reviews posted on `}</p>
        <CustomImage
          className='w-10 h-auto'
          url='/google-logo.svg'
          alternativeText='Google Logo'
          width={90}
          height={30}
          localImage
        />
      </div>
    </section>
  );
}
