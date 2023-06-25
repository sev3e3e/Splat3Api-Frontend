import "@tanstack/react-table";

declare module "*.module.css";
declare module "*.module.scss";

declare module "@tanstack/table-core" {
    interface ColumnMeta<TData extends RowData, TValue> {
        width?: string;
        maxWidth?: string;
        minWidth?: string;
    }
}
