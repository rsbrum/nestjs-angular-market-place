import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBidDialogComponent } from './new-bid-dialog.component';

describe('NewBidDialogComponent', () => {
  let component: NewBidDialogComponent;
  let fixture: ComponentFixture<NewBidDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBidDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
