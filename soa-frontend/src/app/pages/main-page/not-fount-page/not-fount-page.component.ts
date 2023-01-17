import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-not-fount-page',
  templateUrl: './not-fount-page.component.html',
  styleUrls: ['./not-fount-page.component.scss']
})
export class NotFountPageComponent implements OnInit {

  constructor(
    private _router: Router,) { }

  ngOnInit(): void {
  }

  goToMainPage() {
    this._router.navigate(['/'])
  }
}
