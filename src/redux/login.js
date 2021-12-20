import { createSlice } from "@reduxjs/toolkit"

const { actions, reducer } = createSlice({
  name: "login",
  initialState: {
    status: "void",
    token: null,
    error: null,
  },
  reducers: {
    fetching: {
      reducer: (draft) => {
        if (draft.status === "void") {
          draft.status = "pending"
        }
      },
    },
    resolved: {
      prepare: (token) => ({
        payload: { token },
      }),
      reducer: (draft, action) => {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.token = action.payload.token
          draft.status = "resolved"
        }
      },
    },
    rejected: {
      prepare: (error) => ({
        payload: { error: error.message },
      }),
      reducer: (draft, action) => {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.error = action.payload.error
          draft.token = null
          draft.status = "rejected"
        }
      },
    },
    logout: {
      reducer: (draft) => {
        draft.error = null
        draft.token = null
        draft.status = "void"
      },
    },
  },
})

export const { fetching, resolved, rejected, logout } = actions
export default reducer
