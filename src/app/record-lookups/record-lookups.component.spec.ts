import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordLookupsComponent } from './record-lookups.component';

describe('RecordLookupsComponent', () => {
  let component: RecordLookupsComponent;
  let fixture: ComponentFixture<RecordLookupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordLookupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordLookupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
