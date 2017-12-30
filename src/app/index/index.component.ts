import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../service/subject.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  subjects = [];

  constructor(private subjectService:SubjectService) { }

  ngOnInit() {
      this.subjectService.getSubjects().subscribe(    
          suc => {
              this.subjects = suc.subjects;
          },
          err => {
              console.log(err);
          }
      );  
  }
}