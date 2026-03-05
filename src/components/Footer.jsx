export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='p-4 bg-olive-800 flex'>
      <p className='text-xs text-amber-50 mx-auto'>@Rahul Khan, <span suppressHydrationWarning>{currentYear}</span> - StoryBlok & NextJS</p>
    </footer>
  );
}