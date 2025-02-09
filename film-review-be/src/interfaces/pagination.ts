export interface IPageRecords<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  records: T[];
}

export interface IRecordFilter {
  offset: number;
  limit: number;
  order: string | "ASC" | "DESC";
  orderBy: string;
  searchQuery: string;
  searchBy?: string;
}
