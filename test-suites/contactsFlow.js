import { htmlReport } from "../libs/k6-html-report/bundle.js";
import { textSummary } from "../libs/k6-console-report/index.js";
import { validateContacts } from '../tests/contacts/contactValidations.js';


export const options = {
    vus: 2,
    iterations: 2,
};

export default function () {
    validateContacts();
}

export function handleSummary(data) {
    return {
        "ContactsResults.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}