import { IEmployee } from './iemployee';
import { IPriority } from './ipriority';
import { IState } from './istate';
import { ICustomer } from './icustomer';
export interface IOrder {
    id: number;
    startDate: Date;
    assignDate?: Date;
    endDate?: Date;
    totalCost?: number;
    totalPvp?: number;
    totalPvpIva?: number;
    employee?: IEmployee;
    priority?: IPriority;
    state: IState;
    customer?: ICustomer;
    customerId: number;
    stateId: number;
    priorityId?: number;
    employeeId?: string;
    address?: string;
    number?: string;
    flat?: string;
    door?: string;
    city?: string;
    region?: string;
    country?: string;
    zip?: string;
}
