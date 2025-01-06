import { FC } from "react";
import { allPosts } from "contentlayer/generated";
import Base from "@/layouts/base";
import Link from "@/components/link";

interface BlogPageProps {}

const BlogPage: FC<BlogPageProps> = () => {
  const posts = allPosts;
  return (
    <Base>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Posts</h2>
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post._id} className="flex flex-col space-y-1">
              <Link href={post.slug}>{post.title}</Link>
              <div className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Base>
  );
};

export default BlogPage;
