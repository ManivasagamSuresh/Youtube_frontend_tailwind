import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser :null,
    loading : false,
    error : false
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
     loginStart : (state)=>{
        state.loading = true
     },
     loginSuccess : (state,action)=>{
        state.loading = false;
        state.currentUser = action.payload
        // console.log(state.currentUser);
     },
     loginFailure : (state)=>{
        state.loading = false;
        state.error = true;
     },
     logout : (state)=>{
        state.currentUser = null;
        state.loading = false ;
        state.error = false 
     },
     subscription:(state,action)=>{
         if(state.currentUser.others.subscribedUsers.includes(action.payload)){
            state.currentUser.others.subscribedUsers.splice(
               state.currentUser.others.subscribedUsers.findIndex(channelId=>
                  channelId==action.payload),1)
         }else{
            state.currentUser.others.subscribedUsers.push(action.payload)
         }
     },
     
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { loginStart,loginFailure,loginSuccess,logout,subscription } = userSlice.actions;
  
  export default userSlice.reducer;