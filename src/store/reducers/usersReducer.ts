import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth, UserState } from '../../types/userTypes';

export const initState: UserState = {
  user: {
    message: '',
    token: '',
    refreshToken: '',
    userId: '',
    name: '',
  },
  loggedIn: false,
  isLoading: false,
};

const initUserState = () => {
  const storageData = localStorage.getItem('userData');
  if (storageData) {
    const data = JSON.parse(storageData);
    return {
      user: data,
      loggedIn: !!data?.token,
      isLoading: false,
    };
  }
  return initState;
};

const initialState: UserState = initUserState();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSignin(state, action: PayloadAction<IAuth>) {
      state.user = action.payload;
      state.loggedIn = !!action.payload.token;
    },
    userLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload ?? false;
    },
    userUpdate(state, action: PayloadAction<UserState>) {
      state.user = action.payload.user;
      state.loggedIn = action.payload.loggedIn;
      state.isLoading = action.payload.isLoading;
    },
    userLogout(state) {
      state.user = initState.user;
      state.loggedIn = initState.loggedIn;
      state.isLoading = initState.isLoading;
    },
  },
});

const { actions, reducer } = userSlice;
export default reducer;
export const { userSignin, userLoading, userUpdate, userLogout } = actions;
