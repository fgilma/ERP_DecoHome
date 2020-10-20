import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { CustomersComponent } from './components/customers/customers.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormOrderComponent } from './forms/form-order/form-order.component';
import { FormNewOrderComponent } from './forms/form-new-order/form-new-order.component';
import { FormItemComponent } from './forms/form-item/form-item.component';
import { ItemsOrderComponent } from './components/items-order/items-order.component';
import { FormProductComponent } from './forms/form-product/form-product.component';
import { FormCustomerComponent } from './forms/form-customer/form-customer.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { FormEmployeeComponent } from './forms/form-employee/form-employee.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { ItemsOrderResolverService } from './services/items-order-resolver.service';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'createOrder', component: FormNewOrderComponent },
  {path: 'editOrder/:option/:id', component: FormOrderComponent },
  {path: 'editOrder/:option/:option1/:id', component: FormOrderComponent },
  {path: 'createItem/:option/:orderId/:id', component: FormItemComponent },
  {path: 'createItem/:option/:option1/:orderId/:id', component: FormItemComponent },
  {path: 'editItem/:option/:orderId/:id', component: FormItemComponent },
  {path: 'editItem/:option/:option1/:orderId/:id', component: FormItemComponent },
  {path: 'itemsOrder/:option/:id', component: ItemsOrderComponent, resolve: { resolvedData: ItemsOrderResolverService }},
  {path: 'itemsOrder/:option/:option1/:id', component: ItemsOrderComponent, resolve: { resolvedData: ItemsOrderResolverService } },
  {path: 'products', component: ProductsComponent},
  {path: 'editProduct/:id', component: FormProductComponent },
  {path: 'createProduct', component: FormProductComponent },
  {path: 'employees', component: EmployeesComponent},
  {path: 'createEmployee', component: FormEmployeeComponent },
  {path: 'editEmployee/:id', component: FormEmployeeComponent },
  {path: 'employees/:id', component: EmployeeDetailComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'createCustomer', component: FormCustomerComponent },
  {path: 'editCustomer/:id', component: FormCustomerComponent },
  {path: 'customers/:id', component: CustomerDetailComponent},
  {path: 'login', component: LoginComponent },
  {path: 'statistics', component: StatisticsComponent},
  {path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
