import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
//import counterReducer from '../features/counter/counterSlice'

export function makeStore() {
  return configureStore({
    reducer: { user: userReducer },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type RootDispatch = typeof store.dispatch;

export type RootThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
