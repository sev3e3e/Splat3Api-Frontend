import NavigationBar from "@/components/navigation/navigationBar";
import "./globals.css";
import DateComponent from "@/components/_date";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja" className="dark">
            <body className="h-full w-full dark:bg-[#101010] dark:text-[#babcc4]">
                <div className="flex ">
                    {/* <div className="flex-[0_0_200px] h-[100dvh] ">
                        <NavigationBar />
                    </div> */}
                    {/* <DateComponent /> */}
                    <div className="flex-1">{children}</div>
                </div>
            </body>
        </html>
    );
}
