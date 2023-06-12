import { useState } from 'react';
import './App.css';
import { ButtonComponent } from './components/ButtonComponent';
import { useLocalStorage } from './hooks/useLocalStorage';
import { InputComponent } from './components/InputComponent';
import { useDispatch, useSelector } from 'react-redux';
import { initTimerType } from './features/timer/timerSlice';
import { AppDispatch, RootState } from './store';
import {
	setMaxValueSlice,
	setStartValueSlice,
	incrementCounterSlice,
	resetValueSlice,
} from './features/timer/timerSlice';

function App() {
	const initSt = useSelector((state: RootState) => state.timerState);

	const dispatch: AppDispatch = useDispatch();

	// const [maxValue, setMaxValue] = useLocalStorage('maxValue', 5);
	// const [startValue, setStartValue] = useLocalStorage('startValue', 0);
	// const [counter, setCounter] = useState(startValue);

	const [disableResetButton, setDisableResetButton] = useState(true);
	const [displayCounter, setDisplayCounter] = useState(false);

	const isCounterReachLimit = initSt.counter === initSt.maxValue;
	const isStartValueIsWrong = initSt.startValue < 0;
	const isMaxValueValueIsWrong = initSt.maxValue < 1;

	const isInitDataIsWrong =
		initSt.maxValue < 1 ||
		initSt.startValue < 0 ||
		initSt.startValue >= initSt.maxValue;

	const isSetButtonDisable =
		initSt.startValue < 0 ||
		isNaN(initSt.startValue) ||
		!initSt.maxValue ||
		isInitDataIsWrong;

	const incrementClickHandler = () => {
		dispatch(incrementCounterSlice());
		setDisableResetButton(false);
		// if (disableResetButton) {
		// 	setDisableResetButton(false);
		// }
		// if (counter >= maxValue - 1) {
		// 	setCounter((counter) => counter + 1);
		// } else {
		// 	setCounter((counter) => counter + 1);
		// }
	};

	const resetButtonHandler = () => {
		dispatch(resetValueSlice());
		// setDisplayCounter(true);

		// setCounter(startValue);
		setDisableResetButton(true);
	};

	const setInitialCounterData = () => {
		// if (maxValue > 1 || startValue > 0) {
		// 	setCounter(Math.round(startValue));
		// 	setDisplayCounter(true);
		// 	setDisableResetButton(true);
		// 	return;
		// }
		dispatch(resetValueSlice());
		setDisplayCounter(false);
	};

	return (
		<div className='App'>
			<div className='frame'>
				<div className='input-group'>
					<div className='input-group__item'>
						<label htmlFor='max-number'>max value :</label>
						<input
							style={initSt.isError ? { background: 'red' } : {}}
							value={initSt.maxValue}
							onChange={(e) =>
								dispatch(setMaxValueSlice(e.target.valueAsNumber))
							}
							// onChange={(e) => setMaxValue(Math.round(e.target.valueAsNumber))}
							onClick={() => {
								setDisplayCounter(true);
								setDisableResetButton(true);
							}}
							id='max-number'
							type='number'
						/>
					</div>
					<div className='input-group__item'>
						<label htmlFor='start-value'>start value</label>
						<input
							style={initSt.isError ? { background: 'red' } : {}}
							id='start-value'
							value={initSt.startValue}
							onChange={(e) =>
								dispatch(setStartValueSlice(e.target.valueAsNumber))
							}
							// onChange={(e) =>
							// 	setStartValue(Math.round(e.target.valueAsNumber))
							// }
							onClick={() => {
								setDisplayCounter(true);
								setDisableResetButton(true);
							}}
							type='number'
						/>
					</div>
				</div>
				<div className='button-group'>
					<ButtonComponent
						disabled={initSt.isError}
						onClick={setInitialCounterData}>
						set
					</ButtonComponent>
				</div>
			</div>
			<div className='frame'>
				<div
					className={
						!isCounterReachLimit ? 'counter-screen' : 'counter-screen__red'
					}>
					{/* {initSt.counter} */}
					{displayCounter ? (
						<p style={{ fontSize: '18px' }}>enter value and press "set"</p>
					) : (
						initSt.counter
					)}
				</div>
				<div className='button-group'>
					<ButtonComponent
						disabled={isCounterReachLimit}
						onClick={incrementClickHandler}>
						inc
					</ButtonComponent>
					<ButtonComponent
						disabled={disableResetButton || isInitDataIsWrong}
						onClick={resetButtonHandler}>
						reset
					</ButtonComponent>
				</div>
			</div>
		</div>
	);
}

export default App;
