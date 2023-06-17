export class FakeValueService {

    constructor() { }

    getValue() {
        return 'fake value'
    }

    setValue(value: string) { }

    getPromiseValue() {
        return Promise.resolve('Prommise value');
    }

}