import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css'],
})
export class ViewStudentComponent implements OnInit {
  studentId: string | undefined | null;
  /**
   *
   */
  genderList: Gender[] = [];

  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
    gender: {
      id: '',
      description: '',
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: '',
    },
  };

  isNewStudent = false;
  header = '';
  displayProfileImageUrl = '';
  @ViewChild('studentDetailForm') studentDetailsForm?: NgForm;

  constructor(
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id');

      if (this.studentId) {
        if (this.studentId.toLowerCase() === 'Add'.toLowerCase()) {
          this.isNewStudent = true;
          this.header = 'Add New Student';
          this.setImage();
        } else {
          this.isNewStudent = false;
          this.header = 'Edit Student';
          this.studentService.getStudent(this.studentId).subscribe(
            (successResponse) => {
              this.student = successResponse;
              this.setImage();
            },
            (errorResponse) => {
              this.setImage();
            }
          );
        }
      }

      this.genderService.getAllGenders().subscribe((successREsponse) => {
        this.genderList = successREsponse;
      });
    });
  }

  onUpdate(): void {

    if (this.studentDetailsForm?.form.valid)
    {
      this.studentService.updateStudent(this.student.id, this.student).subscribe(
        (successResponse) => {
          this.snackBar.open('student updated successfully', undefined, {
            duration: 2000,
          });
        },
        (errorMessage) => {}
      );

    }

  }

  onDelete(): void {
    this.studentService.deleteStudent(this.student.id).subscribe(
      (successResponse) => {
        this.snackBar.open('student deleted successfully', undefined, {
          duration: 2000,
        });

        setTimeout(() => {
          this.router.navigateByUrl('students');
        }, 2000);
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );
  }
  onAdd(): void {
    if (this.studentDetailsForm?.form.valid)
    {
      this.studentService.addStudent(this.student).subscribe(
        (successResponse) => {
          this.snackBar.open('student added successfully', undefined, {
            duration: 2000,
          });

          setTimeout(() => {
            this.router.navigateByUrl(`student/${successResponse.id}`);
          }, 2000);
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
    }
  }

  private setImage(): void {
    if (this.student.profileImageUrl) {
      this.displayProfileImageUrl = this.studentService.getImagePath(
        this.student.profileImageUrl
      );
    } else {
      this.displayProfileImageUrl = '/assets/user.png';
    }
  }

  uploadImage(event: any): void {
    if (this.studentId) {
      const file: File = event.target.files[0];
      this.studentService.uploadImage(this.student.id, file).subscribe(
        (successResponse) => {
          this.student.profileImageUrl = successResponse;
          this.setImage();
          this.snackBar.open('image uploaded successfully', undefined, {
            duration: 2000,
          });
        },
        (errorResponse) => {}
      );
    }
  }
}
