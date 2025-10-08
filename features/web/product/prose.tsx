/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
import clsx from "clsx";

const Prose = ({ html, className }: { html: string; className?: string }) => (
  <div
    className={clsx(
      "prose mx-auto prose-headings:mt-8 prose-ol:mt-8 prose-ul:mt-8 max-w-6xl prose-ol:list-decimal prose-ul:list-disc prose-ol:pl-6 prose-ul:pl-6 prose-headings:font-semibold prose-a:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-headings:text-black prose-strong:text-black text-base text-black leading-7 prose-headings:tracking-wide prose-a:underline prose-a:hover:text-neutral-300 dark:prose-a:text-white dark:prose-headings:text-white dark:prose-strong:text-white dark:text-white",
      className
    )}
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

export default Prose;
