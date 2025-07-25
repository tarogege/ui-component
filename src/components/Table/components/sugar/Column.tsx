import type { ColumnType } from "../interface";

export interface ColumnProps<RecordType> extends ColumnType<RecordType> {
  children?: null;
}

/* istanbul ignore next */
/**
 * This is a syntactic sugar for `columns` prop.
 * So HOC will not work on this.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Column<RecordType>(_: ColumnProps<RecordType>) {
  return null;
}
