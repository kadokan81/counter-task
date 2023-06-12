import { useEffect, useState } from 'react';
import './App.css';
import { ButtonComponent } from './components/ButtonComponent';
import { useLocalStorage } from './hooks/useLocalStorage';

import { useAppDispatch, useAppSelector } from './store';
import {
	incrementCounterSlice,
	resetValueSlice,
	setMaxAndStartSlice,
} from './features/timer/timerSlice';

function App() {
	const initSt = useAppSelector((state) => state.timerState);

	const dispatch = useAppDispatch();

	const [maxValue, setMaxValue] = useLocalStorage('maxValue', 5);
	const [startValue, setStartValue] = useLocalStorage('startValue', 0);

	useEffect(() => {
		dispatch(setMaxAndStartSlice({ maxValue, startValue }));
	}, [dispatch, maxValue, startValue]);

	const [disableResetButton, setDisableResetButton] = useState(true);
	const [displayCounter, setDisplayCounter] = useState(true);

	const isCounterReachLimit = initSt.counter === initSt.maxValue;

	const incrementClickHandler = () => {
		dispatch(incrementCounterSlice());
		setDisableResetButton(false);
		if (disableResetButton) {
			setDisableResetButton(false);
		}
	};

	const resetButtonHandler = () => {
		dispatch(resetValueSlice());
		setDisableResetButton(true);
	};

	const setInitialCounterData = () => {
		dispatch(setMaxAndStartSlice({ maxValue, startValue }));
		setDisplayCounter(false);
	};

	const getCounterView = (): JSX.Element => {
		// displayCounter ? (
		// 	<p style={{ fontSize: '18px' }}>enter value and press "set"</p>
		// ) : initSt.isError ? (
		// 	<p style={{ fontSize: '15px', color: 'red' }}>
		// 		{initSt.isErrorText}
		// 	</p>
		// ) : (
		// 	initSt.counter
		return <div />;
	};

	return (
		<div className='App'>
			<div className='frame'>
				<div className='input-group'>
					<div className='input-group__item'>
						<label htmlFor='max-number'>max value :</label>
						<input
							style={initSt.isError ? { background: 'red' } : {}}
							value={maxValue.toString()}
							onChange={(e) => {
								const v = e.target.value.replace(/^0+/, '');
								setMaxValue(Math.round(+v));
							}}
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
							value={startValue.toString()}
							onChange={(e) => setStartValue(Math.round(+e.target.value))}
							onClick={() => {
								setDisplayCounter(true);
								setDisableResetButton(true);
							}}
							type='number'
						/>
					</div>
				</div>
				<div className='button-group'>
					<ButtonComponent onClick={setInitialCounterData}>set</ButtonComponent>
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
					) : initSt.isError ? (
						<p style={{ fontSize: '15px', color: 'red' }}>
							{initSt.isErrorText}
						</p>
					) : (
						initSt.counter
					)}

					{getCounterView()}
				</div>
				<div className='button-group'>
					<ButtonComponent
						disabled={isCounterReachLimit || initSt.isError || displayCounter}
						onClick={incrementClickHandler}>
						inc
					</ButtonComponent>
					<ButtonComponent
						disabled={disableResetButton}
						onClick={resetButtonHandler}>
						reset
					</ButtonComponent>
				</div>
			</div>
		</div>
	);
}

export default App;
