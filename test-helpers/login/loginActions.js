import http from 'k6/http';
import { BASE_URL } from '../../variables.js';
import { userData } from '../../utils/userData.js'

export function getToken() {

    const vars = {};
    const endpoint = '/my_messages.php'

    let tokenResponse = http.get("http://test.k6.io/my_messages.php");

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