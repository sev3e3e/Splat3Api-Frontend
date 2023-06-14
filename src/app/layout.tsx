import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja">
            <body className="bg-black h-full w-full">{children}</body>
        </html>
    );
}
