export interface Status {
    id: string,
    createdAt: Date,
    name: String
  }
  
  export interface Item {
    id: string,
    title: string,
    statuses: Array<Status>,
    dueDate: Date,
    createdAt: Date,
    completed: boolean
  }

  export interface ItemsResponse {
    totalItems: number,
    totalPages: number,
    currentPage: number,
    items: Item[]
  }
  
  export interface ItemResponse {
    item: Item
  }
  