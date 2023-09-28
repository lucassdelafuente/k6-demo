import { htmlReport } from "../libs/k6-html-report/bundle.js";
import { textSummary } from "../libs/k6-console-report/index.js";
import { validateToken, validateLogin } from '../tests/login/loginValidations.js';


export const options = {
    vus: 2,
    iterations: 2,
};

export default function () {
    validateToken();
    validateLogin();
}

export function handleSummary(data) {
    return {
        "LoginResults.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}