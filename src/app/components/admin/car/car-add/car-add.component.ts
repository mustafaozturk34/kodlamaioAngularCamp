import { MessageService } from 'primeng/api';
import { BrandService } from './../../../../services/brand.service';
import { ColorService } from './../../../../services/color.service';
import { CarService } from './../../../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  car: Car = new Car();
  carAddForm: FormGroup;
  brands: Brand[];
  colors: Color[];

  constructor(
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private messageService:MessageService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      description: ['', Validators.required],
      brandName: ['', Validators.required],
      colorName: ['', Validators.required],
      dailyPrice: [, Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((data) => {
      this.brands = data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((data) => {
      this.colors = data;
    });
  }

  addCar() {
    let selectedBrand = this.brands.find(
      (element) => element.name == this.carAddForm.value.brandName
    );
    let selectedColor = this.colors.find(
      (element) => element.name == this.carAddForm.value.colorName
    );
    this.car.brandId = selectedBrand.id;
    this.car.colorId = selectedColor.id;
    this.car.brandName = this.carAddForm.value.brandName;
    this.car.colorName = this.carAddForm.value.colorName;
    this.car.dailyPrice = this.carAddForm.value.dailyPrice;
    this.car.imageUrl = this.carAddForm.value.imageUrl;
    this.car.description = this.carAddForm.value.description;
    this.carService.addCar(this.car).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: data.description,
        detail: 'Brand successfully added.'
      })
      setTimeout(() => {
        location.reload()
      },2000)
    });
  }
}
