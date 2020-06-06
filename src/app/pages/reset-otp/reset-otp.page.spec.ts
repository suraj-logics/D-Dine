import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetOtpPage } from './reset-otp.page';

describe('ResetOtpPage', () => {
  let component: ResetOtpPage;
  let fixture: ComponentFixture<ResetOtpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetOtpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
