import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmemoComponent } from './addmemo.component';

describe('AddmemoComponent', () => {
  let component: AddmemoComponent;
  let fixture: ComponentFixture<AddmemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
