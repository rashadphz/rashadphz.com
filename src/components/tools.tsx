import {
  AirflowIcon,
  GoIcon,
  GraphQLIcon,
  PostgresIcon,
  PrismaIcon,
  PythonIcon,
  ReactIcon,
  RedisIcon,
  RubyIcon,
  SparkIcon,
  SwiftIcon,
  TypescriptIcon,
  RustIcon,
  OCamlIcon,
} from "@/icons";

export const toolIconMap: Record<string, React.FC> = {
  typescript: TypescriptIcon,
  ruby: RubyIcon,
  python: PythonIcon,
  swift: SwiftIcon,
  airflow: AirflowIcon,
  postgres: PostgresIcon,
  spark: SparkIcon,
  prisma: PrismaIcon,
  graphql: GraphQLIcon,
  react: ReactIcon,
  go: GoIcon,
  redis: RedisIcon,
  rust: RustIcon,
  ocaml: OCamlIcon,
};

export type Tool = keyof typeof toolIconMap;

export const ToolBadge = ({ tool }: { tool: Tool }) => {
  const Icon = toolIconMap[tool];
  return (
      <span className="items-center px-1 py-0.5 font-semibold rounded-md text-[0.60rem] font-mono border-border border text-foreground bg-[#FBF7F5] dark:bg-[#201C1A]">
      <Icon />
      <span className="ml-2 capitalize">{tool}</span>
    </span>
  );
}; 