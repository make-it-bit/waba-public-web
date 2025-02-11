import { Badges } from "@/components";
import { getImageFullUrl_server } from "@/lib/getImgFullUrl";
import Image from 'next/image';
import SenjaRating from "../SenjaRating";

const QuoteBar = ({ quoteBarData }) => {
  return (
    <div className="container py-[50px] md:pt-[54px]">
      <Badges otherClassNames="py-[10px]" />
      <div className="text-center flex flex-row md:items-center md:justify-center mt-[50px] md:mt-[100px]">
        <h3 className="font-rufina text-4xl">{quoteBarData.title}</h3>
      </div>
      <div className="grid grid-cols-12 mt-[50px] md:mt-[100px]">
    <div className="col-span-12 md:col-start-3 md:col-span-8">
      <div className="md:hidden flex flex-row justify-center">
        <div className="h-[114px] w-[114px] mb-10">
          <Image
            src={getImageFullUrl_server(quoteBarData.person_image.data)}
            alt="quote from professional"
            width={114}
            height={114}
            quality={100}
            className="object-cover z-0"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="md:block hidden">
          <Image
            src={getImageFullUrl_server(quoteBarData.person_image.data)}
            alt="quote from professional"
            width={114}
            height={114}
            quality={100}
            className="object-cover w-[114px] h-[114px]"
          />
        </div>
        <div className="text-center md:text-left flex flex-col max-w-[650px] md:ml-[20px]">
          <p className="md:text-3xl">{quoteBarData.quote}</p>
          <p className="text-2sm font-bold mt-[8px]">{quoteBarData.name}</p>
          <p className="text-sm mt-[8px]">{quoteBarData.profession}</p>
        </div>
      </div>       
    </div>
    </div>
      <div className="flex flex-row items-center justify-center mt-[50px] md:mt-[100px]">
        <h3 className="font-rufina text-4xl">Happy Users</h3>
      </div>
      <div className="flex flex-row items-center justify-center mt-[50px]">
        <SenjaRating />
      </div>
    </div>
  )
}

export default QuoteBar;