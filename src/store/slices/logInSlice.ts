import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 

interface LogInState {
  isEnterLogIn: boolean;
}

const initialState: LogInState = {
  isEnterLogIn: false,
};

export const logInSlice = createSlice({
  name: 'log-in',
  initialState,
  reducers: {
    toggleEnterLogIn: (state) => {
      state.isEnterLogIn = !state.isEnterLogIn;
    },
    setEnterLogInState: (state, action: PayloadAction<boolean>) => {
      state.isEnterLogIn = action.payload;
    },
  },
});

export const { toggleEnterLogIn, setEnterLogInState } = logInSlice.actions;
export default logInSlice.reducer;