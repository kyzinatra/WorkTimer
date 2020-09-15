import * as React from "react";
import { Props, MouseEvent } from "react";
import "./Button.sass";

interface IButton<T> extends Props<T> {
	mode?: "dark" | "light" | "warning" | "danger" | "";
	className?: string;
	onClickHandler?: (event: MouseEvent) => void;
}

export function Button<T>({ onClickHandler, className = "", mode = "", children }: IButton<T>) {
	return (
		<button onClick={onClickHandler} className={`btn btn__${mode} ${className}`}>
			{children}
		</button>
	);
}
