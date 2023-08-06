import { getAllJsonsFromGCS } from "./gcs";
import { Mode, Modes, isEmptyHash } from "./util";

const _allFilePaths: {
    [mode: string]: string[];
} = {};
export const AllFilePaths = async () => {
    if (isEmptyHash(_allFilePaths)) {
        console.log("get all files.");
        // initialize temp
        const temp: {
            [mode: string]: string[];
        } = {};
        for (const mode of Modes) {
            temp[mode.id] = [];
        }

        const files = await getAllJsonsFromGCS();

        for (const file of files[0]) {
            if (
                file.name.includes(Mode.Area) &&
                file.name.includes("10.json")
            ) {
                temp[Mode.Area].push(file.name);
            } else if (
                file.name.includes(Mode.Clam) &&
                file.name.includes("10.json")
            ) {
                temp[Mode.Clam].push(file.name);
            } else if (
                file.name.includes(Mode.Tower) &&
                file.name.includes("10.json")
            ) {
                temp[Mode.Tower].push(file.name);
            } else if (
                file.name.includes(Mode.Rainmaker) &&
                file.name.includes("10.json")
            ) {
                temp[Mode.Rainmaker].push(file.name);
            }
        }

        return temp;
    }
    return _allFilePaths;
};
