import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageProductsComponent } from './manage-products.component';
import { MatDialog } from '@angular/material/dialog';

import { of } from 'rxjs';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../../shared/services/products/products.service';
import { ProductsApiService } from '../../shared/services/products/products-api.service';
import { StorageService } from '../../shared/services/storage/storage.service';
import { productMock } from './create-product/create-product.component.spec';

const productsMock = [
  { id: 1, title: 'Produto A', category: 'eletronic', description: 'Product A', price: 50, image: 'image.png' },
  { id: 2, title: 'Produto B', category: `woman's clothes`, description: 'Product B', price: 80, image: 'image.png' }
];

const data = productsMock;

const storageServiceMock = {
  getAll: function(): any {
    return Object.values(data);
  },

  setValue: function(key: any, value: any) {
    data[key] = value;
  },

  remove: function(key: any) {
    delete data[key];
  }
};

describe('ManageProductsComponent', () => {
  let component: ManageProductsComponent;
  let fixture: ComponentFixture<ManageProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductsComponent ],
      imports: [
        BannerComponent,
        SearchComponent,
        MatIconModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        MatDialog,
        ProductsService,
        ProductsApiService,
        { provide: StorageService, useValue: storageServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve abrir o diálogo de criação de produto ao chamar onSubscribeProduct', () => {
    component.onSubscribeProduct();

    spyOn(component.dialogRef as any, 'afterClosed').and.returnValue(of({}))

    component.dialogRef.close();

    expect(component.products()).not.toBeNull();
  });

  it('deve deletar o produto ao chamar onDelete', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    component.onDelete(productMock);

    expect(component.products()).not.toBeNull();
    expect(component.products().length).toEqual(1);
  });

  it('deve atualizar a lista de produtos ao chamar onSearchText', () => {
    const searchText = 'A';
    component.onSearchText(searchText);

    expect(component.products()).not.toBeNull();
    expect(component.products()[0].title).toEqual('Produto A');
  });

  it('deve manter a lista de produtos quando o searchText é vazio', () => {
    const searchText = '';
    component.onSearchText(searchText);

    expect(component.products()).not.toBeNull();
    expect(component.products().length).toBeGreaterThanOrEqual(1);
  });

  it('deve abrir o diálogo de edição de produto ao chamar onEdit', () => {
    component.onEdit(productMock);

    spyOn(component.dialogRef as any, 'afterClosed').and.returnValue(of({}));

    component.dialogRef.close();

    expect(component.products()).not.toBeNull();
  });
});
