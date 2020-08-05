import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveOpinionComponent } from './save-opinion.component';

describe('SaveOpinionComponent', () => {
  let component: SaveOpinionComponent;
  let fixture: ComponentFixture<SaveOpinionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveOpinionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
