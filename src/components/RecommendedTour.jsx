import Link from "next/link";

export const RecommendedTour = (props) => {
  return (
    <div className="bg-sky-950 rounded-lg shadow border-2 border-sky-950">
      <img className="aspect-video rounded-lg object-cover w-full" src={props.story.content.main_image.filename} alt={props.story.content.main_image?.alt || props.story.content.name} />
      <div className="p-8">
        <div className="flex gap-4 justify-between text-lg font-bold">
          <h3 className="text-white">{props.story.content.name}</h3>
          <p className="text-white font-normal">Starts From:{' '}
            {Number(props.story.content.price).toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 0,
            })}
          </p>
        </div>
        <p className="text-white uppercase font-bold mt-2 text-sm tracking-wide">{props.story.content.location}, India</p>
        <Link className="text-white font-bold text-base mt-8 block underline hover:text-orange-400" href={`/${props.story.full_slug}`}>View Tour</Link>
      </div>
    </div>
  );
};