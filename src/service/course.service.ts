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

  createCourse(course_id: string,subject_id:string,sequence:string, courseName: string, courseImage: string) {
    return this.http.post ('/api/course/createUpdate',
    {course_id: course_id,subject_id:subject_id, sequence:sequence,courseName: courseName, courseImage: courseImage})
      .map(res => res.json());
  }

  getCourses() {
  	console.log("getCourses");
    return this.http.get('/api/courses')
      .map(res => res.json());
  }

  getCoursesBySubject(subject_id) {
    console.log("getCourses");
    return this.http.get('/api/courses/' + subject_id)
      .map(res => res.json());
  }

  deleteCourse(course_id:string) {
    return this.http.post('/api/course/delete',{course_id:course_id})
      .map(res => res.json());    
  }
}