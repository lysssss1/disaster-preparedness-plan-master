import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatememoComponent } from './updatememo.component';

describe('UpdatememoComponent', () => {
  let component: UpdatememoComponent;
  let fixture: ComponentFixture<UpdatememoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatememoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatememoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
