import * as React from "react";
import { Props, MouseEvent, useState, ChangeEvent, FocusEvent, useRef } from "react";
import "./TextField.sass";

const imageSrc = (
	<svg
		className="icon-img"
		aria-hidden="true"
		focusable="false"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 576 512"
	>
		<path
			fill="currentColor"
			d="M417.8 315.5l20-20c3.8-3.8 10.2-1.1 10.2 4.2V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h292.3c5.3 0 8 6.5 4.2 10.2l-20 20c-1.1 1.1-2.7 1.8-4.2 1.8H48c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V319.7c0-1.6.6-3.1 1.8-4.2zm145.9-191.2L251.2 436.8l-99.9 11.1c-13.4 1.5-24.7-9.8-23.2-23.2l11.1-99.9L451.7 12.3c16.4-16.4 43-16.4 59.4 0l52.6 52.6c16.4 16.4 16.4 43 0 59.4zm-93.6 48.4L403.4 106 169.8 339.5l-8.3 75.1 75.1-8.3 233.5-233.6zm71-85.2l-52.6-52.6c-3.8-3.8-10.2-4-14.1 0L426 83.3l66.7 66.7 48.4-48.4c3.9-3.8 3.9-10.2 0-14.1z"
		></path>
	</svg>
);

interface ITextField<T> extends Props<T> {
	onChange: (id: string, newName: string) => void;
	id: string;
}

export function TextField<T>({ children, onChange, id }: ITextField<T>) {
	const [el, setEl] = useState<"h2" | "input">("h2");
	const [val, setVal] = useState<string>(`${children}`);

	function EditClickHandler(event: MouseEvent) {
		setEl(a => (a == "h2" ? "input" : "h2"));
	}

	function InputClickHandler(event: ChangeEvent) {
		const val = (event.target as HTMLInputElement).value;
		setVal(val);
	}

	function InputBlurHandler(event: FocusEvent) {
		setEl(a => (a == "h2" ? "input" : "h2"));
		onChange(id, val);
	}
	return el === "h2" ? (
		<h2 className="text-field" onClick={EditClickHandler}>
			{val}
			<span className="text-field__edit">{imageSrc}</span>
		</h2>
	) : (
		<input
			type="text"
			className="text-field__input"
			spellCheck="false"
			value={val}
			onBlur={InputBlurHandler}
			onChange={InputClickHandler}
		/>
	);
}
