import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowedMenusComponent } from './allowed-menus.component';

describe('AllowedMenusComponent', () => {
  let component: AllowedMenusComponent;
  let fixture: ComponentFixture<AllowedMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowedMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowedMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
