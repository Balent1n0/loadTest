import http from 'k6/http';
import {sleep, check, group} from 'k6';
import {url, params, randomizer, loginData, updatingData} from './testData.js';

export const options = {
    vus: 1,
    iterations: 10,
    rps: 1
    // scenarios:{
    //   // scenarioName:{ // 1.Поддерж. пост-е кол-во VU в теч-е зад-го времени
    //   //   executor:'constant-vus',
    //   //   vus: 2,
    //   //   duration: '4s',
    //   // },
    //   // scenarioName:{ // 2.Позв. увеличивать и(или) уменьшать количество VU
    //   //   executor: 'ramping-vus',
    //   //   startVus: 0,
    //   //   stages: [
    //   //     {duration: '5s',target: 2},
    //   //     {duration: '5s',target: 4},
    //   //     {duration: '5s',target: 2}
    //   //   ]
    //   // },
    //   // scenarioName:{ // 3.Каждый VU выполняет заданное количество итераций
    //   //   executor: 'per-vu-iterations',
    //   //   vus: 5,
    //   //   iterations: 2
    //   // },
    //   // scenarioName: { // 4.Общее кол-во итераций распределяется м-у всеми VU
    //   //   executor: 'shared-iterations',
    //   //   vus: 3,
    //   //   iterations: 10
    //   // },
    //   // scenarioName: { // 5.Генерирует пост-ую скорость поступления запросов (итераций)
    //   //   executor: 'constant-arrival-rate',
    //   //   rate: 50,
    //   //   timeUnit: '10s',
    //   //   duration: '30s',
    //   //   preAllocatedVus: 0,
    //   //   maxVus: 3,
    //   // },
    //   // scenarioName:{ // 6.Позволяет изменять скорость поступления запросов по заданному расписанию
    //   //   executor: 'ramping-arrival-rate',
    //   //   preAllocatedVus: 1,
    //   //   maxVus: 5,
    //   //   stages: [
    //   //     {duration:'5s', target:1},
    //   //     {duration:'10s', target:10},
    //   //     {duration:'5s', target:1}
    //   //   ]
    //   // },
    //   // scenarioName: { // 7.Позволяет управлять нагрузкой из внешнего источника
    //   //   executor: 'externally-controlled',
    //   //   vus: 1,
    //   //   maxVus: 5,
    //   //   duration: '0' // Если 0 - тест необходимо остановить вручную.
    //   // }
    // },
    // thresholds:{
    //   http_req_duration:[{threshold: 'p(95)<300',abortOnFail: true, delayAbortEval: '10s'}],
    //   http_req_duration:['avg<150'], // Ср. время ответа менее 150мс
    //   'http_req_duration': ['p(95)<500'], // 95% запросов должны выполняться менее чем за 500 мс
    //   http_req_duration:['<200'], // Все запросы должны выполняться менее чем за 300 мс
    //   http_req_duration:['avg<150', 'p(95)<300'], // Исп-е нескольких пороговых значений
    //   http_req_waiting: ['avg<300'], // Среднее время ожидания ответа сервера < 300 мс
    //   checks:['rate>0.99'], // Доля успешных проверок д.б. выше 99%
    //   http_req_failed: ['rate<0.01'], // Доля провалившихся проверок д.б менее 1%
    // },
    // discardResponseBodies: true, // Отбрасываем тела ответов, если это не нужно. Уменьшает нагрузку на память.
    //   ext: {
    //     loadImpact: {
    //       author: 'Your Name', // Добавляем информацию об авторе
    //       description: 'Login API Load Test' // Описание теста
    //     }
    //   }
}

export default function () {
    const randomId = randomizer(loginData);
    console.log(randomId);
    group('groupName', function () {
        const payload = JSON.stringify({
            'email': `${loginData[randomId].email}`,
            'password': `${loginData[randomId].password}`
        });
        const postLogin = http.post(`${url}/login`, payload, params);
        console.log(payload);
        check(postLogin, {
            'Login status was 200': (r) => r.status === 200, // 1. Проверка статусов ответа
            'Response of login included token': (r) => r.body.includes('token'), // 2. Проверка содержимого ответа
            'Auth response time is less then 400ms': (r) => r.timings.duration < 300, // 3. Проверка времени отклика
            'Headers check': (r) => r.headers['Content-Type'] === 'application/json; charset=utf-8', // 4. Проверка заголовка ответа
        });

        const payload2 = {'name': `${updatingData[randomId].name}`, 'job': `${updatingData[randomId].job}`};
        const postCreateUser = http.post(`${url}/users`, JSON.stringify(payload2), params);
        const newId = JSON.parse(postCreateUser.body).id;
        console.log(postCreateUser.body);
        check(postCreateUser, {
            'Status of creation operation was 201': (r) => r.status === 201
        });

        const payload3 = {'name': `${updatingData[randomId].name}oslav.`, 'job': `Chief-${updatingData[randomId].job}`};
        const putUpdateUser = http.put(`${url}/users/${newId}`, JSON.stringify(payload3), params);
        console.log(putUpdateUser.body);
        check(putUpdateUser, {
            'Status of update operation was 200': (r) => r.status === 200,
        });

        const deleteUser = http.del(`${url}/users/${newId}`);
        check(deleteUser, {
            'Status of delete operation was 204': (r) => r.status === 204,
        });
        //sleep(0.1)
    })
}