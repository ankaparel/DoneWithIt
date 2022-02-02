import client from "./client";

const login = (email, password) => client.post("/auth/login", { email, password });

export default {
  login,
};
