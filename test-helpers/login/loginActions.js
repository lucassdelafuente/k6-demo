import http from 'k6/http';
import { BASE_URL } from '../../variables.js';
import { userData } from '../../utils/userData.js'

export function getToken() {

    const endpoint = '/my_messages.php'

    let tokenResponse = http.get(BASE_URL + endpoint);

    globalThis.vars['csrftoken'] = tokenResponse
        .html()
        .find("input[name=csrftoken]")
        .first()
        .attr("value");

    return tokenResponse;

}

export function postLogin() {
    getToken()

    const endpoint = '/my_messages.php';
    const loginResponse = http.post(BASE_URL + endpoint, { login: userData });

    return loginResponse;
}