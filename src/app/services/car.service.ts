import { Car } from './../models/car';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiKey = "http://localhost:3000/Cars"

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<Car[]>{
    return this.httpClient.get<Car[]>(this.apiKey)
  }

  addCar(car: Car):Observable<Car> {
    return this.httpClient.post<Car>(this.apiKey, car)
  }

  deleteCar(id:number):Observable<Car>{
    return this.httpClient.delete<Car>("http://localhost:3000/Cars/"+id)
  }

  updateCar(car: Car): Observable<Car> {
    return this.httpClient.put<Car>("http://localhost:3000/Cars/"+car.id,car)
  }

  getCarById(id: number):Observable<Car>{
    return this.httpClient.get<Car>("http://localhost:3000/Cars/"+id)
  }
}
