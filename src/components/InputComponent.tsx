import { ComponentPropsWithoutRef, FC, useState } from 'react';

interface InputComponent extends ComponentPropsWithoutRef<'input'> {
	inputType: string;
	name: string;
	label: string;
}

export const InputComponent: FC<InputComponent> = ({
	inputType,
	name,
	label,
	className,
	...restProps
}) => {
	return (
		<div className={className}>
			<label htmlFor={name}>{label}</label>
			<input {...restProps} />
		</div>
	);
};
