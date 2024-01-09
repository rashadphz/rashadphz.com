import { cn } from "@/lib/utils";
import { LightbulbIcon, HelpCircleIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const icons = {
  bulb: LightbulbIcon,
  question: HelpCircleIcon,
};

type IconType = keyof typeof icons;

interface CalloutProps {
  icon?: IconType;
  children?: React.ReactNode;
  title?: string;
  collapsible?: boolean;
}

export function Callout({
  children,
  icon,
  title,
  collapsible = false,
  ...props
}: CalloutProps) {
  const Icon = icon ? icons[icon] : LightbulbIcon;

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={collapsible ? undefined : "item-1"}
    >
      <AccordionItem value="item-1">
        <div
          className={cn(
            "my-6 flex items-start rounded-md border border-l-4 px-5 py-4 border-accent-foreground bg-accent not-prose",
            {}
          )}
          {...props}
        >
          <div className="space-y-3">
            <AccordionTrigger hideTrigger={!collapsible}>
              <div className="text-[1.05rem] text-accent-foreground font-bold flex items-center">
                {icon && (
                  <Icon size={17} className="mr-1 text-accent-foreground" />
                )}
                {title}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-base text-muted-foreground">{children}</div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
