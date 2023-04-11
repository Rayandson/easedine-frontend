import { signUpBody } from "../types";
import api from "./api"

  function signUpUser(body: signUpBody) {
    const promisse = api.post("/users", body);
    return promisse;
  }

const authApi = {
    signUpUser
}

export default authApi;