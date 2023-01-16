import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyImageCroperComponent } from './my-image-croper.component';

describe('ImageCroperComponent', () => {
  let component: MyImageCroperComponent;
  let fixture: ComponentFixture<MyImageCroperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyImageCroperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyImageCroperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
