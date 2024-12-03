import http from 'k6/http';
import {check, group} from 'k6';
import {url, params, randomizer, loginData, updatingData} from './testData.js';
import scenarioOptions from './options/scenarios.js';

export const options = scenarioOptions

export default function () {
    const randomId = randomizer(loginData);
    console.log(randomId); // TODO: удалить

    group('groupName', function () {  // TODO: переименовать!
        const payload = JSON.stringify({
            email: loginData[randomId].email,
            password: loginData[randomId].password
        });


        const postLogin = http.post(`${url}/login`, payload, params);
        console.log(payload); // TODO: удалить
        check(postLogin, {
            'Login status was 200': (r) => r.status === 200, // 1. Проверка статусов ответа
            'Response of login included token': (r) => r.body.includes('token'), // 2. Проверка содержимого ответа
            'Auth response time is less then 400ms': (r) => r.timings.duration < 300, // 3. Проверка времени отклика
            'Headers check': (r) => r.headers['Content-Type'] === 'application/json; charset=utf-8', // 4. Проверка заголовка ответа
        });


        const payload2 = {name: updatingData[randomId].name, job: updatingData[randomId].job};
        const postCreateUser = http.post(`${url}/users`, JSON.stringify(payload2), params);
        const newId = JSON.parse(postCreateUser.body).id;

        console.log(postCreateUser.body); // TODO: удалить
        check(postCreateUser, {
            'Status of creation operation was 201': (r) => r.status === 201
        });


        const payload3 = {name: `${updatingData[randomId].name}oslav.`, job: `Chief-${updatingData[randomId].job}`};
        const putUpdateUser = http.put(`${url}/users/${newId}`, JSON.stringify(payload3), params);
        console.log(putUpdateUser.body); // TODO: удалить
        check(putUpdateUser, {
            'Status of update operation was 200': (r) => r.status === 200,
        });


        const deleteUser = http.del(`${url}/users/${newId}`);
        check(deleteUser, {
            'Status of delete operation was 204': (r) => r.status === 204,
        });
    })
}