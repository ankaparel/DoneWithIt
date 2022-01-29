import client from "./client";

const login = (email, password) => client.post("/auth", { email, password });

// const login = (email, password) => {
//   return {ok: true, data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SLdQL8jpRiYL-Qvdb6UmHOOKAS3BaPxyuaaPdcW1H6o'}
// }

export default {
  login,
};
