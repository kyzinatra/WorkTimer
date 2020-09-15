import * as React from "react";
import { Props, MouseEvent, ChangeEvent } from "react";
import { Button } from "../Button/Button";
import { Time } from "../Time/Time";
import { TextField } from "../TextField/TextField";
import "./Timer.sass";
import { TimeManager } from "../../js/TimeManager";

const imageSrc = (
	<svg
		className="icon-img"
		aria-hidden="true"
		focusable="false"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 448 512"
	>
		<path
			fill="currentColor"
			d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"
		></path>
	</svg>
);

interface ITimer<T> extends Props<T> {
	name: string;
	datesActive: Date[][];
	dateStart: Date;
	state?: "active" | null;
	id: string;
	onDeleteHandler: (event: MouseEvent, id: string) => void;
	onNameChange: (id: string, newName: string) => void;
	onTimerStateChange: (event: MouseEvent, id: string) => void;
}

export function Timer<T>({
	state,
	datesActive,
	onDeleteHandler,
	onNameChange,
	id,
	name,
	onTimerStateChange,
}: ITimer<T>) {
	const time = state
		? new TimeManager(datesActive[datesActive.length - 1][0].getTime())
		: new TimeManager(
				datesActive.reduce((l, [start, end]) => l + end.getTime() - start.getTime(), 0),
				"active"
		  );

	return (
		<div className="timer">
			<div className="timer__nav">
				<TextField id={id} onChange={onNameChange}>
					{name}
				</TextField>
				<Button mode="dark" onClickHandler={(e: MouseEvent) => onDeleteHandler(e, id)}>
					{imageSrc}
				</Button>
			</div>
			<Time className="timer__text">
				{state
					? `Отсчет начался в ${time.getTime()} и идет ${time.getPast()}`
					: `Потрачено времени всего ${time.getTime()}`}
			</Time>
			<Button mode="dark" onClickHandler={e => onTimerStateChange(e, id)}>
				{state ? "Отключить" : "Включить"} Таймер
			</Button>
		</div>
	);
}
