import { Injectable } from '@angular/core';
import { Idea } from '../model/idea';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor(private http: HttpClient) { }

  getIdeas(pageNumber: number = 1) {
    return this.http.get(`/ideas?page=${pageNumber}`);
  }

  createIdea(idea: Idea) {
    return this.http.post('/ideas', idea);
  }

  updateIdea(idea: Idea) {
    return this.http.post(`/ideas/${idea.id}`, idea);
  }

  deleteIdea(ideaId: string) {
    return this.http.delete(`/ideas/${ideaId}`);
  }
}
