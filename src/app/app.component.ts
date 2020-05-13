import { Component, OnInit } from '@angular/core';
import { databaseRequestService } from './databaseRequests.service';
import { toDoNoteCard } from './todo-card.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'domi-notes';
  public toCreateNew: boolean = false;
  public cards = [];
  public welcome: boolean = false;

  constructor(private databaseReq: databaseRequestService) {}

  async ngOnInit() {
    this.cards = await this.databaseReq.getToDoCards();
    console.log(this.cards.length)

  }
  public noNotes() {
    console.log(this.cards.length)
    if (this.cards.length == 0) {
      this.welcome = false;
  }
}
  wtf(){
    console.log(this.cards)
    console.log('the length from the array behind is: '  + this.cards.length)
  }
}
