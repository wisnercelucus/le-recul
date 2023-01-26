import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordImageChooserComponent } from './record-image-chooser.component';

describe('RecordImageChooserComponent', () => {
  let component: RecordImageChooserComponent;
  let fixture: ComponentFixture<RecordImageChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordImageChooserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordImageChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
