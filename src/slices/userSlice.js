import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    userType: "User",
    userAuth: null,
    userData: null
}
const userSlice = createSlice({
    name: "User Reducer",
    initialState,
    reducers: {
        setUserType: (state, action) => {
            state.userType = action.payload.type
        },
        setUserAuth: (state, action) => {
            state.userAuth = action.payload.userAuth
        },
        setUserData: (state, action) => {
            state.userData = action.payload.userData
        }
    }
})
export const { setUserType, setUserAuth, setUserData } = userSlice.actions
export default userSlice.reducer