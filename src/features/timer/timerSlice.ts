import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { log } from 'console';

export type initTimerType = {
	maxValue: number;
	startValue: number;
	counter: number;
	disableResetButton: boolean;
	displayCounter: boolean;
	isError: boolean;
};

const initialState = {
	maxValue: 5,
	startValue: 0,
	counter: 0,
	disableResetButton: true,
	displayCounter: false,
	isError: false,
};

export const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		incrementCounterSlice: (st) => {
			st.counter = ++st.counter;
		},
		setMaxValueSlice: (st, action: PayloadAction<number>) => {
			if (action.payload <= 1) {
				st.isError = true;
				return;
			}
			console.log(action.payload);
			if (st.maxValue <= st.startValue) {
				st.isError = true;
				st.maxValue = action.payload;
			}
			st.maxValue = action.payload;
			st.isError = false;
		},
		setStartValueSlice: (st, action: PayloadAction<number>) => {
			if (action.payload < 0 || action.payload >= st.maxValue) {
				st.isError = true;
				return;
			}
			st.startValue = action.payload;
			st.counter = action.payload;
			st.isError = false;
		},
		resetValueSlice: (st) => {
			return {
				...st,
				counter: st.startValue,
				disableResetButton: true,
				displayCounter: false,
				isError: false,
			};
		},
	},
});

export const {
	setMaxValueSlice,
	setStartValueSlice,
	incrementCounterSlice,
	resetValueSlice,
} = timerSlice.actions;
export default timerSlice.reducer;
