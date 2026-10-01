import type { DOMNode } from 'html-react-parser';

export const getNodeText = (node: DOMNode): string => {
  if (node.type === 'text') return node.data ?? '';

  if ('children' in node && Array.isArray(node.children)) {
    return node.children
      .map((child) => getNodeText(child as DOMNode))
      .join('');
  }

  return '';
};