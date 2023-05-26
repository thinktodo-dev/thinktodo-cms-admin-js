 import {API_URL} from "src/utils/setting"
import axios from "axios";
const auth = {
    state: 2, // initial state
    reducers: {
      setState(state, payload) {
        state = { ...state, ...payload };
        return { ...state };
      },
    },
    effects: (dispatch) => ({
      // handle state changes with impure functions.
      // use async/await for async actions
      async login(payload, rootState) {
        try {
          let result = await axios.post(`${API_URL}auth/login`, {
            username: payload.username,
            password: payload.password,
          }); 
          return {
            code: 1,
            error: null,
            data: result?.data,
          }
        } catch(error) {
          return {
            code: 0,
            data: null,
            error: error.message
          }
        }
         
      },
    }),
  };
  export  default auth;