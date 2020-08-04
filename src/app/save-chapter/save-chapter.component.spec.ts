import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveChapterComponent } from './save-chapter.component';

describe('SaveChapterComponent', () => {
  let component: SaveChapterComponent;
  let fixture: ComponentFixture<SaveChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
