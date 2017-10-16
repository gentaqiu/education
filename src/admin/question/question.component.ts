import { Component, EventEmitter, OnInit } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-course',
  templateUrl: 'question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  course_name: string;
  private sub: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.course_name = params['course_name']; 
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }  
}