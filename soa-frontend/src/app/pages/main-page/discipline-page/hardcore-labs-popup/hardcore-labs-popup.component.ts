import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Lab} from "../../../../types/LabType";

@Component({
  selector: 'app-hardcore-labs-popup',
  templateUrl: './hardcore-labs-popup.component.html',
  styleUrls: ['./hardcore-labs-popup.component.scss']
})
export class HardcoreLabsPopupComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<HardcoreLabsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Lab[]
  ) {}

  ngOnInit(): void {

  }

}
