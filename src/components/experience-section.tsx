import Image from "next/image";

type Experience = {
  duration: string;
  company: string;
  companyUrl: string;
  companyLogo: string;
  logoClassName?: string;
};

const experiences: Experience[] = [
  {
    duration: "now",
    company: "OpenAI",
    companyUrl: "https://openai.com",
    companyLogo: "/images/openai.jpg",
    logoClassName: "invert dark:invert-0",
  },
  {
    duration: "2024-25",
    company: "Glean",
    companyUrl: "https://glean.com",
    companyLogo: "/images/glean.png",
  },
  {
    duration: "2023",
    company: "Stripe",
    companyUrl: "https://stripe.com",
    companyLogo: "/images/stripe.png",
  },
  {
    duration: "2022",
    company: "Meta",
    companyUrl: "https://meta.com",
    companyLogo: "/images/meta.png",
  },
];

const ExperienceSection = () => {
  return (
    <div className="">
      <h3 className="text-lg font-semibold">experience</h3>
      <div className="mt-3 w-full divide-y divide-slate-200 dark:divide-neutral-800">
        {experiences.map(
          ({ company, duration, companyLogo, logoClassName }) => (
            <div
              key={company}
              className="flex w-full items-center justify-between px-1 py-2.5"
            >
              <div className="flex min-w-0 items-center space-x-2 text-left">
                <div className="flex h-5 w-5 shrink-0 items-center">
                  <Image
                    src={companyLogo}
                    alt={`${company} logo`}
                    width={20}
                    height={20}
                    className={`object-contain rounded-sm ${logoClassName}`}
                  />
                </div>
                <span className="text-sm">{company}</span>
              </div>
              <span className="text-sm text-muted-foreground">{duration}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;
