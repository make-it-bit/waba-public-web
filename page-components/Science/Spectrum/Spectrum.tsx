import { getImageFullUrl_server } from '@/lib/getImgFullUrl';
import Image from 'next/image';

const Spectrum = ({ spectrumData }) => {
  return (
    <div className="md:pb-[108px]">
      <div className="container">
        <div className="flex flex-col">
          <div className="grid grid-cols-12">
            <div className="col-span-12 text-center md:mt-160 mt-72 md:mb-88 mb-40">
              <h1 className="font-rufina sm:text-4xl text-4xl sm:leading-4xl leading-3xl">
                {spectrumData.title}
              </h1>
              <p className="leading-3xl pt-5">
                {spectrumData.description}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div className="overflow-x-auto md:overflow-x-visible scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ WebkitOverflowScrolling: 'touch' }}>
              <Image
                src={getImageFullUrl_server(spectrumData.image.data)}
                alt="electromagnetic spectrum"
                quality={100}
                width={700}
                height={700}
                className="w-[1200px] md:w-full max-w-none md:max-w-full h-full object-cover inset-0"
                style={{ height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Spectrum;