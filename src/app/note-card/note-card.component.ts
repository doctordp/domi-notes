import { Component, OnInit, Input } from '@angular/core';
import { databaseRequestService } from '../databaseRequests.service';
import { toDoNoteCard } from '../todo-card.interface';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {
  @Input() fullCard: toDoNoteCard;
  public expand: boolean = false;

  constructor(private databaseData: databaseRequestService) {}

  giveMeData() {
    console.log('llega');
    this.databaseData.getToDoCards();

    console.log(this.databaseData.allCards);
  }
  ngOnInit(): void {}
}
