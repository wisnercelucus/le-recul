import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'vn-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, OnDestroy {
  // loginUser!:User|null;
  //subs = new SubSink()

  @Input() hotel = false;
  @Input() cinema = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnDestroy(): void {
    //this.subs.unsubscribe();
  }


  ngOnInit(): void {
    /*this.subs.add(
      this.accountsService.loginUserListener.subscribe(
        res=>{
          this.loginUser = res;
        }
      )
    )*/
  }


}
