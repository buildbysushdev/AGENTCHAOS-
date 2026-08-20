import "./globals.css";

export const metadata = {
  title: "AgentChaos - AI Agent Reliability Engine",
  description: "Chaos engineering & red-teaming suite for autonomous AI agents",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-950 text-white selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
