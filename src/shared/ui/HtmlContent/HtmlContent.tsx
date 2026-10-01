import { useMemo } from "react";
import parse, {
  domToReact,
  Element,
  type DOMNode,
  type HTMLReactParserOptions,
} from "html-react-parser";
import { Typography } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  prism,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import DOMPurify from "dompurify";

import { useTheme } from "@/app/providers/ThemeContext";
import { getNodeText } from "@/shared/lib/html/getNodeText";

const { Title, Paragraph } = Typography;

interface HtmlContentProps {
  html: string;
  sanitize?: boolean;
}

export const HtmlContent = ({ html, sanitize = true }: HtmlContentProps) => {
  const { mode } = useTheme();

  const options: HTMLReactParserOptions = useMemo(
    () => ({
      replace: (domNode) => {
        if (!(domNode instanceof Element)) return domNode;

        if (domNode.name === "h2") {
          return (
            <Title level={3}>
              {domToReact(domNode.children as DOMNode[], options)}
            </Title>
          );
        }

        if (domNode.name === "p") {
          return (
            <Paragraph>
              {domToReact(domNode.children as DOMNode[], options)}
            </Paragraph>
          );
        }

        if (
          domNode.name === "pre" &&
          domNode.children[0] instanceof Element &&
          domNode.children[0].name === "code"
        ) {
          const codeNode = domNode.children[0];
          const languageClass = (
            codeNode.attribs?.class ?? "language-javascript"
          ).replace("language-", "");
          return (
            <SyntaxHighlighter
              language={languageClass}
              style={mode === "dark" ? vscDarkPlus : prism}
              customStyle={{ margin: "10px 0", borderRadius: 5 }}
            >
              {getNodeText(codeNode).trim()}
            </SyntaxHighlighter>
          );
        }

        return domNode;
      },
    }),
    [mode]
  );

  const safeHtml = sanitize ? DOMPurify.sanitize(html) : html;

  return <>{parse(safeHtml, options)}</>;
};
