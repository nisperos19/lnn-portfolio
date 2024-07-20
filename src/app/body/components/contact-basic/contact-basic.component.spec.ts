import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactBasicComponent } from './contact-basic.component';

describe('ContactBasicComponent', () => {
  let component: ContactBasicComponent;
  let fixture: ComponentFixture<ContactBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
