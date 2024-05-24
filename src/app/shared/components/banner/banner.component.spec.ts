import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { By } from '@angular/platform-browser';

fdescribe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o título no template', () => {

    const title = "Testando o título";

    component.title = title;
    fixture.detectChanges();

    const bannerTitle = fixture.debugElement.query(By.css('h1')).nativeElement;

    expect(bannerTitle.textContent).toContain(title);
  });
});
