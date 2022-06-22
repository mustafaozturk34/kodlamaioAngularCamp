import { CarUpdateComponent } from './components/admin/car/car-update/car-update.component';
import { CarAddComponent } from './components/admin/car/car-add/car-add.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { ColorAddComponent } from './components/categories/color/color-add/color-add.component';
import { BrandUpdateComponent } from './components/categories/brand/brand-update/brand-update.component';
import { BrandAddComponent } from './components/categories/brand/brand-add/brand-add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarListComponent},
  {path:"brand-add",component:BrandAddComponent},
  {path:"brand-update/:id", component: BrandUpdateComponent},
  {path:"color-add",component:ColorAddComponent},
  {path:"add-car", component:CarAddComponent},
  {path:"update-car/:id", component:CarUpdateComponent},
  {path:"car-brandId/:brandId", component:CarListComponent},
  {path:"car-colorId/:colorId", component:CarListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
