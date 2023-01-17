import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatTabChangeEvent} from "@angular/material/tabs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public actualTab: 'labs' | 'disciplines' = 'labs';
  public selectedIndex = 0;

  constructor(private _router: Router,
              private _cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const url = this._router.url;
    if (url.includes("disciplines")) this.selectedIndex = 2
    else if(url.includes("labs")) this.selectedIndex = 1;
    else this.selectedIndex = 0;

    this._cdr.markForCheck()
  }

  changeTab(event: MatTabChangeEvent) {
    if (event.index == 0) {
      this.setTab("about")
    } else if (event.index == 1){
      this.setTab("labs")
    }else{
      this.setTab("disciplines")
    }
  }

  private setTab(tab: string) {
    this._router.navigate([], {
      queryParams: {
        tab
      }
    })
  }
}
