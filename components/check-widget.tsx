import { FaRegCheckCircle } from "react-icons/fa";

type Props = {
  label: string;
  description?: string;
};

export default function CheckWidget({ label, description }: Props) {
  return (
    <div className="w-full basis-full lg:w-1/2 lg:basis-1/2">
      <div className="bg-brightgray rounded-[20px] p-[20px] m-[10px] flex flex-col lg:flex-row lg:justify-start items-center lg:items-start">
        <div className="mb-[15px] lg:mb-0 lg:mr-[10px]">
          <FaRegCheckCircle className="text-forestgreen text-[50px]" />
        </div>
        <div className="pt-[8px] pb-[16px]">
          <h4 className="font-bold leading-[1.2] text-[16px] md:text-[18px] lg:text-[19px] text-midnightblue text-center lg:text-left">{label}</h4>
          {description && <p className="text-[12.5px] md:text-[13.5px] lg:text-[14.5px] text-center lg:text-left mt-4">{description}</p>}
        </div>
      </div>
    </div>
  );
}
