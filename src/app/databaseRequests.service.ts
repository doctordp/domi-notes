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
    return this.http
      .post(
        'https://domi-notes.domid.dev/addnewnote',
        JSON.stringify({ titleNote, contentNote }),
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
      )
      .toPromise();
  }

  public removeSingleCard(idCard: string) {
    return this.http
      .delete('https://domi-notes.domid.dev/removeone', {
        headers: { idToRemove: idCard },
      })
      .toPromise();
  }
}
