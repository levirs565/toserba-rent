import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 pb-12 pt-6">{children}</main>
    </>
  );
}
