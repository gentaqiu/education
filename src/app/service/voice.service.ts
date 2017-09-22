import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VoiceService {

  constructor(private http: Http) { }

  getVoiceFilePath(text:string) {
    return this.http.post('/api/voice/path',{text:text})
      .map(res => res.json());  
  }
}