import { IProduct } from './iproduct';
export interface IOrderItem {

    id: number;
    orderId: number;
    amount: number;
    totalCost: number;
    totalPvp: number;
    totalPvpIva: number;
    productId: number;
    product: IProduct;
}
