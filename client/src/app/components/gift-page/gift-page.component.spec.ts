import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftPageComponent } from './gift-page.component';

describe('GiftPageComponent', () => {
  let component: GiftPageComponent;
  let fixture: ComponentFixture<GiftPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
