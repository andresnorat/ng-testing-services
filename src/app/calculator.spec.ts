import { Calculator } from './calculator';

describe('Test for Calculator', () => {


    describe('Test for multiply', () => {
        it('#multiply should return a nine', () => {
            //Arrange
            const calculator = new Calculator();
            //Act
            const rta = calculator.multiply(3, 3);
            //Assert
            expect(rta).toEqual(9);
        });
        it('#multiply should return a four', () => {
            //Arrange
            const calculator = new Calculator();
            //Act
            const rta = calculator.multiply(1, 4);
            //Assert
            expect(rta).toEqual(4);
        });
    });

    describe('Test for divide', () => {
        it('#divide should return a some numbers', () => {
            //Arrange
            const calculator = new Calculator();
            //Act and Assert 
            expect(calculator.divide(6, 3)).toEqual(2);
            expect(calculator.divide(5, 2)).toEqual(2.5);
        });


        it('#divide for a zero', () => {
            const calculator = new Calculator();

            expect(calculator.divide(0, 0)).toBeNull();
        });
    });


    describe('Test for matchers', () => {
        it('#test matchers', () => {
            let name = 'andres';
            let name2;

            expect(name).toBeDefined();
            expect(name2).toBeUndefined();


            expect(1 + 3 === 4).toBeTruthy();
            expect(1 + 1 === 3).toBeFalsy();

            expect(5).toBeLessThan(10);
            expect(20).toBeGreaterThan(10);

            //toMatch se puede enviar una expresion regular y ver si cumple con esta  !Importante recordar¡
            expect('123456').toMatch(/123/);
            expect(['apples', 'oranges', 'pears']).toContain('oranges');
        });
    });
});
