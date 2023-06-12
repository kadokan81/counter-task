import { configureStore } from '@reduxjs/toolkit';
import timerSlice from './features/timer/timerSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// let testState

// const preloadedState = localStorage.getItem('counterState')
// if (preloadedState) {
// 	testState = JSON.parse(preloadedState)

// }

export const store = configureStore({
	reducer: {
		timerState: timerSlice,
	},
	//preloadedState: testState,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// store.subscribe(() => {
// 	localStorage.setItem('counterState', JSON.stringify(store.getState().timerState))
// })
