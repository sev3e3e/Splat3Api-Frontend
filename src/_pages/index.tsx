export default function Home() {
    return (
        <div className="">
            <div className="flex flex-col  items-center text-center p-4 text-xl">
                Splatoon3 XRanking Stats
            </div>
            <ul className="list-disc list-inside p-3">
                <div>
                    <li>Weapon XPower Rankings</li>
                    <div>モードごとに、XPが高い武器を確認できます。</div>
                </div>
                <div>
                    <li>Usage rate Rankings</li>
                    <div>
                        モードごとに、より使われている武器を確認できます。
                    </div>
                </div>
            </ul>
            <ul className="list-disc list-inside p-3">
                <li>Player XPower Rankings</li>
                <div>モードごとに、XPが高いプレイヤーを確認できます。</div>
            </ul>
        </div>
    );
}
