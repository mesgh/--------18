require('should');
const { get } = require('axios');
const URL_ONE = 'https://kodaktor.ru/api2/there/';
const URL_TWO = 'https://kodaktor.ru/api2/andba/';
const cases = [-1024, -10, -1, -0.5, -0.1, 0, 0.1, 0.5, 1, 5, 10, 100, 256, 1024, 100/3, Math.sqrt(17)];

cases.forEach((v)=>{
    const semi_guess = 36*v**2+48*v+15;
    const guess_one = (-24+Math.sqrt(24**2-36*(15-semi_guess)))/36;
    const guess_two = (-24-Math.sqrt(24**2-36*(15-semi_guess)))/36;
    const guess = Math.max(guess_one, guess_two);
    describe ('Отправил на первый адрес: ' + v, function() {
        it ('Ожидаем от первого: ' + semi_guess, async function () {
            const {data: semi_result} = await get(URL_ONE+v);
            const solver = Math.abs(semi_result - semi_guess) < Number.EPSILON;
            solver.should.equal(true);
            console.log('Отправил на второй адрес: ' + semi_result);
        });
        it ('Ожидаем от второго: ' + guess, async function () {
            const {data: semi_result} = await get(URL_ONE+v);
            const {data: result} = await get(URL_TWO+semi_result);
            const solver = Math.abs(result - guess) < Number.EPSILON;
            solver.should.equal(true);
        });
    });
});
