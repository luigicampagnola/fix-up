import { FaRegCheckCircle } from "react-icons/fa";

type Props = {
  label: string;
  description?: string;
  className?: string;
  'data-id'?: string;
};

export default function CheckWidget({ label, description, className, ...props }: Props) {
  return (
    <div 
      className={`w-full basis-full lg:w-1/2 lg:basis-1/2 transition-all duration-700 ease-in-out transform
        hover:scale-105 hover:-translate-y-1 ${className || ''}`} 
      {...props}
    >
      <div className="bg-brightgray rounded-[20px] p-[20px] m-[10px] flex flex-col lg:flex-row lg:justify-start items-center lg:items-start hover:shadow-lg transition-shadow duration-300">
        <div className="mb-[15px] lg:mb-0 lg:mr-[10px]">
          <FaRegCheckCircle className="text-forestgreen text-[50px] transform transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="pt-[8px] pb-[16px]">
          <h4 className="font-bold leading-[1.2] text-[16px] md:text-[18px] lg:text-[19px] text-midnightblue text-center lg:text-left">{label}</h4>
          {description && <p className="text-[12.5px] md:text-[13.5px] lg:text-[14.5px] text-center lg:text-left mt-4">{description}</p>}
        </div>
      </div>
    </div>
  );
}