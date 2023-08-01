import NavigationBar from "@/components/navigationBar";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja">
            <body className="bg-black h-full w-full">
                <div className="flex">
                    <div className="flex-[0_0_250px] h-[100dvh]">
                        <NavigationBar />
                    </div>
                    <div className="flex-1">{children}</div>
                </div>
            </body>
        </html>
    );
}
