import { CATEGORY_ENDPOINT } from "../../constants/api";
import { Category } from "../../types/Entities/category";
import { GenericService } from "../genericService";

export class CategoryServiceClass extends GenericService<Category, Category> {
    constructor() {
        super(CATEGORY_ENDPOINT);
    }
}

export const CategoryService = new CategoryServiceClass();
