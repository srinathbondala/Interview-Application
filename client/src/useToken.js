import { useState } from 'react';
import Cookies from 'js-cookie';

const useToken = () => {
    const [token, setToken] = useState(Cookies.get('token') || null);

    const saveToken = (newToken) => {
        Cookies.set('token', newToken, {
            expires: 3,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/'
        });
        setToken(newToken);
    };

    const removeToken = () => {
        Cookies.remove('token');
        setToken(null);
    };

    return {
        token,
        saveToken,
        removeToken,
    };
};

export default useToken;