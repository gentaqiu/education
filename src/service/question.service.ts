import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {

  constructor(private http: Http) { }

  createQuestion(question_id:string,course_id: string, type:number,title: string, answerA: string, answerB: string,
    answerC: string, answerD: string, correctAnswer: string) {
    return this.http.post ('/api/question/create',
    {question_id:question_id, course_id: course_id, type:type,title: title, answerA: answerA, answerB: answerB,
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
