import {Model} from "@/types/model/model.ts";

export interface Meta {
    currentPage: number,
    from: number,
    lastPage: number,
    path: string
    perPage: number,
    to: number,
    total: number
}

export interface ApiResponse {
    data: Model[],
    meta: Meta
}