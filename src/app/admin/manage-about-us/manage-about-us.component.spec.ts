import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAboutUsComponent } from './manage-about-us.component';

describe('ManageAboutUsComponent', () => {
  let component: ManageAboutUsComponent;
  let fixture: ComponentFixture<ManageAboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAboutUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
