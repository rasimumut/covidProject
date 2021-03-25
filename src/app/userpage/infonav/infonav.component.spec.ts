import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfonavComponent } from './infonav.component';

describe('InfonavComponent', () => {
  let component: InfonavComponent;
  let fixture: ComponentFixture<InfonavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfonavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfonavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
