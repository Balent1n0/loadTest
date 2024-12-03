export default {
    scenarios: {
        scenario1Name: { // 1.Поддерж. пост-е кол-во VU в теч-е зад-го времени
            executor: 'constant-vus',
            vus: 1,
            duration: '5s',
        },
        // scenario2Name: { // 2.Позв. увеличивать и(или) уменьшать количество VU
        //     executor: 'ramping-vus',
        //     startVus: 0,
        //     stages: [
        //         {duration: '5s', target: 0},
        //         {duration: '5s', target: 4},
        //         {duration: '5s', target: 2},
        //         {duration: '5s', target: 0}
        //     ]
        // },
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
    }
}