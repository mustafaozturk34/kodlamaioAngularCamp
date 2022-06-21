import { MessageService } from 'primeng/api';
import { ColorService } from './services/color.service';
import { BrandService } from './services/brand.service';
import { CarService } from './services/car.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './common/navi/navi.component';
import { BrandListComponent } from './components/categories/brand/brand-list/brand-list.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrandAddComponent } from './components/categories/brand/brand-add/brand-add.component';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrandUpdateComponent } from './components/categories/brand/brand-update/brand-update.component';
import { ColorListComponent } from './components/categories/color/color-list/color-list.component';
import { ColorAddComponent } from './components/categories/color/color-add/color-add.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import {CardModule} from 'primeng/card';
import { CarAddComponent } from './components/admin/car/car-add/car-add.component';
import { CarUpdateComponent } from './components/admin/car/car-update/car-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandListComponent,
    CategoryListComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    ColorListComponent,
    ColorAddComponent,
    CarListComponent,
    CarAddComponent,
    CarUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    AccordionModule,
    BrowserAnimationsModule,
    CardModule
  ],
  providers: [CarService, BrandService, ColorService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
