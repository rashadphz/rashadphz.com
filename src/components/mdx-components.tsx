// @ts-nocheck
import { cn } from "@/lib/utils";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";

interface MdxProps {
  code: string;
}

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
    <a className={cn("", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("text-lg leading-[1.7] text-foreground", className)}
      {...props}
    />
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
    <blockquote className={cn("", className)} {...props} />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
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
  pre: ({ className, ...props }) => {
    return (
      <pre
        className={cn("text-lg border-muted border-2 font-mono", className)}
        {...props}
      />
    );
  },
  code: ({ className, ...props }) => (
    <code className={cn("rounded-xl font-mono", className)} {...props} />
  ),
  Image,
  //   Callout,
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
