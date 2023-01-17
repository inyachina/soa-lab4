import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-average-popup',
  templateUrl: './average-popup.component.html',
  styleUrls: ['./average-popup.component.scss']
})
export class AveragePopupComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<AveragePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {}

  ngOnInit(): void {
  }

  close() {
    this._dialogRef.close()
  }
}
