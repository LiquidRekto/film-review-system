// API ENDPOINTS
export const API_ENV = {
  MAIN: "/api",
};

// ACCOUNT RELATED
export const API_ACCOUNT_LOG_IN = "/auth/login"; // post
export const API_ACCOUNT_LOG_OUT = "/auth/logout"; // post
export const API_ACCOUNT_REGISTER = "/auth/register"; // post
//

// FILM RELATED
export const API_FILM_GET = "/films"; // get
export const API_FILM_CREATE = "/films"; // post
export const API_FILM_GET_ONE = "/films"; // get
export const API_FILM_DELETE = "/films"; // delete
//

// RATING RELATED
export const API_RATING_GET = "/ratings"; // get
export const API_RATING_CREATE = "/ratings"; // create
export const API_RATING_GET_BY_FILM = "/ratings/byFilm"; // get
export const API_RATING_DELETE = "/ratings"; // delete
//
