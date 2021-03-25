import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPieChart2Component } from './my-pie-chart2.component';

describe('MyPieChart2Component', () => {
  let component: MyPieChart2Component;
  let fixture: ComponentFixture<MyPieChart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPieChart2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPieChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
