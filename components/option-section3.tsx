import CountyWidget from "./county-widget";

export interface CountyOption {
  image?: {
    url: string;
  };
  title?: string;
  description?: string
  link?: string
}

export interface OptionSection3Props {
  title?: string;
  subtitle?: string;
  description?: string;
  countyOptions?: CountyOption[];
  bottomDescription?: string;
};

export default function OptionSection3({
  title,
  subtitle,
  description,
  countyOptions,
  bottomDescription
}: OptionSection3Props) {

  return (
    <section className="flex flex-col items-center overflow-hidden relative">
      <div className="bg-platinum top-0 left-0 rounded-none w-full h-full absolute opacity-80" />
      <div className="max-w-7xl basis-11/12 w-11/12 lg:basis-10/12 md:w-10/12 z-10 pt-12 pb-16 flex flex-col items-center lg:justify-start">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-midnightblue text-[30px] md:text-[50px] leading-none uppercase text-center pt-[50px]">
            {title} <span className="text-forestgreen">{subtitle}</span>
          </h1>
          {description && (
            <div
              className="text-center text-black lg:text-left md:px-[10px] lg:px-0 py-7 text-[14px] md:text-[15px] lg:text-[16px]"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          )}
          <div className="flex flex-wrap overflow-hidden justify-center">
              {countyOptions && title && 
                countyOptions.map((county, index) => 
                  <div  key={title + index}  className="basis-full w-full md:basis-6/12 md:w-6/12 lg:basis-5/12 lg:w-5/12 px-3 pb-5">
                    <CountyWidget {...county} />
                  </div>
                )
              }
          </div>
          <div className="text-center text-black text-[14px] md:text-[15px]">
            <p>{bottomDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
