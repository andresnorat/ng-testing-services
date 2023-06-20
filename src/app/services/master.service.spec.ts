import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './fake-value-service';
import { TestBed } from '@angular/core/testing';

describe('MasterService', () => {
  let masterService:  MasterService;
  let valueService: jasmine.SpyObj<ValueService>;


  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService',['getValue']);

    TestBed.configureTestingModule({
      providers: [MasterService, 
        { provide: ValueService, useValue: spy}
      ],
    });
    masterService = TestBed.inject(MasterService);
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>
  })

  // it('should return "my value service" from  the real service', () => {
  //   const valueService = new ValueService();
  //   const masterService = new MasterService(valueService);
  //   expect(masterService.getValue()).toBe('my value service');
  // });

  // it('should return "other value" from  the fake service', () => {
  //   const fakeValueService = new FakeValueService();
  //   const masterService = new MasterService(fakeValueService as unknown as ValueService);
  //   expect(masterService.getValue()).toBe('fake value');
  // });


  // it('should return "other value" from  the fake object', () => {
  //   const fake = { getValue: () => 'fake value' };
  //   const masterService = new MasterService(fake as ValueService);
  //   expect(masterService.getValue()).toBe('fake value');
  // });

  it('should call to getValue from ValueService', () => {
    // const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    // const masterService = new MasterService(valueServiceSpy);
    valueService.getValue.and.returnValue('fake value');
    expect(masterService.getValue()).toBe('fake value')
    expect(valueService.getValue).toHaveBeenCalled();
    expect(valueService.getValue).toHaveBeenCalledTimes(1);
  });
});
