import * as React from "react";
import { Props } from "react";
import "./Time.sass";

interface ITime<T> extends Props<T> {
	className?: string;
}

export function Time<T>({ children, className }: ITime<T>) {
	return (
		<div className={className}>
			<time dateTime={`${children}`} className="time">
				{children}
			</time>
		</div>
	);
}
