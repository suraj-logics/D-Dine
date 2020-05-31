import { Component, NgZone, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestureController } from '@ionic/angular';
import { Gesture, GestureConfig } from '@ionic/core';
import { CommonService } from 'src/shared/services/common.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  @ViewChild('slides', {read: ElementRef, static: false}) slides;
  // @ViewChild('firstSlide', {read: ElementRef, static: false})
  // firstSlide: ElementRef;

  // @ViewChild('secondSlide', {read: ElementRef, static: false})
  // secondSlide: ElementRef;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  active:any=0;
  constructor(
    private router: Router,
    public gestureCtrl: GestureController,
    private element: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone,
    protected CS:CommonService  ) {
  }

  ngOnInit() {
  }
  slideChanged() { 
    this.slides.nativeElement.getActiveIndex().then(index => {
      this.active=index;
    });
    }
  // ngAfterViewInit() {
  //   const options: GestureConfig = {
  //     el: this.firstSlide.nativeElement,
  //     gestureName: 'swipe-forward',
  //     onStart: (detail) => {
  //       this.renderer.setStyle(this.firstSlide.nativeElement, 'transition', 'none');
  //       this.renderer.setStyle(this.secondSlide.nativeElement, 'transition', 'none');
  //     },
  //     onMove: ev => {
  //     },
  //     onEnd: ev => {
  //       if (ev.deltaX < -50 ) {
  //         this.renderer.setStyle(this.firstSlide.nativeElement,
  //           'transform',
  //           'translateX(-400px)'
  //         );
  //         this.renderer.setStyle(this.secondSlide.nativeElement,
  //           'transform',
  //           'none'
  //         );
  //         this.renderer.setStyle(this.firstSlide.nativeElement,
  //           'z-index',
  //           '1'
  //         );
  //         this.renderer.setStyle(this.secondSlide.nativeElement,
  //           'z-index',
  //           '2'
  //         );
  //       }
  //     }
  //   };

  //   const options2: GestureConfig = {
  //     el: this.secondSlide.nativeElement,
  //     gestureName: 'swipe-back',
  //     onStart: (detail) => {
  //       this.renderer.setStyle(this.firstSlide.nativeElement, 'transition', 'none');
  //       this.renderer.setStyle(this.secondSlide.nativeElement, 'transition', 'none');
  //     },
  //     onMove: ev => {
  //     },
  //     onEnd: ev => {
  //       if (ev.deltaX > 50 ) {
  //         this.renderer.setStyle(this.secondSlide.nativeElement,
  //           'transform',
  //           'translateX(400px)'
  //         );
  //         this.renderer.setStyle(this.firstSlide.nativeElement,
  //           'transform',
  //           'none'
  //         );
  //         this.renderer.setStyle(this.secondSlide.nativeElement,
  //           'z-index',
  //           '1'
  //         );
  //         this.renderer.setStyle(this.firstSlide.nativeElement,
  //           'z-index',
  //           '2'
  //         );
  //       }
  //       if (ev.deltaX < 50 ) {
  //         this.ngZone.run(() => this.router.navigateByUrl('/terms')).then();
  //       }
  //     }
  //   };

  //   const gesture: Gesture = this.gestureCtrl.create(options);
  //   const gesture2: Gesture = this.gestureCtrl.create(options2);
  //   gesture.enable();
  //   gesture2.enable();
  // }

  // showFirstSlide() {
  //   this.renderer.setStyle(this.secondSlide.nativeElement,
  //     'transform',
  //     'translateX(-400px)'
  //   );
  //   this.renderer.setStyle(this.firstSlide.nativeElement,
  //     'transform',
  //     'none'
  //   );
  // }
  // showSecondSlide() {
  //   this.renderer.setStyle(this.firstSlide.nativeElement,
  //     'transform',
  //     'translateX(-400px)'
  //   );
  //   this.renderer.setStyle(this.secondSlide.nativeElement,
  //     'transform',
  //     'none'
  //   );
  // }

  // onSkipIntro() {
  //   this.router.navigateByUrl('/terms');
  // }

}
