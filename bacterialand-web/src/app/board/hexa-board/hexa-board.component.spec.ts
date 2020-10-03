import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexaBoardComponent } from './hexa-board.component';

describe('HexaBoardComponent', () => {
  let component: HexaBoardComponent;
  let fixture: ComponentFixture<HexaBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexaBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexaBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
