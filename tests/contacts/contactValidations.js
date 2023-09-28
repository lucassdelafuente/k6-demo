import { check } from 'k6';
import { Trend } from "k6/metrics";
import { getContacts } from '../../test-helpers/contacts/contactsActions.js';

//  Variables
export const responseTimeContacts = new Trend('response_time_contacts');
export const generalResponses = new Trend('responses_time_general');


// Functions

export function validateContacts() {
    const getContactResponse = getContacts()

    responseTimeContacts.add(getContactResponse.timings.duration);
    generalResponses.add(getContactResponse.timings.duration);

    check(getContactResponse, {
        'GET contacts should respond 200': (r) => r.status === 200
    });
}