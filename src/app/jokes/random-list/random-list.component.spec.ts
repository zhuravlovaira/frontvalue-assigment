import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomListComponent } from './random-list.component';

describe('RandomListComponent', () => {
  let component: RandomListComponent;
  let fixture: ComponentFixture<RandomListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomListComponent],
    });
    fixture = TestBed.createComponent(RandomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
