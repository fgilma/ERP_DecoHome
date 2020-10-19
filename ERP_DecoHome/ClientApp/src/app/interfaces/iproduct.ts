import { ICategory } from './icategory';
export interface IProduct {
    id: number;
    name: string;
    categoryId: number;
    amount: number;
    cost: number;
    unitPvp: number;
    unitPvpIva: number;
    category: ICategory;
}
