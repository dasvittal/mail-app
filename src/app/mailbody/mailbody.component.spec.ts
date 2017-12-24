import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailbodyComponent } from './mailbody.component';

describe('MailbodyComponent', () => {
  let component: MailbodyComponent;
  let fixture: ComponentFixture<MailbodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailbodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
