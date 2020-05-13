import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent {
  @Output() closeNewNote = new EventEmitter<void>();

  public onClose() {
    this.closeNewNote.emit();
  }

}
