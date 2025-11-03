import Chat from "@/components/chat/use-chat";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <Chat />
    </>
  );
}
