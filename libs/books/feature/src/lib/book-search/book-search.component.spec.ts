import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookSearchComponent],
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should test search form validity', () => {
    const form = component.searchForm;
    expect(form.valid).toBeFalsy();

    const term = component.searchForm.controls['term'];
    term.setValue('javascript');

    expect(form.valid).toBeTruthy();
  });

  it('should disable the search button when search term is not provided', () => {
    const term = component.searchForm.controls['term'];
    term.setValue(null);

    const searchBtn = fixture.nativeElement.querySelector(
      '[data-testing="search-button"]'
    );

    expect(searchBtn.disabled).toBeTruthy();
  });

  it('should enable the search button when search term is provided', () => {
    const term = component.searchForm.controls['term'];
    term.setValue('javascript');
    fixture.detectChanges();

    const searchBtn = fixture.nativeElement.querySelector(
      '[data-testing="search-button"]'
    );

    expect(searchBtn.disabled).toBeFalsy();
  });
});
