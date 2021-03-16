import http from "./httpService";
import { apiURL } from "../config.json";
import authService from "./authService";

const apiEndpoint = `${apiURL}/users`;

export async function register(user) {
  const { headers } = await http.post(apiEndpoint, user);
  authService.loginWithJwt(headers["x-auth-token"]);
}
