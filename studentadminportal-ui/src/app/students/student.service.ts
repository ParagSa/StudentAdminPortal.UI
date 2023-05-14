import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Observable} from 'rxjs';
import { Student } from '../models/api-models/student.model';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiBaseUrl="https://localhost:7035";




    constructor(private httpClient: HttpClient) {}

      getStudents(): Observable<Student[]>{
        return this.httpClient.get<Student[]>(this.apiBaseUrl+'/students');
      }



}
