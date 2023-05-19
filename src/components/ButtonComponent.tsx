import { ComponentPropsWithoutRef } from 'react';
import '../App.css';

type ButtonProps = ComponentPropsWithoutRef<'button'>;

export const ButtonComponent = ({
	children,
	className,
	...restProps
}: ButtonProps) => {
	return (
		<button className={className} {...restProps}>
			{children}
		</button>
	);
};
