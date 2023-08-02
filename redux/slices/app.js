import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile:{},
  pageTitle: '',
  token:''
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload
    },

    setPageTitle: (state, action)=>{
        state.pageTitle = action.payload
    },

    setToken:(state, action)=>{
      state.token = action.payload
    }
  },
})


export const { setProfile, setPageTitle, setToken } = appSlice.actions

export default appSlice.reducer

export const getPageTitle = (e)=>e.app.pageTitle
export const getToken = (e)=>e.app.token