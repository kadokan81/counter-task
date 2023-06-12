import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type initTimerType = {
	maxValue: number;
	startValue: number;
	counter: number;
	isError: boolean;
	isErrorText: string;
};

const initialState: initTimerType = {
	maxValue: 1,
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
			state,
			action: PayloadAction<{ maxValue: number; startValue: number }>
		) => {
			if (action.payload.maxValue <= 0) {
				state.isError = true;
				state.isErrorText = 'Max value cant be lower than 1';
				return;
			}
			if (action.payload.startValue < 0) {
				state.isError = true;
				state.isErrorText = 'Start value cant be lower than 0';
				return;
			}
			if (action.payload.maxValue <= action.payload.startValue) {
				state.isError = true;
				state.isErrorText = 'Max value cant be lower or even start value';
				return;
			}
			state.maxValue = action.payload.maxValue;
			state.startValue = action.payload.startValue;
			state.counter = action.payload.startValue;
			state.isError = false;
			state.isErrorText = '';
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
// export const  {actions: timerSliceActions} = timerSlice
// export const  {reducer: timerSliceReducer } = timerSlice
