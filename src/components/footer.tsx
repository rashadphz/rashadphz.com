import Link from "next/link";
import {
  LinkedInLogoIcon,
  TwitterLogoIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <div>
      <Separator />
      <footer className="flex justify-between items-center h-8 py-8">
        <span>Rashad Philizaire</span>
        <div className="flex space-x-3">
          <Link href="https://github.com/rashadphil">
            <GitHubLogoIcon />
          </Link>
          <Link href="https://www.linkedin.com/in/rashadphil/">
            <LinkedInLogoIcon />
          </Link>
          <Link href="https://twitter.com/rashadphz">
            <TwitterLogoIcon />
          </Link>
        </div>
      </footer>
    </div>
  );
}
