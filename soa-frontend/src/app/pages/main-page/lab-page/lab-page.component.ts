import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Lab} from "../../../types/LabType";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {HttpService} from "../../../services/http.service";
import {LABS_URI} from "../../../../data/api";
import {Observable} from "rxjs";

@Component({
  selector: 'app-lab-page',
  templateUrl: './lab-page.component.html',
  styleUrls: ['./lab-page.component.scss']
})
export class LabPageComponent implements OnInit {
  public $lab!: Observable<Lab>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _http: HttpService
  ) {
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      const id = params['id']
      this.$lab = this._http.getData<Lab>(LABS_URI + `/${id}`,)
    });
  }

  redirect(tab: string) {
    this._router.navigate(['/'], {
      queryParams: {
        tab
      }
    })
  }

  changeTab(event: MatTabChangeEvent) {
    if (event.index == 1)
      this.redirect("about")
    if (event.index == 2)
      this.redirect("labs")

    else this.redirect("disciplines")

  }
}
