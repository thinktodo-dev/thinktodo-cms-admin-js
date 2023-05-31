 import {API_URL, LOGIN_TOKEN} from "src/utils/setting"
import axios from "axios";
import { saveCookie, loadCookie } from "src/utils/cookies";
const users = {
    state: {
      listAdmin: []
    }, // initial state
    reducers: {
      setState(state, payload) {
        state = { ...state, ...payload };
        return { ...state };
      },
    },
    effects: (dispatch) => ({
      // handle state changes with impure functions.
      // use async/await for async actions
      async getListAdmin(payload, rootState) {
        try {
          let result = await axios.get(`${API_URL}super-admin/list`, {
            headers: {
              Authorization: `Bearer ${loadCookie(LOGIN_TOKEN)}`
            }
          }); 
          dispatch.users.setState({listAdmin: result?.data?.items})
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
  export  default users;