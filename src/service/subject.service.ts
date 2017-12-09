import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SubjectService {

  constructor(private http: Http) { }

  getSubejctDetails(subject_id:string) {
    return this.http.get('/api/subject/'+subject_id)
      .map(res => res.json());  
  }

  createSubject(subject_id: string,sequence:string, subjectName: string, subjectImage: string) {
    return this.http.post ('/api/subject/createUpdate',
    {subject_id: subject_id, sequence:sequence,subjectName: subjectName, subjectImage: subjectImage})
      .map(res => res.json());
  }

  getSubjects() {
    return this.http.get('/api/subjects')
      .map(res => res.json());
  }

  deleteSubject(subject_id:string) {
    return this.http.post('/api/subject/delete',{subject_id:subject_id})
      .map(res => res.json());    
  }
}