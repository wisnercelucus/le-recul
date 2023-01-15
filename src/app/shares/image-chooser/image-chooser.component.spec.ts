import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageChooserComponent } from './image-chooser.component';

describe('ImageChooserComponent', () => {
  let component: ImageChooserComponent;
  let fixture: ComponentFixture<ImageChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageChooserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
