import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './fake-value-service';

fdescribe('MasterService', () => {

  it('should return "my value service" from  the real service', () => {
    const  valueService =  new ValueService();
    const masterService = new MasterService(valueService);
    expect(masterService.getValue()).toBe('my value service');
  });

  it('should return "other value" from  the fake service', () => {
    const  fakeValueService =  new FakeValueService();
    const masterService = new MasterService(fakeValueService as unknown as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });


  it('should return "other value" from  the fake object', () => {
    const fake = { getValue: () => 'fake value'};
    const masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });
});
