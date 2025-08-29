import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 

interface AuthFormState {
  isAuthForm: boolean;
}

const initialState: AuthFormState = {
  isAuthForm: false,
};

export const authFormSlice = createSlice({
  name: 'auth-form',
  initialState,
  reducers: {
    toggleAuthForm: (state) => {
      state.isAuthForm = !state.isAuthForm;
    },
    setAuthFormState: (state, action: PayloadAction<boolean>) => {
      state.isAuthForm = action.payload;
    },
  },
});

export const { toggleAuthForm, setAuthFormState } = authFormSlice.actions;
export default authFormSlice.reducer;