import { ValueService } from './value.service';

fdescribe('Test for ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('Test for getValue', () => {
    it('should return "my value service"', () => {
      expect(service.getValue()).toBe('my value service')
    });
  });

  describe('Test for setValue', () => {
    it('should change the value', () => {
      expect(service.getValue()).toBe('my value service');
      service.setValue('change');
      expect(service.getValue()).toBe("change");
    });
  });


  describe('Test for getPromiseValue', () => {
    it('should return "Prommise value" from Promise with then', (doneFn) => {
      service.getPromiseValue()
        .then((value) => {
          expect(value).toBe('Prommise value');
          doneFn();
        });
    });

    it('should return "Prommise value" from Promise using async', async () => {
      const rta = await service.getPromiseValue();
      expect(rta).toBe('Prommise value');
    });
  });


  describe('Test for getObservableValue', () => {

    it('should return "Observable value" from Observable', (doneFn) => {
      service.getObservableValue()
        .subscribe(value => {
          expect(value).toBe('Observable value');
          doneFn();
        });
    });
  });
});
