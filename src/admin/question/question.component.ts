import { Component, EventEmitter, OnInit } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { CourseService } from '../../service/course.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'admin-course',
  templateUrl: 'question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  course_name: string;
  private sub: any;

  constructor(private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.course_name = params['course_name'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }  
  createQuestion() {
    console.log('create question for ' + this.course_name);
  }
}