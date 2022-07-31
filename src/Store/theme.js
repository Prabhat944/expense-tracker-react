import {createSlice} from '@reduxjs/toolkit';

const themeSlice=createSlice({
    name:'theme',
    initialState:{darktheme:false},
    reducers:{
        changetheme(state){
            state.darktheme=!state.darktheme;
        }
    }
});

export const themeActions=themeSlice.actions;

export default themeSlice.reducer;