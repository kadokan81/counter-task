import { useState } from 'react';
import './App.css';
import { ButtonComponent } from './components/ButtonComponent';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
	const [limitCounter, setLimitCounter] = useLocalStorage('limitCounter', 5);
	const [startValue, setStartValue] = useLocalStorage('startValue', 0);

	const [counter, setCounter] = useState(startValue);
	const [isLimit, setIsLimit] = useState(false);
	const [disableResetButton, setDisableResetButton] = useState(true);
	const [displayCounter, setDisplayCounter] = useState(false);

	const isStartValueIsWrong = startValue < 0;
	const isLimitCounterValueIsWrong = limitCounter < 0;
	const isInitDataIsWrong =
		limitCounter < 0 || startValue < 0 || startValue >= limitCounter;

	const incrementClickHandler = () => {
		if (disableResetButton) {
			setDisableResetButton(false);
		}
		if (counter >= limitCounter - 1) {
			setCounter((counter) => counter + 1);
			setIsLimit(true);
		} else {
			setCounter((counter) => counter + 1);
		}
	};

	const resetButtonHandler = () => {
		setCounter(startValue);
		setIsLimit(false);
		setDisableResetButton(true);
	};

	const setInitialCounterData = () => {
		setStartValue((prev) => prev);
		setLimitCounter((prev) => prev);
		setCounter(startValue);
		setDisplayCounter(true);
	};

	return (
		<div className='App'>
			<div className='frame'>
				<div className='input-group'>
					<div className='input-group__item'>
						<label htmlFor='max-number'>max value :</label>
						<input
							style={
								isLimitCounterValueIsWrong || startValue >= limitCounter
									? { background: 'red' }
									: {}
							}
							value={limitCounter}
							onChange={(e) => setLimitCounter(e.target.valueAsNumber)}
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
								isStartValueIsWrong || startValue >= limitCounter
									? { background: 'red' }
									: {}
							}
							id='start-value'
							value={startValue}
							onChange={(e) => setStartValue(e.target.valueAsNumber)}
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
						disabled={isInitDataIsWrong}
						onClick={setInitialCounterData}>
						set
					</ButtonComponent>
				</div>
			</div>
			<div className='frame'>
				<div className={!isLimit ? 'counter-screen' : 'counter-screen__red'}>
					{!displayCounter ? (
						isLimitCounterValueIsWrong ||
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
						disabled={isLimit || isStartValueIsWrong || !displayCounter}
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
