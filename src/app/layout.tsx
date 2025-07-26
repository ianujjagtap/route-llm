import type { Metadata } from "next";
import "@/styles/root-layout.css";
import { fonts } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme";

export const metadata: Metadata = {
  title: "Route LLM | Advance LLM Routing",
  description:
    "Route LLM - An advanced routing solution for large language models (LLMs) that allows you to create complex routing logic with ease.",
  icons: {
    icon: "/logo-dark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        fonts.GeistSans.variable,
        fonts.GeistMono.variable,
        "font-mono"
      )}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
