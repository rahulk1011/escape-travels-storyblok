"use client";
import { storyblokEditable, StoryblokServerRichText } from '@storyblok/react/rsc';

const Tour = (props: any) => {
  return (
    <main {...storyblokEditable(props.blok)} className="tour-page-main container mx-auto px-4 w-full pt-32 pb-16">
      <h1 className='text-3xl md:text-5xl font-bold'>
        {props.blok.name}
      </h1>
      <img className='mt-12' src={props.blok.main_image.filename} alt={props.blok.main_image?.alt || props.blok.name} 
      />
      <p className='mt-12 text-lg md:text-2xl md:leading-relaxed'>
        {props.blok.introduction}
      </p>
      <div className='prose md:prose-lg mt-16 max-w-none'>
        <StoryblokServerRichText doc={props.blok.body} />
      </div>
    </main>
  );
}

export default Tour;