import { getComponentData } from '@/lib/strapi';
import { Footer } from '@/page-components';
import SuccessContent from './SuccessContent';

const SuccessPage = async () => {
  const footerData = await getComponentData('footer');

  return (
    <>
      <SuccessContent />
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default SuccessPage; 