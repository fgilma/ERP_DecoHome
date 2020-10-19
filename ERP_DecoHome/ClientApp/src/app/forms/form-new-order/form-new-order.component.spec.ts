import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewOrderComponent } from './form-new-order.component';

describe('FormNewOrderComponent', () => {
  let component: FormNewOrderComponent;
  let fixture: ComponentFixture<FormNewOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
