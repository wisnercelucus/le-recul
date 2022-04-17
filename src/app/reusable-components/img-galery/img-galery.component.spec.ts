import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgGaleryComponent } from './img-galery.component';

describe('ImgGaleryComponent', () => {
  let component: ImgGaleryComponent;
  let fixture: ComponentFixture<ImgGaleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgGaleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgGaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
