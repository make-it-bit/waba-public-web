import React from 'react';

import { getPageData, getComponentData, getScienceArticles } from '@/lib/strapi';

import {
  AboutScienceHero,
  Skin,
  Wavelengths,
  Beam,
  TextImage,
  LogoBar,
  CTABlock,
  PreFooterCard,
  Footer,
  Spectrum,
  ProblemSolution,
  VerifiedScience,
} from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const sciencePageData = await getPageData('science-behind');
  return {
    title: sciencePageData.attributes.seo?.title ?? '',
    description: sciencePageData.attributes.seo?.description ?? '',
    alternates: {
      canonical: '/science-behind',
    },
    openGraph: {
      images: [
        `/api/og?title=${sciencePageData.attributes.seo?.title ?? ''}&desc=${sciencePageData.attributes.seo?.description ?? ''
        }` || null,
      ],
    },
  };
}

const ScienceBehind = async () => {
  const sciencePageData = await getPageData('science-behind');
  const ctaBlockData = await getComponentData('cta-block');
  const preFooterCardData = await getComponentData('pre-footer-card');
  const footerData = await getComponentData('footer');
  const scienceArticles = await getScienceArticles();
  return (
    <>
      <AboutScienceHero
        title={sciencePageData.attributes.hero.title}
        content={sciencePageData.attributes.hero.description}
        video={sciencePageData.attributes.hero.background_video.data}
        background="bg-black-100"
      />
      <Skin skinData={sciencePageData.attributes.skin.skins.data} />
      <Spectrum spectrumData={sciencePageData.attributes.electromagnetic} />
      <ProblemSolution problemSolutionData={sciencePageData.attributes.problem_solution} />
      <VerifiedScience 
        verifiedScienceData={{
          title: sciencePageData.attributes.verified_science.title, 
          description: sciencePageData.attributes.verified_science.description 
        }}
        scienceArticles={scienceArticles}
      />
      {/* <Photobiomodulation photobiomodulationData={sciencePageData.attributes.photobiomodulation} /> */}
      <Wavelengths 
        wavelengthsData={sciencePageData.attributes.wavelength} 
        secondPartData={sciencePageData.attributes.text_image}
      />
      <Beam beamData={sciencePageData.attributes.beam} />
      <TextImage
        title={sciencePageData.attributes.text_image.title}
        content={sciencePageData.attributes.text_image.description}
        imageSide="right"
        animationImages={sciencePageData.attributes.text_image.animation_images}
      />
      <LogoBar />
      <CTABlock ctaBlockData={ctaBlockData.attributes} />
      <PreFooterCard preFooterCardData={preFooterCardData.attributes} />
      <Footer footerData={footerData.attributes} />
    </>
  );
};

export default ScienceBehind;
