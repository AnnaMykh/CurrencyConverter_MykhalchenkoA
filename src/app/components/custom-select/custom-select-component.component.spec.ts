import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectComponentComponent } from './custom-select-component.component';

describe('CustomSelectComponentComponent', () => {
  let component: CustomSelectComponentComponent;
  let fixture: ComponentFixture<CustomSelectComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSelectComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomSelectComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
