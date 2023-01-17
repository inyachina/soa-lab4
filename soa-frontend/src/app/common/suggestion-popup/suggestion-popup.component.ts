import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-suggestion-popup',
  templateUrl: './suggestion-popup.component.html',
  styleUrls: ['./suggestion-popup.component.scss']
})
export class SuggestionPopupComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<SuggestionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      text: string
    }) {
  }

  ngOnInit(): void {
  }

  closeDialog(res: boolean) {
    this._dialogRef.close(res)
  }
}
