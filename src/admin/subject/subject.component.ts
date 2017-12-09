import { Component, EventEmitter, OnInit } from '@angular/core';
import { SubjectService } from '../../service/subject.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SubjectInsertDialog } from '../../dialog/subject-insert.dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'admin-subject',
  templateUrl: 'subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {
  subject_id: string;
  subjectName: string;
  createOrUpdate: string;
  subjects = [];

  constructor(private subjectService:SubjectService,private router: Router,public dialog: MatDialog) {
  }
  ngOnInit() {
      this.subjectService.getSubjects().subscribe(    
          suc => {
              //console.log(suc);
              this.subjects = suc.subjects;
          },
          err => {
              console.log(err);
          }
      );  
      this.createOrUpdate = 'Create';    
      this.subject_id = "";  
  }

  listCourses(subject_id:string) {
    this.router.navigate(['/admin/courses',subject_id]);
  }


 
  createUpdateSubject(): void {

    let subjectDialogRef = this.dialog.open(SubjectInsertDialog,{
      height: '500px',
      width: '600px',
      data: { 
        sequence: '',
        subjectName: '',
        subjectImage: ''
      }        
    });  

    subjectDialogRef.afterClosed().subscribe(result => {

      this.subjectService.createSubject(this.subject_id,result.sequence,result.subjectName,result.subjectImage).subscribe(    
        suc => {
          this.subjects.push(suc.subject);
        },
        err => {
            console.log(err);
        }
      );       
    });
  }
 
  deleteCourse(subject_id:string) {
      this.subjectService.deleteSubject(subject_id).subscribe(    
          suc => {
              console.log(suc);

              for(var i = this.subjects.length - 1; i >= 0; i--) {
                  if(this.subjects[i]._id == subject_id) {
                    this.subjects.splice(i, 1);
                    break;
                     
                  }
              }              
          },
          err => {
              console.log(err);
          }
      );     
  }

  editSubject(subject_id:string,sequence:string,subjectName:string,subjectImage:string) {
    this.subject_id = subject_id;
    let subjectDialogRef = this.dialog.open(SubjectInsertDialog,{
      height: '500px',
      width: '600px',
      data: { 
        sequence: sequence,
        subjectName: subjectName,
        subjectImage: subjectImage
      }      
    });  
    subjectDialogRef.afterClosed().subscribe(result => {

      this.subjectService.createSubject(this.subject_id,result.sequence,result.subjectName,result.subjectImage).subscribe(    
        suc => {
          for(var i = this.subjects.length - 1; i >= 0; i--) {
              if(this.subjects[i]._id == this.subject_id) {
                this.subjects[i] = suc.subject;
                break;
              }
          }            
          this.subject_id = '';

        },
        err => {
            console.log(err);
        }
      );       
    });           
  }

}