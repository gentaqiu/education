import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseService {

  constructor(private http: Http) { }

  getCourseDetails(courseName:string) {
  	console.log("courseName="+courseName);
    return this.http.get('/api/course/'+courseName)
      .map(res => res.json());  
  }

  getCourses() {
  	console.log("getCourses");
    return this.http.get('/api/courses')
      .map(res => res.json());
  }
}