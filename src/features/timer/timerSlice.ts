import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type initTimerType = {
	maxValue: number;
	startValue: number;
	counter: number;
	isError: boolean;
	isErrorText: string;
};

const initialState = {
	maxValue: 5,
	startValue: 0,
	counter: 0,
	isError: false,
	isErrorText: '',
};

export const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		setMaxAndStartSlice: (
			st,
			action: PayloadAction<{ maxValue: number; startValue: number }>
		) => {
			if (action.payload.maxValue <= 0) {
				st.isError = true;
				st.isErrorText = 'Max value cant be lower than 1';
				return;
			}
			if (action.payload.startValue < 0) {
				st.isError = true;
				st.isErrorText = 'Start value cant be lower than 0';
				return;
			}
			if (action.payload.maxValue <= action.payload.startValue) {
				st.isError = true;
				st.isErrorText = 'Max value cant be lower or even start value';
				return;
			}
			st.maxValue = action.payload.maxValue;
			st.startValue = action.payload.startValue;
			st.counter = action.payload.startValue;
			st.isError = false;
			st.isErrorText = '';
		},
		incrementCounterSlice: (st) => {
			st.counter = ++st.counter;
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

export const { incrementCounterSlice, resetValueSlice, setMaxAndStartSlice } =
	timerSlice.actions;
export default timerSlice.reducer;
