import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Idea } from 'src/app/model/idea';
import { IdeaService } from 'src/app/services/idea.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletePromptComponent } from '../delete-prompt/delete-prompt.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public ideas: Idea[] = [];
  public displayedColumns: string[] = ['content', 'impact', 'ease', 'confidence', 'average_score', 'buttons'];

  @ViewChild(MatTable, {static: false})
  private table: MatTable<any>;

  constructor(private ideaService: IdeaService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchIdeas();
  }

  fetchIdeas() {
    this.ideaService.getIdeas(1)
      .subscribe((ideas) => {
        this.ideas = ideas;
        if (this.table) { this.table.renderRows(); }
      });
  }

  addIdea() {
    console.log('ideas', this.ideas.length);
    this.ideas.push({
      content: '',
      confidence: 10,
      ease: 10,
      impact: 10,
      average_score: 10,
      editing: true,
    });
    if (this.table) { this.table.renderRows(); }
  }

  promptDelete(idea: Idea) {
    const dialogRef = this.dialog.open(DeletePromptComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (idea.id) {
          this.ideaService.deleteIdea(idea.id)
            .subscribe(() => {
              this.fetchIdeas();
            });
        }
      }
    });
  }

  saveIdea(idea: Idea) {
    let sub;
    if (idea.id) {
      sub = this.ideaService.updateIdea(idea);
    } else {
      sub = this.ideaService.createIdea(idea);
    }
    sub.subscribe(() => {
      this.fetchIdeas();
    });
  }

  handleCancelEdit(idea: Idea) {
    if (idea.id) {
      idea.editing = false;
    } else {
      const indexOfIdea = this.ideas.indexOf(idea);
      this.ideas.splice(indexOfIdea, 1);
      if (this.table) { this.table.renderRows(); }
    }
  }

}
