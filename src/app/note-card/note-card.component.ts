import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { databaseRequestService } from '../databaseRequests.service';
import { toDoNoteCard } from '../todo-card.interface';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css'],
})
export class NoteCardComponent implements OnInit {
  @Output() public needToReload: EventEmitter<any> = new EventEmitter<any>();
  @Input() fullCard: toDoNoteCard;
  public expand: boolean = false;

  constructor(private databaseData: databaseRequestService) {}

  giveMeData() {
    console.log('llega');
    this.databaseData.getToDoCards();

    console.log(this.databaseData.allCards);
  }
  ngOnInit(): void {}

  removeCard(idCard: string): void {
    this.needToReload.emit(idCard);
    ///this.databaseData.removeSingleCard(idCard);
  }
}
