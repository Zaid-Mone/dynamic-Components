import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DTableComponent } from './d-table.component';

describe('DTableComponent', () => {
  let component: DTableComponent;
  let fixture: ComponentFixture<DTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
