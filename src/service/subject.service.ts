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

  createSubject(subject_id: string,lang:string,sequence:string, subjectName: string, subjectImage: string) {
    console.log({subject_id: subject_id, lang:lang, sequence:sequence,subjectName: subjectName, subjectImage: subjectImage});
    if(!lang) {
      lang = 'zh';
    }
    return this.http.post ('/api/subject/createUpdate',
    {subject_id: subject_id, lang:lang, sequence:sequence,subjectName: subjectName, subjectImage: subjectImage})
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