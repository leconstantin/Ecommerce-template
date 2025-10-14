export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import LogoSquare from "@/components/custom/logo-square";
import cImg from "@/public/login-cover-2.jpg";

const { SITE_NAME } = process.env;
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-8">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            href="/"
            prefetch={true}
          >
            <LogoSquare />
            <div className="ml-2 flex-none font-medium text-sm uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs px-2 md:px-0">{children}</div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-muted lg:block">
        <Image
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-300 ease-in-out hover:scale-105"
          placeholder="blur"
          src={cImg}
        />
      </div>
    </div>
  );
}
