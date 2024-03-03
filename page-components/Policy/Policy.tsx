import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import styles from './_policy.module.scss';

const Policy = ({ policyPageData }) => {
  return (
    <div className="container my-64">
      <div className="text-base leading-base text-justify">
        <ReactMarkdown rehypePlugins={[rehypeRaw]} className={styles.styles}>
          {policyPageData?.attributes.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Policy;
