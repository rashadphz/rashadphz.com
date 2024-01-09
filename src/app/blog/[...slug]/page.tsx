import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import Base from "@/layouts/base";
import "@/styles/mdx.css";

interface PostPageProps {
  params: {
    slug: string[];
  };
}
export const generateStaticParams = async () => {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
};

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);
  return post;
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  return (
    <Base>
      <article className="">
        <div className="mb-8 text-left">
          <h1 className="text-3xl font-semibold">{post.title}</h1>
          <time
            dateTime={post.date}
            className="block text-sm text-muted-foreground"
          >
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
        </div>
        <Mdx code={post.body.code} />
      </article>
    </Base>
  );
}
