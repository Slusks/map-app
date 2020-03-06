import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerCardComponent } from './marker-card.component';

describe('MarkerCardComponent', () => {
  let component: MarkerCardComponent;
  let fixture: ComponentFixture<MarkerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
