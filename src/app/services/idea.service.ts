import { Injectable } from '@angular/core';
import { Idea } from '../model/idea';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor(private http: HttpClient) { }

  getIdeas(pageNumber: number = 1) {
    return this.http.get(`${environment.apiBaseUrl}/ideas?page=${pageNumber}`);
  }

  createIdea(idea: Idea) {
    return this.http.post(`${environment.apiBaseUrl}/ideas`, idea);
  }

  updateIdea(idea: Idea) {
    return this.http.post(`${environment.apiBaseUrl}/ideas/${idea.id}`, idea);
  }

  deleteIdea(ideaId: string) {
    return this.http.delete(`${environment.apiBaseUrl}/ideas/${ideaId}`);
  }
}
