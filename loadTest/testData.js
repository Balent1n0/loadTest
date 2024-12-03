import {SharedArray} from 'k6/data';

export const url = 'https://reqres.in/api';

export function randomizer(array) {
    return [Math.floor(Math.random() * array.length)];
}

export const updatingData = new SharedArray('User Data', () => {
    return JSON.parse(open('./fixtures/updatingData.json')).updatingData;
});
export const loginData = new SharedArray('User Login', () => {
    return JSON.parse(open('./fixtures/loginData.json')).loginData;
});

export const params = {headers: {'Content-Type': 'application/json',},};