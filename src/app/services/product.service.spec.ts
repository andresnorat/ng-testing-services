import { TestBed, } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ProductService } from './product.service';
import { Product } from '../models/product-model';
import { environment } from './../../environments/environment';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';

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
      const mockData: Product[] = generateManyProducts(2);

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
    });
  });

  describe('test for getAllPorducts', () => {
    
    
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(3);

      productService.getAllPorducts()
        .subscribe((data) => {
          expect(data.length).toEqual(mockData.length);
          doneFn();
        })
      // http config
      const url = `${environment.API_URL}/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });

    it('should return product list with taxes', (doneFn) => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * .19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 * .19 = 38 
        },
        {
          ...generateOneProduct(),
          price: 0, // 200 * .19 = 38 
        },
        {
          ...generateOneProduct(),
          price: -100, // 200 * .19 = 38 
        },
      ];

      productService.getAllPorducts()
      .subscribe((data) => {
      expect(data.length).toEqual(mockData.length);
      expect(data[0].taxes).toEqual(19);
      expect(data[1].taxes).toEqual(38);
      expect(data[2].taxes).toEqual(0);
      expect(data[3].taxes).toEqual(0);
      doneFn()
      });
        // http config
        const url = `${environment.API_URL}/products`
        const req = httpController.expectOne(url);
        req.flush(mockData);
        httpController.verify();
    });

    it('should send query params width limit 10 offset 3', (doneFn) => {
      const mockData: Product[] = generateManyProducts(2);
      const limit = 10;
      const offset = 3

      productService.getAllPorducts(limit, offset)
        .subscribe((data) => {
          expect(data.length).toEqual(mockData.length);
          doneFn();
        })
      // http config
      const url = `${environment.API_URL}/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
      req.flush(mockData);
      httpController.verify();
    });
  });
});