import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterItemAttributesComponent } from './filter-item-attributes.component';

describe('FilterItemAttributesComponent', () => {
  let component: FilterItemAttributesComponent;
  let fixture: ComponentFixture<FilterItemAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterItemAttributesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterItemAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
