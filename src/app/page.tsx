import PlayerXPowerDashboard from "@/components/dashboard/playerXPowerDashboard";
import { Modes, classNames } from "@/utils/util";

export default function Page() {
    return (
        <div className="m-auto w-full h-full bg-black">
            <div
                className={classNames(
                    "text-center text-2xl font-semibold py-5",
                    "sm:text-4xl",
                    "md:text-5xl"
                )}
            >
                Player XRankings
            </div>
            <div>
                <div className=" bg-black flex justify-center">
                    <ul className="flex gap-x-4 justify-center items-center p-4 w-1/2 border-b">
                        {Modes.map((mode) => {
                            return (
                                <li key={mode.id}>
                                    <a href={`#${mode.id}`}>{mode.name}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="flex flex-col items-center">
                    <PlayerXPowerDashboard />
                </div>
            </div>
        </div>
    );
}
