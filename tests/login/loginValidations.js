import { check } from 'k6';
import { Trend } from "k6/metrics";
import { getToken, postLogin } from '../../test-helpers/login/loginActions.js';

//  Variables
export const responseTimeLogin = new Trend('response_time_login');
export const generalResponses = new Trend('responses_time_general');


// Functions

export function validateToken() {
    const getTokenResponse = getToken()

    responseTimeLogin.add(getTokenResponse.timings.duration);
    generalResponses.add(getTokenResponse.timings.duration);

    check(getTokenResponse, {
        'GET token should respond 200': (r) => r.status === 200
    });
    check(getTokenResponse, {
        "Users must not be authenticated. Is an unauthorized header present?": (r) => r.body.indexOf("Unauthorized") !== -1
    });
}

export function validateLogin() {
    const postLoginResponse = postLogin()

    responseTimeLogin.add(postLoginResponse.timings.duration);
    generalResponses.add(postLoginResponse.timings.duration);

    check(postLoginResponse, {
        'POST login should respond 200': (r) => r.status === 200
    });
}