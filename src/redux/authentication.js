import { createSlice } from "@reduxjs/toolkit"

const { actions, reducer } = createSlice({
  name: "authentication",
  initialState: {
    status: "void",
    isConnected: false,
    id: null,
    firstName: null,
    lastName: null,
    email: null,
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
      prepare: (data) => ({
        payload: {
          id: data.body.id,
          firstName: data.body.firstName,
          lastName: data.body.lastName,
          email: data.body.email,
        },
      }),
      reducer: (draft, action) => {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.id = action.payload.id
          draft.firstName = action.payload.firstName
          draft.lastName = action.payload.lastName
          draft.email = action.payload.email
          draft.error = null
          draft.status = "resolved"
          draft.isConnected = true
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
          draft.id = null
          draft.firstName = null
          draft.lastName = null
          draft.email = null
          draft.status = "rejected"
          draft.isConnected = false
        }
      },
    },
    logout: {
      reducer: (draft) => {
        draft.isConnected = false
        draft.id = null
        draft.firstName = null
        draft.lastName = null
        draft.email = null
        draft.status = "void"
        draft.error = null
      },
    },
    update: {
      prepare: (data) => ({
        payload: {
          firstName: data.body.firstName,
          lastName: data.body.lastName,
        },
      }),
      reducer: (draft, action) => {
        draft.firstName = action.payload.firstName
        draft.lastName = action.payload.lastName
      },
    },
  },
})

export const { fetching, resolved, rejected, logout, update } = actions
export default reducer
