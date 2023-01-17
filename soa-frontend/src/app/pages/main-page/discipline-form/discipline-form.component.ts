import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../../../services/http.service";

@Component({
  selector: 'app-discipline-form',
  templateUrl: './discipline-form.component.html',
  styleUrls: ['./discipline-form.component.scss']
})
export class DisciplineFormComponent implements OnInit {
  public form = this._fb.group(
    {
      name: [null, Validators.required],
      lectureHours: [null, Validators.required],
      selfStudyHours: [null, Validators.required]
    });

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<DisciplineFormComponent>) {
  }

  ngOnInit(): void {

  }

  saveDiscipline() {
    if (this.isDisabledButton()) return

    this._dialogRef.close(this.form.getRawValue())
  }

  isDisabledButton = () => !this.form.valid
}
