import { Component, OnInit } from '@angular/core';
import { Idea } from 'src/app/model/idea';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public ideas: Idea[] = [];
  constructor() { }

  ngOnInit() {
  }

}
