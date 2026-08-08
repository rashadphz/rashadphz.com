import { allPosts } from "contentlayer/generated";

export const publishedPosts = allPosts.filter((post) => post.published);
