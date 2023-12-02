import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedCarItemComponent } from './listed-car-item.component';

describe('ListedCarItemComponent', () => {
  let component: ListedCarItemComponent;
  let fixture: ComponentFixture<ListedCarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListedCarItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListedCarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
