import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Observable} from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/update-student-request-model';
import { AddStudentRequest } from '../models/api-models/add-student-request-model';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiBaseUrl="https://localhost:7035";




    constructor(private httpClient: HttpClient) {}

      getStudents(): Observable<Student[]>{
        return this.httpClient.get<Student[]>(this.apiBaseUrl+'/students');
      }

      getStudent(id: string): Observable<Student>{
        return this.httpClient.get<Student>(this.apiBaseUrl+'/Students/'+id);
      }


      updateStudent(id: string , studentRequest: Student ):Observable<Student>{
        const UpdatedStudentRequest : UpdateStudentRequest ={
          firstName : studentRequest.firstName,
          lastName :studentRequest.lastName,
          dateOfBirth :studentRequest.dateOfBirth,
          email :studentRequest.email,
          mobile:studentRequest.mobile,
          genderId : studentRequest.genderId,
          physicalAddress : studentRequest.address.physicalAddress,
          postalAddress : studentRequest.address.postalAddress
        }

        return this.httpClient.put<Student>(this.apiBaseUrl+'/Students/'+id,UpdatedStudentRequest);



      }
      deleteStudent(id: string):Observable<Student>
      {
        return this.httpClient.delete<Student>(this.apiBaseUrl+'/Students/'+id);


      }
      addStudent (studentRequest: Student):Observable<Student>{
        const addStudentRequest : AddStudentRequest ={
          firstName : studentRequest.firstName,
          lastName :studentRequest.lastName,
          dateOfBirth :studentRequest.dateOfBirth,
          email :studentRequest.email,
          mobile:studentRequest.mobile,
          genderId : studentRequest.genderId,
          physicalAddress : studentRequest.address.physicalAddress,
          postalAddress : studentRequest.address.postalAddress
        }

        return this.httpClient.post<Student>(this.apiBaseUrl+'/Students/add',addStudentRequest);


      }

      uploadImage(studentId:string, file:File) : Observable<any>
      {
        const formData = new FormData();
        formData.append('profileImage', file);
        return this.httpClient.post(
          this.apiBaseUrl+'/Students/'+studentId+'/upload-image',
          formData,{
            responseType:'text'
          }
        );

      }
      getImagePath(relativePath :string){
        return `${this.apiBaseUrl}+${relativePath}`;

      }





}
