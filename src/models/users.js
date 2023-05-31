 import {API_URL, LOGIN_TOKEN} from "src/utils/setting"
import axios from "axios";
import { useNavigate, createSearchParams } from 'react-router-dom';
import { saveCookie, loadCookie } from "src/utils/cookies";
const users = {
    state: {
      listAdmin: [],
      total: 0,
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
          let result = await axios.get(`${API_URL}super-admin/list?${createSearchParams(payload)}`, {
            headers: {
              Authorization: `Bearer ${loadCookie(LOGIN_TOKEN)}`
            }
          }); 
          dispatch.users.setState({listAdmin: result?.data?.items})
          dispatch.users.setState({total: result?.data?.meta?.totalItems})
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
      async createUser(payload, rootState) {
        try {
          let result = await axios.post(`${API_URL}super-admin`, {
            ...payload
          },{
            headers: {
              Authorization: `Bearer ${loadCookie(LOGIN_TOKEN)}`
            }
          });  
          return result.data;
        } catch(error) {
          return {
            code: 0,
            data: null,
            error: error.message
          }
        }
         
      },
      async getDetailUser(payload, rootState) {
        try {
          let result = await axios.get(`${API_URL}super-admin/${payload.id}`, {
            headers: {
              Authorization: `Bearer ${loadCookie(LOGIN_TOKEN)}`
            }
          });  
          return result.data;
        } catch(error) {
          return {
            code: 0,
            data: null,
            error: error.message
          }
        }
         
      },
      async updateUser(payload, rootState) {
        try {
          console.log("payload", payload)
          let result = await axios.put(`${API_URL}super-admin/${payload?.id}`, {
            ...payload
          },{
            headers: {
              Authorization: `Bearer ${loadCookie(LOGIN_TOKEN)}`
            }
          });  
          return result.data;
        } catch(error) {
          return {
            code: 0,
            data: null,
            error: error.message
          }
        }
         
      },
      async deleteUser(payload, rootState) {
        try {
          console.log("payload", payload)
          let result = await axios.delete(`${API_URL}super-admin/${payload.id}`   ,{
            headers: {
              Authorization: `Bearer ${loadCookie(LOGIN_TOKEN)}`
            }
          });  
          return result.data;
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