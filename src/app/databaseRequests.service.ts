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
  public token: string;

  async getToDoCards() {
    console.log('llegamás');
    this.allCards = [];
    console.log(localStorage.token);
    this.allCards = await this.http
      .get('https://domi-notes.domid.dev:444/m', {
        headers: {
          token: localStorage.token,
        },
      })
      .toPromise()
      .then((data) => {
        return data;
      });

    console.log(this.allCards);
    return this.allCards;
  }

  public insertNewNote(titleNote: string, contentNote: string) {
    return this.http
      .post(
        'https://domi-notes.domid.dev:444/addnewnote',
        JSON.stringify({ titleNote, contentNote }),
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            token: localStorage.token,
          },
        }
      )
      .toPromise();
  }

  public removeSingleCard(idCard: string) {
    return this.http
      .delete('https://domi-notes.domid.dev:444/removeone', {
        headers: {
          idToRemove: idCard,
          token: localStorage.token,
        },
      })
      .toPromise();
  }
}

/*   private get(url: string): Promise<any> {
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
  } */
