import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { toDoNoteCard } from './todo-card.interface';

@Injectable({
  providedIn: 'root',
})
export class databaseRequestService {
  constructor(private http: HttpClient) {}
  public allCards: any = [];
  async getToDoCards() {
    console.log('llegamás');
    this.allCards = [];
    //console.log(this.http.get<string>("http://35.210.178.12:3004/m"));
    /* this.allCards = await this.http.get('http://35.210.178.12:3004/m', {
      headers: { miHeader: 'mivalor' }
    }); */

    this.allCards = await this.get('https://domi-notes.domid.dev/m');

    console.log(this.allCards);
    return this.allCards;
  }

  private get(url: string): Promise<any> {
    return new Promise((resolve) => {
      const http = new XMLHttpRequest();
      http.open('GET', url);
      http.setRequestHeader('miHeader', 'mivalue');
      http.send();
      console.log('llego');
      http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
          resolve(JSON.parse(http.responseText));
          console.log(JSON.parse(http.responseText));
        } else {
          console.log(http.readyState + '-----' + http.status);
        }
      };
    });
  }

  public insertNewNote(titleNote: string, contentNote: string) {
    const http = new XMLHttpRequest();
    http.open('POST', 'https://domi-notes.domid.dev/addnewnote');
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.setRequestHeader('miHeader', 'mivalor');

    http.send(JSON.stringify({ titleNote, contentNote }));
  }
}
