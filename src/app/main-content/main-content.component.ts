import { Component, OnInit } from '@angular/core';
import { toDoNoteCard } from '../todo-card.interface';
import { databaseRequestService } from '../databaseRequests.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  public cards: toDoNoteCard[] = this.databaseReq.allCards;

  constructor(private databaseReq: databaseRequestService) { }

  ngOnInit(): void {
    this.databaseReq.getToDoCards()
  }

}
