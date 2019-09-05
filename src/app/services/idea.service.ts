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
    return this.http.get<Idea[]>(`${environment.apiBaseUrl}/ideas?page=${pageNumber}`);
  }

  createIdea(idea: Idea) {
    return this.http.post(`${environment.apiBaseUrl}/ideas`, idea);
  }

  updateIdea(idea: Idea) {
    return this.http.put(`${environment.apiBaseUrl}/ideas/${idea.id}`, {
      content: idea.content,
      impact: idea.impact,
      ease: idea.ease,
      confidence: idea.confidence,
    });
  }

  deleteIdea(ideaId: string) {
    return this.http.delete(`${environment.apiBaseUrl}/ideas/${ideaId}`);
  }
}
