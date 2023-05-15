import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender } from '../models/api-models/gender.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private apiBaseUrl="https://localhost:7035";

  constructor(private httpClient: HttpClient)
  {}
    getAllGenders(): Observable<Gender[]>{
      return this.httpClient.get<Gender[]>(this.apiBaseUrl+'/Gender');
    }


}
