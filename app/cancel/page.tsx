import { getComponentData } from '@/lib/strapi';
import { Footer } from '@/page-components';
import CancelContent from './CancelContent';

const CancelPage = async () => {
  const footerData = await getComponentData('footer');

  return (
    <>
      <CancelContent />
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default CancelPage; 