import { BrandService } from './../../../../services/brand.service';
import { Brand } from './../../../../models/brand';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
  providers: [BrandService, MessageService],
})
export class BrandAddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private messageService:MessageService
  ) {}

  brandAddForm: FormGroup;
  brand: Brand = new Brand();

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      logo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  add() {
    if (this.brandAddForm.valid) {
      this.brand = Object.assign({}, this.brandAddForm.value);
    }

    this.brandService.addBrand(this.brand).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: data.name,
        detail: 'Brand successfully added.'
      })
      setTimeout(() => {
        location.reload()
      },1000)
    });
  }
}
