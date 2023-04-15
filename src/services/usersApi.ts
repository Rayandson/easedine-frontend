import { signUpBody } from "../types";
import api from "./api";

function signUpUser(body: signUpBody) {
  const promisse = api.post("/users", body);
  return promisse;
}

function getUserHistory(token: string) {
  const promise = api.get("users/history", { headers: { Authorization: `Bearer ${token}` } });
  return promise;
}

const usersApi = {
  signUpUser,
  getUserHistory,
};

export default usersApi;
