"use client";
import { storyblokEditable, StoryblokServerRichText } from '@storyblok/react/rsc';

const Tour = (props: any) => {
  return (
    <main {...storyblokEditable(props.blok)} className="tour-page-main container mx-auto px-4 w-full pt-16 pb-16">
      <h1 className='text-3xl md:text-5xl font-bold'>
        {props.blok.name}
      </h1>
      <img className='mt-12' src={props.blok.main_image.filename} alt={props.blok.main_image?.alt || props.blok.name} />
      <p className='mt-12 text-lg md:text-2xl md:leading-relaxed'>
        {props.blok.introduction}
      </p>
      <div className='tour-body-main mt-12'>
        <div className='image-container'>
          <img className='img-secondary' src={props.blok.secondary_image.filename} alt={props.blok.secondary_image?.alt || props.blok.name}/>
        </div>
        <div className='content-container'>
          <StoryblokServerRichText doc={props.blok.body} />
        </div>
      </div>
    </main>
  );
}

export default Tour;