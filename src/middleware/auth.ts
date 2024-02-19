import {parseJwt} from "~/utils/useService";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const cookies = useCookie('token');
    
    if (!cookies.value) {
        return navigateTo('/login');
    }
    
    const token = parseJwt(cookies.value);
    
    if (!token?.sub) {
        return navigateTo('/login');
    }
    
    let res: any = {};
    
    try {
        res = await useService('users').get(token.sub)
    } catch (e) {
        return navigateTo('/login');
    }
    
    if (!res.data.phone) {
        return navigateTo('/login');
    }
})