import { IOrder } from './iorder';
export interface IEmployee {
    id: string;
    name: string;
    username: string;
    surname1: string;
    surname2: string;
    position: string;
    department: string;
    orders: IOrder[];
    email: string;
    rol: string;
    password: string;
    salary: number;
}
