export interface BaseSearchFilters {
  CreatedDateFrom?: Date;
  CreatedDateTo?: Date;
  OrderBy?: string;
  Order?: string;
  PageIndex?: number;
  ItemsPerPage?: number;
}

export interface BaseSearchResults {
  TotalCount: number;
  RetrievedCount: number;
  PageIndex: number;
  ItemsPerPage: number;
  Order: string;
  OrderedBy: string;
}
