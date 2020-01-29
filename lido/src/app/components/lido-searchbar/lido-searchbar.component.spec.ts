import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LidoSearchbarComponent } from './lido-searchbar.component';

describe('LidoSearchbarComponent', () => {
  let component: LidoSearchbarComponent;
  let fixture: ComponentFixture<LidoSearchbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LidoSearchbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LidoSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
