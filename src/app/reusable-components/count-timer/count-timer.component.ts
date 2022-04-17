import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'vn-count-timer',
  template: `<div class="timer">
              <span>{{date | date}}</span>
              <p id="timer" #timer></p>
             </div>
             `,
  styleUrls: ['./count-timer.component.scss'],
})
export class CountTimerComponent implements OnInit {
  @ViewChild('timer') timerElement!: ElementRef;

  @Input() date!: Date;

  constructor(@Inject(PLATFORM_ID) private _plateformId: Object) {}

  ngOnInit(): void {
    if(isPlatformBrowser(this._plateformId)){
      this.startCounting(this.date);
    }
  }

  startCounting(date: Date): void {
    // Set the date we're counting down to
    let countDownDate = date.getTime();

    // Update the count down every 1 second
    let x = setInterval(() => {
      // Get today's date and time
      let now = new Date().getTime();
      // Find the distance between now and the count down date
      let distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // Display the result in the element with id="demo"
      this.timerElement.nativeElement.innerHTML =  days + 'd : ' + hours + 'h : ' + minutes + 'm : ' + seconds + 's ';
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        this.timerElement.nativeElement.innerHTML = 'EXPIRED';
      }
    }, 1000);
  }
}
