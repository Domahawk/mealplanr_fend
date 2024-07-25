import {Model} from "@/types/model/model.ts";

export interface User extends Model{
    name: string;
    email: string;
}