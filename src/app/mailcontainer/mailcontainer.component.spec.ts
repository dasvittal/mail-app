import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailcontainerComponent } from './mailcontainer.component';

describe('MailcontainerComponent', () => {
  let component: MailcontainerComponent;
  let fixture: ComponentFixture<MailcontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailcontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
