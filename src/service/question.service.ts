import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {

  constructor(private http: Http) { }

  createQuestion(course_id: string, title: string, answerA: string, answerB: string,
    answerC: string, answerD: string, correctAnswer: string) {
    return this.http.post ('/api/question/create',
    {course_id: course_id, title: title, answerA: answerA, answerB: answerB,
      answerC: answerC, answerD: answerD, correctAnswer: correctAnswer})
      .map(res => res.json());
  }
  getQuestions(course_id: string) {
    return this.http.post('/api/question/list', {course_id: course_id})
      .map(res => res.json());
  }
  deleteQuestion(id:string) {
    return this.http.post('/api/question/delete', {id: id})
      .map(res => res.json());  
  }
}
