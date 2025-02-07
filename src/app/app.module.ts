import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './customer/menu/menu.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { ViewCategoryComponent } from './admin/view-category/view-category.component';
import { ViewItemsComponent } from './admin/view-items/view-items.component';
import { NoItemsComponent } from './admin/no-items/no-items.component';
import { LoggedOutComponent } from './logged-out/logged-out.component';
import { RestrictedComponent } from './restricted/restricted.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'restricted', component: RestrictedComponent },
  { path: 'loggedOut', component: LoggedOutComponent },
  { path: 'customer/menu', component: MenuComponent },
  { path: 'customer', component: CustomerComponent },  
  { path: 'admin', component: AdminComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'admin/no-items', component: NoItemsComponent },
  { path: 'admin/view-category', component: ViewCategoryComponent },
  { path: 'admin/view-items', component: ViewItemsComponent },
  { path: '**', component: ErrorPageComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CustomerComponent,
    LoginComponent,
    MenuComponent,
    ErrorPageComponent,
    ViewCategoryComponent,
    ViewItemsComponent,
    NoItemsComponent,
    LoggedOutComponent,
    RestrictedComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
