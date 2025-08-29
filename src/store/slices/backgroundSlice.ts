import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 

interface BackgroundState {
  isBackground: boolean;
}

const initialState: BackgroundState = {
  isBackground: false,
};

export const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    toggleBackground: (state) => {
      state.isBackground = !state.isBackground;
    },
    setBackgroundState: (state, action: PayloadAction<boolean>) => {
      state.isBackground = action.payload;
    },
  },
});

export const { toggleBackground, setBackgroundState } = backgroundSlice.actions;
export default backgroundSlice.reducer;