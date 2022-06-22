import { MessageService } from 'primeng/api';
import { BrandService } from '../../../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css'],
  providers: [BrandService,MessageService],
})
export class BrandListComponent implements OnInit {
  brands: Brand[];

  constructor(
    private brandService: BrandService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((data) => {
      this.brands = data;
    });
  }

  deleteBrand(id: number) {
    if (confirm('Are you sure want to delete?')) {
      this.brandService.deleteBrand(id).subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: data.name,
          detail: 'Brand successfully deleted.',
        });
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }

}
