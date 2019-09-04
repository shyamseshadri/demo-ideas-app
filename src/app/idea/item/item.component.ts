import { Component, OnInit, Input } from '@angular/core';
import { Idea } from 'src/app/model/idea';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() public idea: Idea;
  @Input() public isEditing = false;
  constructor() { }

  ngOnInit() {
  }

  onIdeaSave() {

  }
}
