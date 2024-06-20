import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
  _id: string;
  _v: 0;
  username: string;
  email: string;
  membership: boolean;
  profile: string;
};
type initState = {
  user: User | null;
};

const initialState: initState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const selectUser = (state: { user: initState }) => state.user.user;

export const { addUser, clearUser } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
