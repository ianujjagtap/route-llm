import Chat from "@/components/chat/use-chat";
import { ThemeToggle } from "@/components/theme-toggle";
// import { ThemeToggle } from "@/components/theme-toggle";
import { InstallPrompt } from "@/components/pwa/install-prompt";

// function urlBase64ToUint8Array(base64String: string) {
//   const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
//   const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

//   const rawData = window.atob(base64)
//   const outputArray = new Uint8Array(rawData.length)

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i)
//   }
//   return outputArray
// }

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <Chat />
      <InstallPrompt />
    </>
  );
}
