import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { CustomersComponent } from './components/customers/customers.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormOrderComponent } from './forms/form-order/form-order.component';
import { FormNewOrderComponent } from './forms/form-new-order/form-new-order.component';
import { FormItemComponent } from './forms/form-item/form-item.component';
import { ProductTableFilterPipe } from './pipes/product-table-filter.pipe';
import { ItemsOrderComponent } from './components/items-order/items-order.component';
import { FormProductComponent } from './forms/form-product/form-product.component';
import { FormCustomerComponent } from './forms/form-customer/form-customer.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { OrderFilterPipe } from './pipes/order-filter.pipe';
import { FormEmployeeComponent } from './forms/form-employee/form-employee.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    OrdersComponent,
    ProductsComponent,
    CustomersComponent,
    EmployeesComponent,
    StatisticsComponent,
    LoginComponent,
    PageNotFoundComponent,
    FormOrderComponent,
    FormNewOrderComponent,
    FormItemComponent,
    ProductTableFilterPipe,
    ItemsOrderComponent,
    FormProductComponent,
    FormCustomerComponent,
    CustomerDetailComponent,
    OrderFilterPipe,
    FormEmployeeComponent,
    EmployeeDetailComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
