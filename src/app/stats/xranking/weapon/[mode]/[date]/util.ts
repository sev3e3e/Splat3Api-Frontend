import { getAllJsonsFromGCS } from "@/utils/gcs";
import { Mode, Modes } from "@/utils/util";

async function dates() {
    console.log("setDates!");
    const temp: {
        [mode: string]: string[];
    } = {};
    for (const mode of Modes) {
        temp[mode.id] = [];
    }

    const files = await getAllJsonsFromGCS();

    for (const file of files[0]) {
        if (file.name.includes(Mode.Area) && file.name.includes("10.json")) {
            const matches = file.name.match(/(\d{2}-[A-Za-z]{3}-\d{4})/m);

            if (matches && matches.length > 1) {
                temp[Mode.Area].push(matches[1]);
            }
        } else if (
            file.name.includes(Mode.Clam) &&
            file.name.includes("10.json")
        ) {
            const matches = file.name.match(/(\d{2}-[A-Za-z]{3}-\d{4})/m);

            if (matches && matches.length > 1) {
                temp[Mode.Clam].push(matches[1]);
            }
        } else if (
            file.name.includes(Mode.Tower) &&
            file.name.includes("10.json")
        ) {
            const matches = file.name.match(/(\d{2}-[A-Za-z]{3}-\d{4})/m);

            if (matches && matches.length > 1) {
                temp[Mode.Tower].push(matches[1]);
            }
        } else if (
            file.name.includes(Mode.Rainmaker) &&
            file.name.includes("10.json")
        ) {
            const matches = file.name.match(/(\d{2}-[A-Za-z]{3}-\d{4})/m);

            if (matches && matches.length > 1) {
                temp[Mode.Rainmaker].push(matches[1]);
            }
        }
    }

    return temp;
}

export const xRankingDates: {
    [mode: string]: string[];
} = await dates();
