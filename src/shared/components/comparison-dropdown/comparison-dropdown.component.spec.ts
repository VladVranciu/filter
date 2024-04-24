import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonDropdownComponent } from './comparison-dropdown.component';

describe('ComparisonDropdownComponent', () => {
  let component: ComparisonDropdownComponent;
  let fixture: ComponentFixture<ComparisonDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComparisonDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
