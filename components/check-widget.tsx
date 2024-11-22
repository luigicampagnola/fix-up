import { FaRegCheckCircle } from "react-icons/fa";

type Props = {
  label: string;
  description?: string;
};

export default function CheckWidget({ label, description }: Props) {
  return (
    <div className="w-1/2 basis-1/2">
      <div className="bg-brightgray rounded-[20px] p-[15px] m-[10px] flex items-center">
        <div className="mr-[10px]">
          <FaRegCheckCircle className="text-forestgreen text-[50px]" />
        </div>
        <div>
          <h4 className="font-bold leading-[1.2] text-[16px] md:text-[18px] lg:text-[19px] text-midnightblue">{label}</h4>
          {description && <p className="text-[12.5px] md:text-[13.5px] lg:text-[14.5px]">{description}</p>}
        </div>
      </div>
    </div>
  );
}
