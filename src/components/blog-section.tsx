import Link from "./link";
import { publishedPosts } from "@/lib/posts";

const BlogSection = () => {
  const posts = publishedPosts;
  return (
    <div>
      <h3 className="text-sm font-medium">notes</h3>
      <div className="mt-3 flex flex-col">
        <ul className="not-prose space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="flex flex-wrap justify-between gap-x-4 gap-y-1">
              <Link
                className="text-prose decoration-1 lowercase"
                href={post.slug}
              >
                {post.title}
              </Link>
              <div className="text-xs text-muted-foreground lowercase">
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
