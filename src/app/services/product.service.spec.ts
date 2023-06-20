import { TestBed, } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ProductService } from './product.service';
import { Product } from '../models/product-model';
import { environment } from './../../environments/environment';

fdescribe('ProductService', () => {
  let productService: ProductService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService,]
    });
    productService = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });


  describe('test for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = [{
        id: '1231',
        title: 'bike',
        price: 1121,
        description: 'bla bla bla',
        category: {
          id: '54',
          name: 'sas',
          image: 'asas'
        },
        images: ['asasas', 'aslklas']
      }];

      productService.getAllSimple()
        .subscribe((data) => {
          expect(data.length).toEqual(mockData.length);
          expect(data).toEqual(mockData);
          doneFn();
        })
      // http config
      const url = `${environment.API_URL}/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    })
  });
});
