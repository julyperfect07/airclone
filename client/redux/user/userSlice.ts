import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: {
    profilePicture: string;
    email: string;
    username: string;
    password?: string; // Optional field
  } | null;
}

interface ProfileUpdatePayload {
  profilePicture?: string;
  email?: string;
  username?: string;
  password?: string;
}

const initialState: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (
      state,
      action: PayloadAction<UserState["currentUser"]>
    ) => {
      state.currentUser = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
    },
    updateProfileSuccess: (
      state,
      action: PayloadAction<ProfileUpdatePayload>
    ) => {
      if (state.currentUser) {
        state.currentUser = {
          ...state.currentUser,
          ...(action.payload.profilePicture && {
            profilePicture: action.payload.profilePicture,
          }),
          ...(action.payload.email && {
            email: action.payload.email,
          }),
          ...(action.payload.username && {
            username: action.payload.username,
          }),
          ...(action.payload.password && {
            password: action.payload.password,
          }),
        };
      }
    },
  },
});

export const { signInSuccess, signOutSuccess, updateProfileSuccess } =
  userSlice.actions;

export default userSlice.reducer;
