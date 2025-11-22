export const ROUTES = {
  LAYOUT: '/',
  MAIN: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  CARD_DETAIL: (id = ':matchId') => `/card/${id}`,
  WORRY: '/worry',
};
