// Funções que serão executadas no servidor

import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { req } from './axios';

export const pingAdmin = async () => {
    try {
        const token = getCookie('token', { cookies });

        await req.get('/admin/ping', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        return true;
        
    } catch (err) {
        return false;
    }
}