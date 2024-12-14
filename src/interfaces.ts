import type { RowData } from "@tanstack/react-table";

declare module "@tanstack/table-core" {
	interface TableMeta<TData extends RowData> {
		removeRow?: (idx: number) => void;
		addRow?: (newRow: TData) => void;
		updateRow?: (updatedRow: TData) => void;
	}
}
