import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageaccountComponent } from './manageaccount.component';

describe('ManageaccountComponent', () => {
  let component: ManageaccountComponent;
  let fixture: ComponentFixture<ManageaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageaccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
