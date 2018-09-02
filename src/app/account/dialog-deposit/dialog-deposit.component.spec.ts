import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDepositComponent } from './dialog-deposit.component';

describe('DialogDepositComponent', () => {
  let component: DialogDepositComponent;
  let fixture: ComponentFixture<DialogDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
