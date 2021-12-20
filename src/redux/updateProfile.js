import { createSlice } from "@reduxjs/toolkit"

const { actions, reducer } = createSlice({
  name: "update",
  initialState: {
    status: "void",
    newFirstName: null,
    newLastName: null,
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
          firstName: data.body.firstName,
          lastName: data.body.lastName,
        },
      }),
      reducer: (draft, action) => {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.status = "resolved"
          draft.newFirstName = action.payload.firstName
          draft.newLastName = action.payload.lastName
        }
      },
    },
    rejected: {
      prepare: (error) => ({
        payload: { error: error.message },
      }),
      reducer: (draft, action) => {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.status = "rejected"
          draft.error = action.payload.error
        }
      },
    },
    reset: {
      reducer: (draft) => {
        draft.status = "void"
        draft.newFirstName = null
        draft.newLastName = null
        draft.error = null
      },
    },
  },
})

export const { fetching, resolved, rejected, reset } = actions
export default reducer
