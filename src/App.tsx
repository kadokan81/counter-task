import { useState } from 'react';
import './App.css';
import { ButtonComponent } from './components/ButtonComponent';
import { useLocalStorage } from './hooks/useLocalStorage';
import { InputComponent } from './components/InputComponent';

function App() {
	const [maxValue, setMaxValue] = useLocalStorage('maxValue', 5);
	const [startValue, setStartValue] = useLocalStorage('startValue', 0);
	const [counter, setCounter] = useState(startValue);

	const [disableResetButton, setDisableResetButton] = useState(true);
	const [displayCounter, setDisplayCounter] = useState(false);

	const isCounterReachLimit = counter === maxValue;
	const isStartValueIsWrong = startValue < 0;
	const isMaxValueValueIsWrong = maxValue < 1;

	const isInitDataIsWrong =
		maxValue < 1 || startValue < 0 || startValue >= maxValue;

	const isSetButtonDisable =
		startValue < 0 || isNaN(startValue) || !maxValue || isInitDataIsWrong;

	const incrementClickHandler = () => {
		if (disableResetButton) {
			setDisableResetButton(false);
		}
		if (counter >= maxValue - 1) {
			setCounter((counter) => counter + 1);
		} else {
			setCounter((counter) => counter + 1);
		}
	};

	const resetButtonHandler = () => {
		setCounter(startValue);

		setDisableResetButton(true);
	};

	const setInitialCounterData = () => {
		if (maxValue > 1 || startValue > 0) {
			setCounter(Math.round(startValue));
			setDisplayCounter(true);
			return;
		}
		setDisplayCounter(false);
	};

	return (
		<div className='App'>
			<div className='frame'>
				<div className='input-group'>
					<div className='input-group__item'>
						<label htmlFor='max-number'>max value :</label>
						<input
							style={
								isMaxValueValueIsWrong || startValue >= maxValue
									? { background: 'red' }
									: {}
							}
							value={maxValue}
							onChange={(e) => setMaxValue(Math.round(e.target.valueAsNumber))}
							onClick={() => {
								setDisplayCounter(false);
								setDisableResetButton(true);
							}}
							id='max-number'
							type='number'
						/>
					</div>
					<div className='input-group__item'>
						<label htmlFor='start-value'>start value</label>
						<input
							style={
								isStartValueIsWrong || startValue >= maxValue
									? { background: 'red' }
									: {}
							}
							id='start-value'
							value={startValue}
							onChange={(e) =>
								setStartValue(Math.round(e.target.valueAsNumber))
							}
							onClick={() => {
								setDisplayCounter(false);
								setDisableResetButton(true);
							}}
							type='number'
						/>
					</div>
				</div>
				<div className='button-group'>
					<ButtonComponent
						disabled={isSetButtonDisable}
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
					{!displayCounter ? (
						isMaxValueValueIsWrong ||
						isStartValueIsWrong ||
						isInitDataIsWrong ? (
							<p style={{ fontSize: '18px', color: 'red' }}>incorrect value</p>
						) : (
							<p style={{ fontSize: '18px' }}>enter value and press "set"</p>
						)
					) : (
						counter
					)}
				</div>
				<div className='button-group'>
					<ButtonComponent
						disabled={
							isCounterReachLimit || isStartValueIsWrong || !displayCounter
						}
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
