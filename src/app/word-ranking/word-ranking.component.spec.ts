import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordRankingComponent } from './word-ranking.component';

describe('WordRankingComponent', () => {
  let component: WordRankingComponent;
  let fixture: ComponentFixture<WordRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
