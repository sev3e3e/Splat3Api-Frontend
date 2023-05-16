import { Weapons } from "./weaponName";

export const nonNullable = <T>(value: T): value is NonNullable<T> =>
    value != null;

export const getWeaponImageFileName = (weaponName: string) => {
    const filename: string = Weapons[weaponName];
    return filename.replace(/\s/g, "_");
};
