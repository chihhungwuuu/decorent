import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginStatusComponent } from "./components/login-status/login-status.component";
import { BoardEmployeeComponent } from './components/board-employee/board-employee.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';

const routes: Routes = [
  {path: 'product-update/:id',component: ProductUpdateComponent},
  {path: 'product-add',component: ProductAddComponent},
  {path: 'home',component: HomeComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'profile',component: ProfileComponent},
  {path: 'user',component: BoardUserComponent},
  {path: 'employee',component: BoardEmployeeComponent},
  {path: 'admin',component: BoardAdminComponent},
  {path: 'checkout',component: CheckoutComponent},
  {path: 'cart-details',component: CartDetailsComponent},
  {path: 'products/:id',component: ProductDetailsComponent},
  {path: 'search/:keyword',component: ProductListComponent},
  {path: 'category/:id/:name',component: ProductListComponent},
  {path: 'category',component: ProductListComponent},
  {path: 'products',component: ProductListComponent},
  {path: '',redirectTo:'/products',pathMatch: 'full'},
  {path: '**',redirectTo:'/products',pathMatch:'full'},
];


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardEmployeeComponent,
    BoardUserComponent,
    LoginStatusComponent,
    ProductAddComponent,
    ProductUpdateComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
],
  providers: [ProductService,httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
