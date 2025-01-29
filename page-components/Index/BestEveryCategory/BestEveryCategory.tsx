import Image from 'next/image';
import { Button } from '@/gui-components/client';
import Link from 'next/link';

const BestEveryCategory = () => {
  const currentImage = '/device-hand.png';
  return (
    <div className="bg-[#F3ECEE]">
      <div className="container">
        <div className="grid grid-cols-12 md:mb-[80px] mb-[80px] pt-[300px] md:pt-[80px] md:gap-10">
          <div className="block md:hidden col-span-12 relative">
            <Image
              src={currentImage}
              alt="waba device"
              width={500}
              height={350}
              quality={100}
              className="absolute bottom-0 z-10"
            />
          </div>
          <div className="bg-white-100 md:col-span-5 col-span-12 p-10 border-2 border-black-100 z-0">
            <h3 className="text-3xl font-rufina">The Best in Every Category</h3>
            <ul className="text-sm leading-sm lg:mt-7 mt-7 lg:mb-7 mb-7 list-disc pl-7">
              <li className="p-2">Fast results from just 3 minutes every other day.</li>
              <li className="p-2">More than 3000mW of power brings salon-grade results.</li>
              <li className="p-2">Safe for all skin types.</li>
              <li className="p-2">Blue, red and infrared light included to cover all the needs.</li>
              <li className="p-2">Wireless. Easy to use on the go, even over SPF.</li>
            </ul>
            <Link href="/product">
              <Button style="tertiary" otherClassnames='w-full' CTA={'Shop now'} svg />
            </Link>
          </div>
          <div className="hidden md:block md:col-span-6 col-span-12 relative">
            <Image
              src={currentImage}
              alt="waba device"
              width={700}
              height={350}
              quality={100}
              className="absolute left-[50px] -bottom-[80px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestEveryCategory;