import { Category } from "./Category"
import { Gender } from "./Gender"

export type ParentCategory = {
    id: number,
    name: string,
    gender: Gender,
    categories: Category[]
}