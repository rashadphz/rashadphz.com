// @ts-nocheck
import { cn } from "@/lib/utils";
import { useMDXComponent } from "next-contentlayer/hooks";
import "@/styles/mdx.css";
import { Callout } from "./callout";
import { Video } from "./video";
import { Image } from "./Image";
import Link from "./link";
import { Code, Pre } from "./code-and-pre";

interface MdxProps {
  code: string;
}

const lineNumbersStyle =
  "[counter-reset:line] before:[&>span]:mr-3 before:[&>span]:inline-block before:[&>span]:w-4 before:[&>span]:text-right before:[&>span]:text-white/20 before:[&>span]:![content:counter(line)] before:[&>span]:[counter-increment:line]";

const components = {
  h1: ({ className, ...props }) => (
    <h1 className={cn("", className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn("", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn("", className)} {...props} />
  ),
  h4: ({ className, ...props }) => (
    <h4 className={cn("", className)} {...props} />
  ),
  h5: ({ className, ...props }) => (
    <h5 className={cn("", className)} {...props} />
  ),
  h6: ({ className, ...props }) => (
    <h6 className={cn("", className)} {...props} />
  ),
  a: ({ className, ...props }) => (
    <Link hideArrow className={cn("", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("text-foreground", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "border-accent-foreground [&>*]:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("rounded-md border-2", className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th className={cn("", className)} {...props} />
  ),
  td: ({ className, ...props }) => (
    <td className={cn("", className)} {...props} />
  ),

  figcaption: ({ className, ...props }) => {
    // Hardcoding colors, light mode is not supported
    return (
      <figcaption
        className={cn(
          "not-prose px-3 py-1 font-mono text-sm underline underline-offset-2 bg-brown text-primary",
          className
        )}
        {...props}
      />
    );
  },
  figure: ({ className, ...props }) => {
    // Hardcoding colors, light mode is not supported
    return (
      <figure
        className={cn("not-prose overflow-hidden rounded-lg", className)}
        {...props}
      />
    );
  },
  pre: ({ className, ...props }) => {
    return (
      <pre
        className={cn(
          "bg-code-background not-prose overflow-x-auto py-3 text-sm leading-5 border rounded-lg",
          className
        )}
        {...props}
      />
    );
  },
  code: ({ className, ...props }) => {
    const showLineNumbers = "data-line-numbers" in props;
    const isInline =
      typeof props.children === "string" || props.children.type !== undefined;

    return (
      <code
        className={cn(
          "not-prose bg-transparent",
          {
            "not-prose grid [&>span]:border-l-4 [&>span]:border-l-transparent [&>span]:pl-2 [&>span]:pr-3":
              !isInline,
            "border px-[0.25rem] py-[0.05rem] text-sm font-semibold rounded-md ":
              isInline,

            [lineNumbersStyle]: showLineNumbers,
          },
          className
        )}
        {...props}
      />
    );
  },

  Image,
  Callout,
  Video,
  //   Card: MdxCard,
};

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx prose dark:prose-invert">
      <Component components={components} />
    </div>
  );
}
