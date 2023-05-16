import { faker } from "@faker-js/faker";
import styles from "../styles/pages/index.module.css";

import { Tab } from "@headlessui/react";

import { Table } from "@/components/table";
import Title from "@/components/title";

export default function Home() {
    // const ranges = [...Array(25).keys()];
    // const fakeAreaData = ranges.map(() => createRandomXRankingPlayerData(1));
    // const fakeRainmakerData = ranges.map(() =>
    //     createRandomXRankingPlayerData(2)
    // );
    // const fakeTowerData = ranges.map(() => createRandomXRankingPlayerData(3));
    // const fakeClamData = ranges.map(() => createRandomXRankingPlayerData(4));
    return (
        <>
            <div>
                <Title />
            </div>
            <div className={styles.tab}>
                {/* <Tab.Group>
                    <Tab.List>
                        <Tab>エリア</Tab>
                        <Tab>ヤグラ</Tab>
                        <Tab>ホコ</Tab>
                        <Tab>アサリ</Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div>
                                <h2>Rankings</h2>
                                <Table initialData={fakeAreaData} />
                            </div>
                            <div>
                                <h2>{`Xパワー(棒グラフ)`}</h2>
                                <p>{`Xパワーの数値をグラフ化する`}</p>
                            </div>
                            <div>
                                <h2>{`武器種(円グラフ)`}</h2>
                                <p>{`500位以内にどの武器種が多いのかグラフ化する`}</p>
                            </div>
                            <div>
                                <h2>{`武器(散布図)`}</h2>
                                <p>{`武器 平均 or 最大`}</p>
                            </div>
                            <div>
                                <h2>{`武器(折れ線グラフ)`}</h2>
                                <p>{`シーズン中の平均or最大の武器Powerをグラフ化する`}</p>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div>
                                <h2>Rankings</h2>
                                <Table initialData={fakeTowerData} />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div>
                                <h2>Rankings</h2>
                                <Table initialData={fakeRainmakerData} />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div>
                                <h2>Rankings</h2>
                                <Table initialData={fakeClamData} />
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group> */}
            </div>
        </>
    );
}
