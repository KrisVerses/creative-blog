import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeading from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";

// This file is used to configure Contentlayer, a content SDK that transforms content into type-safe data
// that can be easily imported into your Next.js application

const tagValidation = (tags: string[]) =>
  tags.every((tag) => tag.length <= 30) ||
  "Tags must be 30 characters or less";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "post/**/*.mdx",
  contentType: "mdx" as const,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
      validation: tagValidation, // Error message returned if validation fails
    },
    readingTime: { type: "number", required: true },
    summary: { type: "string", required: true },
    relatedProjects: { type: "list", of: { type: "string" } },
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
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    }
  },
}));

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.mdx",
  contentType: "mdx" as const,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    summary: { type: "string", required: true },
    image: { type: "string", required: false }, // Project preview image path
    status: {
      type: "enum",
      options: ["in-progress", "completed", "planned"],
      required: true
    },
    technologies: { type: "list", of: { type: "string" }, required: true },
    github: { type: "string" },
    demo: { type: "string" }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/project/${doc._raw.sourceFileName.replace('.mdx', '')}`,
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    }
  },
}));

export const Log = defineDocumentType(() => ({
  name: "Log",
  filePathPattern: "logs/**/*.mdx",
  contentType: "mdx" as const,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    projectId: { type: "string", required: true },
    day: { type: "number", required: true },
    progress: { type: "string", required: true },
    challenges: { type: "list", of: { type: "string" } }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    },
    project: {
      type: "nested",
      resolve: async (doc) => {
        // Reference to related project
        const projectSlug = doc.projectId;
        // You would implement logic here to fetch the related project
      }
    }
  }
}));

export default makeSource({
  contentDirPath: "content", // Directory where your MDX files are stored
  documentTypes: [Project, Log, Post], // Schema/types that your content should match
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
