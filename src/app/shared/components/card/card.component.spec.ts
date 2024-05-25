import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Product } from '../../../types/product.inteface';
import { CardComponent } from './card.component';
import { productMock } from '../../../pages/manage-products/create-product/create-product.component.spec';

// se quiser executar apenas o teste atual, coloque 'f' na frente de describe ou it. Ficando 'fdescribe' ou 'fit'.
describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CardComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar as propriedades do produto no template', () => {

    component.product = productMock;

    fixture.detectChanges();

    const productImg = fixture.debugElement.query(By.css('img')).nativeElement;
    const productTitle = fixture.debugElement.query(By.css('h2')).nativeElement;
    const productDescription = fixture.debugElement.query(By.css('p')).nativeElement;
    const productPrice = fixture.debugElement.query(By.css('h3')).nativeElement;

    expect(productImg.src).toContain(productMock.image);
    expect(productTitle.textContent).toContain(productMock.title);
    expect(productDescription.textContent).toContain(productMock.description);
    expect(productPrice.textContent).toContain(productMock.price);
  });

  it('deve emitir o evento onDelete quando onDeleteClick for chamado', () => {

    const spy = spyOn(component.onDelete, 'emit'); // spy altera o comportamento de um método ou uma função. Ele mockou a função onDelete.

    component.product = productMock;
    component.isManagable = true;

    fixture.detectChanges();

    const managableElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(managableElement).not.toBeNull();

    component.onDeleteClick();
    expect(spy).toHaveBeenCalledWith(productMock); // verifica se o spy chamou o emit passando o product
  });

  it('deve emitir o evento onEdit quando onEditClick for chamado', () => {

    const spy = spyOn(component.onEdit, 'emit');

    component.product = productMock;
    component.isManagable = true;

    fixture.detectChanges();

    const managableElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(managableElement).not.toBeNull();

    component.onEditClick();

    expect(spy).toHaveBeenCalledWith(productMock);
  });
});
