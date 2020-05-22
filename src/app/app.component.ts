import { Component, OnInit } from '@angular/core';
import { databaseRequestService } from './databaseRequests.service';
import { toDoNoteCard } from './todo-card.interface';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'domi-notes';
  public toCreateNew: boolean = false;
  public cards = [];
  public welcome: boolean = false;
  public reloadReq = false;

  constructor(private databaseReq: databaseRequestService) {}

  async ngOnInit() {
    console.log(this.cards.length);
    const queryParamsString = window.location.search.substr(1);
    const queryParams = queryParamsString.split('&').reduce(
      (accumulator, singleQueryParam) => {
        const [key, value] = singleQueryParam.split('=');
        accumulator[key] = value;
        return accumulator;
      },
      { token: 'default' }
    );
    console.log(queryParams.token);
    localStorage.setItem(
      'token',
      queryParams.token && queryParams.token != 'undefined'
        ? queryParams.token
        : 'default'
    );

    this.cards = await this.databaseReq.getToDoCards();
    console.log(localStorage);
    console.log(localStorage.token);
  }
  public noNotes() {
    console.log(this.cards.length);
    if (this.cards.length == 0) {
      this.welcome = false;
    }
  }

  public async removed(idCard) {
    this.reloadReq = true;
    this.databaseReq.removeSingleCard(idCard).then((resolve) => {
      this.reloading();
    });
  }

  public async reloading() {
    this.cards = await this.databaseReq.getToDoCards();
    this.reloadReq = false;
  }
  public async reloadingNew() {
    console.log('llego');
    this.reloadReq = true;
    this.cards = await this.databaseReq.getToDoCards();
    this.reloadReq = false;
  }
}
