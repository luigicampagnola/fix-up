import CheckWidget from "./check-widget";

type Props = {
  title: string;
  secondTitle?: string;
  topDescription?: string;
  options: {
    label: string;
    description?: string;
  }[];
  middleDescription?: string;
  bottomDescription?: string;
};

export default function OptionSection({
  title,
  secondTitle,
  topDescription,
  options,
  middleDescription,
  bottomDescription,
}: Props) {
  return (
    <section className="option-section bg-platinum w-full flex text-[14px] md:text-[15px] lg:text-[16px] font-normal text-black justify-center">
      <div className="basis-10/12 w-10/12 py-[100] flex flex-col items-center">
        <h1 className="text-[30px] md:text-[50px] font-bold uppercase leading-none text-center text-midnightblue">
          {title} <span className="text-forestgreen">{secondTitle}</span>
        </h1>
        {topDescription && <p>{topDescription}</p>}
        <div className="flex flex-wrap">
          {options.map((option) => (
            <CheckWidget
              key={option.label}
              label={option.label}
              description={option.description}
            />
          ))}
        </div>
        {middleDescription && <p>{middleDescription}</p>}
        {bottomDescription && <p>{bottomDescription}</p>}
      </div>
    </section>
  );
}
