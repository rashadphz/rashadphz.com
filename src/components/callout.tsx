import { cn } from "@/lib/utils";
import { LightbulbIcon, HelpCircleIcon } from "lucide-react";

const icons = {
  bulb: LightbulbIcon,
  question: HelpCircleIcon,
};

type IconType = keyof typeof icons;

interface CalloutProps {
  icon?: IconType;
  children?: React.ReactNode;
  title?: string;
}

export function Callout({ children, icon, title, ...props }: CalloutProps) {
  const Icon = icon ? icons[icon] : LightbulbIcon;

  return (
    <div
      className={cn(
        "my-6 flex items-start rounded-md border border-l-4 px-5 py-4 border-accent-foreground bg-accent not-prose",
        {}
      )}
      {...props}
    >
      <div className="space-y-1">
        <div className="text-[1.05rem] text-accent-foreground font-bold flex items-center">
          {icon && <Icon size={17} className="mr-1 text-accent-foreground" />}
          {title}
        </div>
        <div className="text-base text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
