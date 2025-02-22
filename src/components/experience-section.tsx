"use client";
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
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useRef } from "react";
import { Tool, ToolBadge } from "./tools";

type Experience = {
  duration: string;
  company: string;
  role: string;
  companyUrl: string;
  description: string;
  location: string;
  tools: Tool[];
  companyLogo: string;
  logoClassName?: string;
};

const experiences: Experience[] = [
  {
    duration: "current",
    company: "OpenAI",
    role: "member of technical staff",
    companyUrl: "https://openai.com",
    description: "full stack",
    location: "sf",
    tools: ["python", "typescript"],
    companyLogo: "/images/openai.png",
    logoClassName: "invert dark:invert-0",
  },
  {
    duration: "2024-25",
    company: "Glean",
    role: "engineering",
    companyUrl: "https://glean.com",
    description: "workflows + llm-powered features",
    location: "sf",
    tools: ["go", "typescript"],
    companyLogo: "/images/glean.png",
  },
  {
    duration: "2023",
    company: "Stripe",
    role: "engineering intern",
    companyUrl: "https://stripe.com",
    description: "added a lot of payment methods",
    location: "nyc",
    tools: ["ruby", "spark"],
    companyLogo: "/images/stripe.png",
  },
  {
    duration: "2022",
    company: "Meta",
    role: "meta university intern",
    companyUrl: "https://meta.com",
    description: "made an app",
    location: "sf",
    tools: ["swift", "graphql"],
    companyLogo: "/images/meta.png",
  },
  {
    duration: "2021",
    company: "Yext",
    role: "engineering intern",
    companyUrl: "https://yext.com",
    description: "worked on yext pages",
    location: "dc",
    tools: ["react", "go"],
    companyLogo: "/images/yext.png",
  },
];

const LocationBadge = ({ location }: { location: string }) => {
  return (
    <div className="inline-flex items-center px-1 py-0.5 font-semibold rounded-md text-xxs font-mono bg-accent text-primary">
      {location}
    </div>
  );
};

const ExperienceSection = () => {
  return (
    <div className="">
      <h3 className="text-lg font-semibold">experience</h3>
      <Accordion className="w-full mt-3 space-y-2" type="single" collapsible>
        {experiences.map(
          ({
            company,
            role,
            location,
            duration,
            description,
            tools,
            companyLogo,
            logoClassName,
          }) => (
            <AccordionItem
              value={company}
              key={company}
              className="border-b border-dashed border-slate-200 dark:border-neutral-700 !py-1 !my-0 hover:bg-muted transition-all duration-300 ease-in-out rounded-md px-1"
            >
              <AccordionTrigger
                className="flex items-center justify-between w-full py-1"
                hideTrigger
              >
                <div className="flex space-x-2 items-center">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center h-5 w-5">
                      <Image
                        src={companyLogo}
                        alt={`${company} logo`}
                        width={20}
                        height={20}
                        className={`object-contain rounded-sm ${logoClassName}`}
                      />
                    </div>
                    <div className="flex flex-row space-x-3 items-center">
                      <span className="text-sm group-hover:text-primary/90">
                        {company}
                      </span>
                      <span className="text-xs text-muted-foreground font-bold font-mono tracking-tighter">
                        {role}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row space-x-3 items-center">
                  <div className="hidden sm:block">
                    <LocationBadge location={location} />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {duration}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 mt-2 ">
                  <span className="text-xs text-muted-foreground font-mono">
                    - {description}
                  </span>
                  <div className="flex flex-row space-x-3 items-center">
                    {tools.map((tool) => (
                      <ToolBadge tool={tool} key={tool} />
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        )}
      </Accordion>
    </div>
  );
};

export default ExperienceSection;
