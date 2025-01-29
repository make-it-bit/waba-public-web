import { ParsedMarkup } from '@/utils/parseMarkup';
import React from 'react';

interface MarkupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ParsedMarkup;
}


export const Markup: React.FC<MarkupProps> = ({ content, ...props }: MarkupProps) => {
  return (
    <div {...props}>
      {Object.entries(content).map(([type, values]) => {
        switch (type) {
          case 'heading':
            return values.map((text, index) => (
              <h3 className="text-xl font-rufina" key={`heading-${index}`}>{text}</h3>
            ));
          case 'paragraph':
            return values.map((text, index) => (
              <p className="text-sm leading-sm" key={`paragraph-${index}`}>{text}</p>
            ));
          case 'list':
            return (
              <ul className="text-sm leading-sm lg:mt-32 mt-16 lg:mb-40 mb-32 list-disc pl-7" key="list">
                {values.map((text, index) => (
                  <li className="p-2" key={`list-item-${index}`}>{text}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

