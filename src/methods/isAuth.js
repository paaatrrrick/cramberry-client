import CONSTANTS from '../constants';
import AUTH_CONSTANTS from '../constants/auth';

const isLoggedIn = async () => {
    const res = await fetch(`${CONSTANTS.API_ENDPOINT}${CONSTANTS.IS_LOGGED_IN}`, {
        headers: { "x-access'wordsmith-auth-token": window.localStorage.getItem(AUTH_CONSTANTS.token) }
    });
    if (res.ok) {
        return true;
    }
    return false;
}

export default isLoggedIn;