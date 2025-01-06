import Link from "./link";
import { Tool, ToolBadge } from "./tools";
import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import NextLink from "next/link";

const ProjectsSection = () => {
  const projects = [
    {
      title: "farfalle",
      description: "Open-source AI answer engine",
      link: "https://github.com/rashadphz/farfalle",
      tools: ["python", "redis"] as Tool[],
      stars: "3k+",
    },
    {
      title: "rush",
      description: "just a cool shell",
      link: "https://github.com/rashadphz/rush",
      tools: ["rust"] as Tool[],
    },
    {
      title: "penne",
      description: "partial python compiler with llvm",
      link: "https://github.com/rashadphz/penne",
      tools: ["ocaml"] as Tool[],
    },
    {
      title: "tarrare",
      description: "campus food delivery app",
      link: "https://github.com/rashadphz/tarrare",
      tools: ["swift"] as Tool[],
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold">projects</h3>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, idx) => (
          <NextLink href={project.link} target="_blank">
            <Card key={idx} className="hover:bg-accent-foreground/20 hover:cursor-pointer transition-all duration-300">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 justify-between">
                <span className="decoration-1 lowercase flex items-center gap-1 text-sm font-medium">
                  {project.title}
                </span>
                {project.stars && (
                  <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-yellow-300 stroke-yellow-300" />
                    <span className="font-mono text-xxs">{project.stars}</span>
                  </div>
                )}
              </div>
              <div className="text-xxs text-muted-foreground lowercase font-mono font-bold">
                {project.description}
              </div>
              <div className="flex flex-row space-x-3 items-center mt-2">
                {project.tools.map((tool) => (
                  <ToolBadge tool={tool} key={tool} />
                ))}
              </div>
            </CardContent>
          </Card>
          </NextLink>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;

