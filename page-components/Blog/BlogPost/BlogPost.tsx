import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import styles from './_blogPost.module.scss';

const BlogPost = ({ content }) => {
  return (
    <div className="container mb-32">
      <div className="grid grid-cols-12">
        <div className="xl:col-start-4 xl:col-span-6 lg:col-start-3 lg:col-span-8 col-span-12 text-justify">
          <ReactMarkdown rehypePlugins={[rehypeRaw]} className={styles.styles}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
