import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center bg-white text-slate-800 gap-y-4'>
      <h2 className='text-3xl'>Page Not Found</h2>
      <p>
        The page you’re looking for may have been moved or no longer exists. Let
        us help you get back on track.
      </p>
      <Link href='/' className='underline'>Return Home</Link>
    </div>
  );
}
