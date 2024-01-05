import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";

import rehypeAutolinkHeadings from "rehype-autolink-headings";

import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import {
  rehypePrettyCodeClasses,
  rehypePrettyCodeOptions,
} from "./src/lib/rehypePrettyCode";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (post) => `/${post._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (post) => post._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./src/",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      //@ts-ignore
      [rehypePrettyCode, rehypePrettyCodeOptions],
    //   [rehypePrettyCodeClasses],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: "anchor",
          },
        },
      ],
    ],
  },
});
