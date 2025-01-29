import { getImageFullUrl_server } from '@/lib/getImgFullUrl';
import Image from 'next/image';

const VisibleTransformation = ({ transformationData }) => {
  return (
    <div className="py-[108px] container">
      <div className="text-center">
        <h3 className="font-rufina text-5xl leading-5xl mb-[50px]">{transformationData.title}</h3>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <div className="grid grid-cols-3 md:grid-cols-3 md:gap-10 gap-0">
            <div className="relative w-full h-[150px] md:h-[450px]">
              <Image
                src={getImageFullUrl_server(transformationData.before.data)}
                alt="transformation"
                fill
                quality={100}
                className="object-cover md:object-bottom"
              />
            </div>
            <div className="relative w-full h-[150px] md:h-[450px]">
              <Image
                src={getImageFullUrl_server(transformationData.during.data)}
                alt="transformation"
                fill
                quality={100}
                className="object-cover md:object-bottom"
              />
            </div>
            <div className="relative w-full h-[150px] md:h-[450px]">
              <Image
                src={getImageFullUrl_server(transformationData.after.data[0])}
                alt="transformation"
                fill
                quality={100}
                className="object-cover md:object-bottom"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm leading-sm mt-[25px]">{transformationData.description}</p>
      </div>
    </div>
  );
}

export default VisibleTransformation;
