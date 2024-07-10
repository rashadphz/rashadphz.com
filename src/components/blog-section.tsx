import { allPosts } from "contentlayer/generated";
import Link from "./link";

const BlogSection = () => {
  const posts = allPosts;
  return (
    <div>
      <h3>blog</h3>
      <div className="flex flex-col">
        <ul className="not-prose space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="flex flex-row justify-between ">
              <Link
                className="text-prose decoration-1 lowercase"
                href={post.slug}
              >
                {post.title}
              </Link>
              <div className="text-sm text-muted-foreground lowercase">
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
    </div>
  );
};

export default BlogSection;
