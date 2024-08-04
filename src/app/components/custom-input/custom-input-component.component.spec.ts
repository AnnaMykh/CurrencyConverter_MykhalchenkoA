import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputComponentComponent } from './custom-input-component.component';

describe('CustomInputComponentComponent', () => {
  let component: CustomInputComponentComponent;
  let fixture: ComponentFixture<CustomInputComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomInputComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomInputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
