import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeading from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";

// This file is used to configure Contentlayer, a content SDK that transforms content into type-safe data
// that can be easily imported into your Next.js application

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "**/*.mdx",
  contentType: "mdx" as const,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
      validation: (tags: string[]) =>
        tags.every((tag) => tag.length <= 30) || // Checks if ALL tags are 30 chars or less
        "Tags must be 30 characters or less", // Error message returned if validation fails
    },
    summary: { type: "string", required: false },
    readingTime: { type: "number", required: true },
  },
  // Define computed fields that will be added to each document
  computedFields: {
    // Define a 'url' field that will be generated for each content document
    url: {
      // Specify that this computed field will be a string type
      type: "string",

      // resolve is a function that generates the URL for each document
      // doc: represents the current document being processed
      // doc._raw.flattenedPath: gets the processed file path without extension
      // returns: a URL string in format '/post/[path]'
      resolve: (doc) => `/post/${doc._raw.sourceFileName.replace('.mdx', '')}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content", // Directory where your MDX files are stored
  documentTypes: [Post], // Schema/types that your content should match
  mdx: {
    rehypePlugins: [
      // rehypeSlug:
      // - Adds unique IDs to all headings in your MDX content
      // - Essential for creating anchor links and table of contents
      // - Example: <h1>Hello</h1> becomes <h1 id="hello">Hello</h1>
      rehypeSlug,

      // rehypeAutolinkHeading:
      // - Adds clickable anchor links to headings
      // - Makes it easy for users to share links to specific sections
      // - Works in conjunction with rehypeSlug
      // - Creates: <h1 id="hello">Hello <a href="#hello">#</a></h1>
      rehypeAutolinkHeading,

      // rehypePrism:
      // - Provides syntax highlighting for code blocks
      // - Supports multiple programming languages
      // - Adds language-specific CSS classes for styling
      // - Must be used with a Prism.js compatible CSS theme
      rehypePrism,
    ],
  },
});
