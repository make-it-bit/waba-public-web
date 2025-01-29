import { getImageFullUrl_server } from '@/lib/getImgFullUrl';
import Image from 'next/image';

const ProblemSolution = ({ problemSolutionData }) => {
  return (
    <div className="md:py-160 py-72">
      <div className="container">
        <div className="grid grid-cols-12 md:gap-y-160 gap-y-72">
          <div className="lg:col-start-2 col-start-1 lg:col-span-10 col-span-12">
            {problemSolutionData.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col lg:flex-row md:gap-10 gap-6 mb-20"
              >
                {index % 2 !== 0 ? (
                  <>
                    <div className="w-full lg:w-1/2 flex items-stretch order-1">
                      <div className="relative w-full h-[300px] lg:h-full">
                        <Image
                          src={getImageFullUrl_server(item.image.data)}
                          alt="electromagnetic spectrum"
                          quality={100}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 flex items-stretch order-2">
                      <div className="flex flex-col justify-between md:ml-48 w-full">
                        <div className="border-black-100 border-b pb-5">
                          <h3 className="font-rufina text-3xl">{item.title}</h3>
                          <p className="text-base leading-bas mt-10">Problem</p>
                          <p className="text-xs leading-xs mt-3">{item.problem}</p>
                        </div>
                        <div className="border-black-100 border-b pb-5">
                          <p className="text-base leading-bas mt-5">The WABA Solution</p>
                          <p className="text-xs leading-xs mt-3">{item.solution}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full lg:w-1/2 flex items-stretch order-2 lg:order-1">
                      <div className="flex flex-col justify-between md:ml-48 w-full">
                        <div className="border-black-100 border-b pb-5">
                          <h3 className="font-rufina text-3xl">{item.title}</h3>
                          <p className="text-base leading-bas mt-10">Problem</p>
                          <p className="text-xs leading-xs mt-3">{item.problem}</p>
                        </div>
                        <div className="border-black-100 border-b pb-5">
                          <p className="text-base leading-bas mt-5">The WABA Solution</p>
                          <p className="text-xs leading-xs mt-3">{item.solution}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 flex items-stretch order-1 lg:order-2">
                      <div className="relative w-full h-[300px] lg:h-full">
                        <Image
                          src={getImageFullUrl_server(item.image.data)}
                          alt="electromagnetic spectrum"
                          quality={100}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolution;
