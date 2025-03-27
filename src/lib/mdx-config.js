import { visit } from 'unist-util-visit';
import rehypePrettyCode from 'rehype-pretty-code';

// Options for rehype-pretty-code
const prettyCodeOptions = {
  // Theme to use for code highlighting
  theme: 'github-dark',
  
  // Use fenced code blocks
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  
  // Callback for each highlighted line
  onVisitHighlightedLine(node) {
    node.properties.className.push('highlighted');
  },
  
  // Callback for each highlighted word
  onVisitHighlightedWord(node) {
    node.properties.className = ['word'];
  },
};

/**
 * MDX Plugin Configuration for ContentLayer
 * 
 * FIX NOTE: This plugin is configured but not currently active in contentlayer.config.ts
 * The current implementation uses rehype-prism-plus instead, which provides simpler
 * but effective syntax highlighting without additional configuration.
 */
export const rehypePrettyCodePlugin = rehypePrettyCode;

/**
 * Options for rehype-pretty-code
 */
export const rehypePrettyCodeOptions = prettyCodeOptions;

/**
 * Custom plugin to wrap code blocks with a div for styling purposes
 * 
 * FIX IMPLEMENTATION NOTES:
 * This plugin transforms the AST (Abstract Syntax Tree) for code blocks by:
 * 1. Finding all <pre><code> combinations in the MDX content
 * 2. Extracting the language information from code element classes
 * 3. Wrapping them with a styled container that includes:
 *    - A language badge in the top-right corner
 *    - Proper styling classes for the code block
 * 
 * While this plugin isn't currently used in the contentlayer.config.ts,
 * a similar approach is implemented directly in MDXComponents.tsx
 * with React components instead of AST transformations.
 */
export function rehypeWrapCode() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.tagName === 'pre' &&
        node.children[0]?.tagName === 'code'
      ) {
        // Extract language information from code element's className
        // Format: language-[lang] → [lang]
        const { className } = node.children[0].properties;
        const lang = className ? className[0]?.split('-')[1] : null;
        
        // Create a wrapper node with language indicator and styling
        const wrapperNode = {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['code-block-wrapper', lang ? `language-${lang}` : '']
          },
          children: [
            // Language badge header
            {
              type: 'element',
              tagName: 'div',
              properties: { className: ['code-block-header'] },
              children: [
                { 
                  type: 'element',
                  tagName: 'span',
                  properties: { className: ['code-block-lang'] },
                  children: [{ type: 'text', value: lang || 'text' }]
                }
              ]
            },
            // The actual code block with additional styling
            { ...node, properties: { ...node.properties, className: [...(node.properties.className || []), 'code-block'] } }
          ]
        };
        
        // Replace the original node with our enhanced wrapper node
        Object.assign(node, wrapperNode);
      }
    });
  };
} 