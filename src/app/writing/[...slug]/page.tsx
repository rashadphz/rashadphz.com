import { format, parseISO } from "date-fns";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx-components";
import Base from "@/layouts/base";
import { publishedPosts } from "@/lib/posts";
import "@/styles/mdx.css";

interface PostPageProps {
  params: {
    slug: string[];
  };
}
export const generateStaticParams = async () => {
  return publishedPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
};

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = publishedPosts.find((post) => post.slugAsParams === slug);
  return post;
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);
  if (!post) notFound();

  return (
    <Base>
      <article className="">
        <div className="mb-8 text-left">
          <h1 className="text-sm font-medium">{post.title}</h1>
          <time
            dateTime={post.date}
            className="mt-1 block text-xs text-muted-foreground"
          >
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
        </div>
        <Mdx code={post.body.code} />
      </article>
    </Base>
  );
}
