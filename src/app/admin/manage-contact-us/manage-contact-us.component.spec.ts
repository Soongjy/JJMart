import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContactUsComponent } from './manage-contact-us.component';

describe('ManageContactUsComponent', () => {
  let component: ManageContactUsComponent;
  let fixture: ComponentFixture<ManageContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageContactUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
