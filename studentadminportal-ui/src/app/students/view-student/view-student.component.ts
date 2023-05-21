import { Component , OnInit} from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  studentId : string| undefined| null;
  /**
   *
   */
  genderList: Gender[]=[];


  student : Student =
  {
    id: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    mobile: 0,
    profileImageUrl: "",
    genderId: "",
    gender: {
      id: "",
      description: ""
    },
    address: {
      id: "",
      physicalAddress: "" ,
      postalAddress: ""

    }
  }

  isNewStudent = false;
  header = '';


  constructor(private readonly studentService: StudentService,
    private readonly route:ActivatedRoute, private readonly genderService: GenderService,
    private snackBar: MatSnackBar, private router:Router) {


  }

  ngOnInit(): void {
      this.route.paramMap.subscribe(
        (params)=>{
          this.studentId=params.get('id');

          if(this.studentId){


            if(this.studentId.toLowerCase()==='Add'.toLowerCase()){
              this.isNewStudent=true;
              this.header = 'Add New Student';



            }else{
              this.isNewStudent=false;
              this.header= 'Edit Student';
              this.studentService.getStudent(this.studentId).subscribe(
                (successResponse)=>{
                  this.student=successResponse;


                }
              );




            }



          }

          this.genderService.getAllGenders().subscribe(
            (successREsponse)=>{
              this.genderList= successREsponse;

            }
          );
        }

      )

  }

  onUpdate():void{

    this.studentService.updateStudent(this.student.id, this.student).subscribe(
      (successResponse)=>{

        this.snackBar.open('student updated successfully',undefined,{
          duration :2000
        });

      }
      ,(errorMessage)=>{

      });

  }

  onDelete():void{

    this.studentService.deleteStudent(this.student.id).subscribe(
      (successResponse)=>{

        this.snackBar.open('student deleted successfully',undefined,{
          duration :2000
        });

        setTimeout(()=>{
          this.router.navigateByUrl('students');


        },2000);




      }
      , (errorMessage)=>{

        console.log(errorMessage);

      }
    );

  }
  onAdd():void{

    this.studentService.addStudent(this.student).
    subscribe(
      (successResponse)=>{
        this.snackBar.open('student added successfully',undefined,{
          duration :2000
        });

        setTimeout(()=>{
          this.router.navigateByUrl(`student/${successResponse.id}`);


        },2000);

      },
      (errorResponse)=>{
        console.log(errorResponse);
      }
    )
  }

}
