export default defineNuxtRouteMiddleware((to, from) => {
  let token: null | string = null;
  if (process.client) {
    token = localStorage.getItem('access_token');
  }

  if (token) {
    return;
  }

  return navigateTo('/login');
});
