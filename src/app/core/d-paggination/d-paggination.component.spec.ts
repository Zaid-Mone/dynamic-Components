import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DPagginationComponent } from './d-paggination.component';

describe('DPagginationComponent', () => {
  let component: DPagginationComponent;
  let fixture: ComponentFixture<DPagginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DPagginationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DPagginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
