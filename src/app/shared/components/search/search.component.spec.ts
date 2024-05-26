import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchComponent,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve emitir searchText quando onInputChange é chamado', () => {

    const value = 'iPhone 15';
    const event = { target: { value } } as unknown as Event;

    const spy = jest.spyOn(component.searchText, 'emit');

    component.onInputChange(event);
    expect(spy).toHaveBeenCalledWith(value);
  });
});
