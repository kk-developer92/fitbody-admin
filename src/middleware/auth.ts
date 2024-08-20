import {parseJwt} from "~/utils/useService";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const cookies = useCookie('fbt');
    
    if (!cookies.value) {
        return navigateTo('/login');
    }
    
    const token = parseJwt(cookies.value);
    
    if (!token?.id) {
        return navigateTo('/login');
    }
});