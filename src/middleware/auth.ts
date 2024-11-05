import { parseJwt } from "~/utils/useService";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const cookies = useCookie('fbt');

    if (!cookies.value) {
        return navigateTo('/login');
    }

    const token = parseJwt(cookies.value);

    const currentTime = Date.now() / 1000;
    const isValid = token.exp > currentTime;

    if (!isValid) {
        return navigateTo('/login');
    }

    if (!token?.id) {
        return navigateTo('/login');
    }
});