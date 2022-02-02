import client from "./client";

const register = (userInfo) => client.post("/auth/register", userInfo);

export default { register };
