import { configureStore } from '@reduxjs/toolkit';
import timerSlice from './features/timer/timerSlice';

export const store = configureStore({
	reducer: {
		timerState: timerSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
