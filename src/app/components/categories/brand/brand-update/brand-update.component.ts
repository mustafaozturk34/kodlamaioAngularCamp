import { MessageService } from 'primeng/api';
import { BrandService } from './../../../../services/brand.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
  providers: [BrandService,MessageService]
})
export class BrandUpdateComponent implements OnInit {
  brand: Brand = new Brand();
  brands: Brand[];
  brandUpdateForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private messageService: MessageService,
    private activatedRoute:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getUpdateBrand()
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      id: [this.brand.id, Validators.required],
      name: [this.brand.name, Validators.required],
      logo: [this.brand.logo, Validators.required],
    })
  }

  update(){
    if(this.brandUpdateForm.valid){
      this.brand = Object.assign({},this.brandUpdateForm.value)
    }
    this.brandService.updateBrand(this.brand).subscribe(data => {
      this.messageService.add({
        severity: 'success',
        summary: data.name,
        detail: 'Brand successfully updated.'
      })
      setTimeout(() => {
        location.reload()
      },1000)
    })
  }

  getUpdateBrand(){
    this.activatedRoute.params.subscribe(params => {
      if(params["id"]) {
        this.brandService.getBrandById(params["id"]).subscribe(data => {
          console.log(data)
          this.brand = data
          this.createBrandUpdateForm()
        })
      }

    })

  }



}
