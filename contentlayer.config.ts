import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import remarkShikiTwoSlash from "remark-shiki-twoslash";
import fs from "fs";

import rehypeAutolinkHeadings from "rehype-autolink-headings";

import rehypePrettyCode, { Options } from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import theme from "@/themes/vars.json" assert { type: "json" };

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

const rehypePrettyCodeOptions: Options = {
  theme: "rose-pine-moon",

  keepBackground: false,
  tokensMap: {
    fn: "entity.name.function",
  },
};

export default makeSource({
  contentDirPath: "./src/",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      //@ts-ignore
      [rehypePrettyCode, rehypePrettyCodeOptions],
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
