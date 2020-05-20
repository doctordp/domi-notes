import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { databaseRequestService } from '../databaseRequests.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css'],
})
export class NewNoteComponent implements OnInit {
  @Output() closeNewNote = new EventEmitter<void>();
  @Output() reloadNewNote = new EventEmitter<void>();
  newNoteForm: FormGroup;
  public onClose() {
    this.closeNewNote.emit();
  }

  constructor(private databaseReq: databaseRequestService) {}

  ngOnInit() {
    this.newNoteForm = new FormGroup({
      dataNote: new FormGroup({
        titleNote: new FormControl(),
        contentNote: new FormControl(),
      }),
    });
  }

  onSubmit() {
    console.log('submited!');
    this.databaseReq
      .insertNewNote(
        this.newNoteForm.value.dataNote.titleNote,
        this.newNoteForm.value.dataNote.contentNote
      )
      .then((data) => {
        this.reloadNewNote.emit();
        this.onClose();
      })
      .catch((error) => console.log(error));
  }
}
