import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControlName, FormGroup, Validator, Validators} from "@angular/forms";
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent implements OnInit {
  public control = new FormControl('', Validators.required);

  constructor(
    private _dialogRef: MatDialogRef<DeletePopupComponent>,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this._dialogRef.close({
      flag: true,
      difficultyType: this.control.value
    })
  }

  cancel(){
    this._dialogRef.close({
      flag: false
    })
  }

  isDisabledControl() {
    return !this.control.valid;
  }
}
