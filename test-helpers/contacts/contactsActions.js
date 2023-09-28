import http from 'k6/http';
import { BASE_URL } from '../../variables.js';


export function getContacts() {
    const endpoint = `/contacts.php`;
    const getContactsResponse = http.get(BASE_URL + endpoint);

    return getContactsResponse;
}

