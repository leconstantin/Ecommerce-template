import Link from "next/link";
import { ThemeSwitcher } from "@/components/custom/theme-switcher";

export default function Home() {
  return (
    <>
      <ThemeSwitcher />
      <p>web page</p>
      <Link href="/dashboard"> dashboard</Link>
    </>
  );
}
