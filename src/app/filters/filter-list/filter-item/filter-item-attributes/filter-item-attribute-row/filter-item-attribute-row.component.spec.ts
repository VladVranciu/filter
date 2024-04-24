import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterItemAttributeRowComponent } from './filter-item-attribute-row.component';

describe('FilterItemAttributeRowComponent', () => {
  let component: FilterItemAttributeRowComponent;
  let fixture: ComponentFixture<FilterItemAttributeRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterItemAttributeRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterItemAttributeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
