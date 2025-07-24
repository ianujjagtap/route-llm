import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main
      className={"relative flex h-screen flex-col items-center justify-center"}
    >
      <h1 className="font-bold text-4xl">Welcome to Route LLM</h1>
      <p className="mt-4 text-lg">
        An advanced routing solution for large language models (LLMs).
      </p>
      <ThemeToggle />
    </main>
  );
}
