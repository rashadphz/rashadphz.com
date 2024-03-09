import {
  AirflowIcon,
  GoIcon,
  GraphQLIcon,
  PostgresIcon,
  PrismaIcon,
  ReactIcon,
  RubyIcon,
  SparkIcon,
  SwiftIcon,
  TypescriptIcon,
} from "@/icons";
import Link from "./link";

type Experience = {
  duration: string;
  company: string;
  role: string;
  companyUrl: string;
  description: string;
  location: string;
  tools: Tool[];
};

const experiences: Experience[] = [
  {
    duration: "2023",
    company: "Stripe",
    role: "SWE Intern",
    companyUrl: "https://stripe.com",
    description: "Added a lot of payment methods.",
    location: "NYC",
    tools: ["typescript", "ruby", "spark"],
  },
  {
    duration: "2022",
    company: "Meta",
    role: "Meta University Intern",
    companyUrl: "https://meta.com",
    description: "Made an app.",
    location: "SF/MPK",
    tools: ["swift", "graphql", "postgres"],
  },
  {
    duration: "2021",
    company: "Yext",
    role: "SWE Intern",
    companyUrl: "https://yext.com",
    description: "Worked on Yext Pages.",
    location: "DC",
    tools: ["react", "go"],
  },
];

const LocationBadge = ({ location }: { location: string }) => {
  return (
    <div className="inline-flex items-center px-2 py-0.5 font-semibold rounded-md text-xs font-mono bg-accent text-foreground">
      {location}
    </div>
  );
};

const toolIconMap: Record<string, React.FC> = {
  typescript: TypescriptIcon,
  ruby: RubyIcon,
  python: TypescriptIcon,
  swift: SwiftIcon,
  airflow: AirflowIcon,
  postgres: PostgresIcon,
  spark: SparkIcon,
  prisma: PrismaIcon,
  graphql: GraphQLIcon,
  react: ReactIcon,
  go: GoIcon,
};

type Tool = keyof typeof toolIconMap;

const ToolBadge = ({ tool }: { tool: Tool }) => {
  const Icon = toolIconMap[tool];
  return (
    <span className="me-2 items-center px-2 py-0.5 font-semibold rounded-md text-[0.70rem] font-mono border-accent border text-foreground">
      <Icon />
      <span className="ml-2 capitalize">{tool}</span>
    </span>
  );
};

const ExperienceSection = () => {
  return (
    <div className="">
      <h3 className="">Experience</h3>
      <div className="mt-3 flex flex-col space-y-7">
        {experiences.map(
          ({
            company,
            description,
            duration,
            role,
            location,
            tools,
            companyUrl,
          }) => (
            <div key={company} className="space-y-1">
              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-between w-full text-base">
                  <div className="flex space-x-2 items-center">
                    <Link hideArrow href={companyUrl} className="decoration-1">
                      {company}
                    </Link>
                    <LocationBadge location={location} />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {duration}
                  </div>
                </div>
                <span className="flex flex-row items-center space-x-2">
                  <div className="font-mono font-medium text-sm">{role}</div>
                  <div className="text-sm text-muted-foreground">•</div>
                  <div className="text-sm">{description}</div>
                </span>
              </div>
              <div className="">
                {tools.map((tool) => (
                  <ToolBadge key={tool} tool={tool} />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;
