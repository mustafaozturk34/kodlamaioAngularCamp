import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  car: Car = new Car();
  selectedCar: Car = new Car();
  carUpdateForm: FormGroup;
  brands: Brand[];
  colors: Color[];

  constructor(
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCarById();
    this.createCarUpdateForm();
    this.getBrands();
    this.getColors();
  }

  getCarById() {
    this.activatedRoute.params.subscribe((param) => {
      if (param['id']) {
        this.carService.getCarById(param['id']).subscribe((data) => {
          this.selectedCar = data;
          console.log(this.selectedCar.brandName);
        });
      }
    });
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      description: [this.selectedCar.description, Validators.required],
      brandName: [this.selectedCar.brandName, Validators.required],
      colorName: [this.selectedCar.colorName, Validators.required],
      dailyPrice: [this.selectedCar.dailyPrice, Validators.required],
      imageUrl: [this.selectedCar.imageUrl, Validators.required],
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

  updateCar() {
    let selectedBrand = this.brands.find(
      (element) => element.name == this.carUpdateForm.value.brandName
    );
    let selectedColor = this.colors.find(
      (element) => element.name == this.carUpdateForm.value.colorName
    );
    this.car.id = this.selectedCar.id
    this.car.brandId = selectedBrand.id;
    this.car.colorId = selectedColor.id;
    this.car.brandName = this.carUpdateForm.value.brandName;
    this.car.colorName = this.carUpdateForm.value.colorName;
    this.car.dailyPrice = this.carUpdateForm.value.dailyPrice;
    this.car.imageUrl = this.carUpdateForm.value.imageUrl;
    this.car.description = this.carUpdateForm.value.description;
    console.log(this.car)
    this.carService.updateCar(this.car).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: data.description,
        detail: 'Brand successfully updateed.',
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
    });
  }
}
