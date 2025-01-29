enum MarkupType {
  HEADING = 'heading',
  PARAGRAPH = 'paragraph',
  LIST = 'list'
}

type Child = {
  text?: string;
  type?: string;
  children?: Child[];
};

type DataItem = {
  type: MarkupType;
  level?: number;
  format?: string;
  children?: Child[];
};

export type ParsedMarkup = {
  [key: string]: string[];
} ;

export const parseProductMarkup = (data: DataItem[]): ParsedMarkup | null => {
  const result: ParsedMarkup = {} 
  if (!data || data.length === 0) {
    return null;
  }
  const extractText = (children: Child[]): string[] => {
    return children.flatMap(child => {
      const texts: string[] = [];
      if (child.text) {
        texts.push(child.text);
      }
      if (child.children) {
        texts.push(...extractText(child.children));
      }
      return texts;
    });
  };
  data.forEach(({ type, children }) => {
    if (!result[type]) {
      result[type] = [];
    }

    if (children) {
      (result[type] as string[]).push(...extractText(children));
    }
  });

  return result;
}