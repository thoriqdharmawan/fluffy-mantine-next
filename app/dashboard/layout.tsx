import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {/* <main> */}
          {/* <nav>
            <Link href="/">Home</Link>
            <Link href="/notes">Notes</Link>
          </nav> */}
          {children}
        {/* </main> */}
      </body>
    </html>
  );
}
