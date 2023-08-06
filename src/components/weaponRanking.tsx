import { Weapons } from "@/utils/weaponName";
import Image from "next/image";
import React from "react";

type Props = {
    title: string;
    datas: { name: string; value: number }[];
};

const WeaponRanking = React.memo(({ title, datas }: Props) => {
    return (
        <>
            {datas.map((data, index) => {
                const textSize = 23 - index;
                const filename: string = Weapons[data.name];
                let name = "";
                if (filename !== undefined) {
                    name = filename.replace(/\s/g, "_");
                }
                return (
                    <div
                        key={`weaponRanking-${data.name}-${data.value}`}
                        className=""
                    >
                        <Image
                            className="inline "
                            src={`/weapons/${name}.png`}
                            width={40}
                            height={40}
                            alt={name}
                        />
                        <p
                            className={`inline text-center`}
                            style={{
                                fontSize: textSize,
                            }}
                        >
                            {data.name}
                        </p>
                        <p className="inline text-end text-sm p-1 text-gray-700">{`(${data.value})`}</p>
                    </div>
                );
            })}
        </>
    );
});

WeaponRanking.displayName = "WeaponRanking";

export default WeaponRanking;
