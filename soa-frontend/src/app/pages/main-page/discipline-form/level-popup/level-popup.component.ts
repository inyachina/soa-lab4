import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-level-popup',
  templateUrl: './level-popup.component.html',
  styleUrls: ['./level-popup.component.scss']
})
export class LevelPopupComponent implements OnInit {
  public availableValue!: number;
  public stepArray!: number[];
  public currentStep?: number;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<LevelPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
  }

  ngOnInit() {
    this.initAvailableValue();
  }


  private initAvailableValue() {
    switch (this.data) {
      case "VERY_EASY":
        return
      case "NORMAL":
        this.availableValue = 1;
        break;
      case "VERY_HARD":
        this.availableValue = 2;
        break;
      case "IMPOSSIBLE":
        this.availableValue = 3;
        break;
      case "INSANE":
        this.availableValue = 4;
    }
    this.stepArray = Array.from({length: this.availableValue}, (v, k) => k + 1);
  }

  closePopup() {
    this._dialogRef.close(this.currentStep)
  }
}
