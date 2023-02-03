export const selectLoginData = state => state.auth;
export const selectIsAuth = state => state.auth.isAuth;
export const selectStatus = state => state.auth.expert?.available;