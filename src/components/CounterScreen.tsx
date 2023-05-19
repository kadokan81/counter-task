import React from 'react';
import { ButtonComponent } from './ButtonComponent';

type CounterScreenType = {
	isLimit: boolean;
	displayCounter: boolean;
	isLimitCounterValueIsWrong: boolean;
	isStartValueIsWrong: boolean;
	counter: number;
	isInitDataIsWrong: boolean;
	incrementClickHandler: () => void;
	disableResetButton: boolean;
	resetButtonHandler: () => void;
};

export const CounterScreen = ({
	isLimit,
	displayCounter,
	isStartValueIsWrong,
	isLimitCounterValueIsWrong,
	counter,
	isInitDataIsWrong,
	incrementClickHandler,
	disableResetButton,
	resetButtonHandler,
}: CounterScreenType): JSX.Element => {
	return (
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
	);
};
