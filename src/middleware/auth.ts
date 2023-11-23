export default defineNuxtRouteMiddleware((to, from) => {
    const cookies = useCookie('token');

    if (cookies.value) {
        return;
    }

    return navigateTo('/login');
})