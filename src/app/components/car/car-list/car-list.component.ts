import { ActivatedRoute } from '@angular/router';
import { Car } from './../../../models/car';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Car[];

  constructor(
    private carService: CarService,
    private messageService: MessageService,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCars()
  }

  getCars(){
    this.activatedRoute.params.subscribe(param => {
      if(param["brandId"]){
        this.carService.getCarsByBrandId(param["brandId"]).subscribe(data => {
          this.cars = data
        })
      }else if(param["colorId"]){
        this.carService.getCarsByColorId(param["colorId"]).subscribe(data => {
          this.cars = data
        })
      }else{
        this.carService.getCars().subscribe(data => {
          this.cars = data
        })
      }
    })
  }


  deleteCar(id: number) {
    if (confirm('Are you sure want to delete?')) {
      this.carService.deleteCar(id).subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: data.description,
          detail: 'Car successfully deleted.',
        });
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }
}
