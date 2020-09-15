import * as React from "react";
import { FC, ChangeEvent, useState, MouseEvent, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { Timer } from "../Timer/Timer";
import { getId, idNum } from "../../js/getId";
import { IDBManager } from "../../js/IDBManager";
import "./App.sass";

export interface timer {
	name: string;
	datesActive: Date[][];
	dateStart: Date;
	state?: "active" | null;
	id: string;
}

const plusImg = (
	<svg
		aria-hidden="true"
		focusable="false"
		className="icon-img"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 448 512"
	>
		<path
			fill="currentColor"
			d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
		></path>
	</svg>
);

const IDB = new IDBManager("timers", 1);

export function App() {
	const [timers, setTimers] = useState<timer[]>([]);
	const [sec, setSecond] = useState<boolean>(false);

	// upload timers
	useEffect(() => {
		let timer = setTimeout(() => {
			setSecond(!sec);
		}, 1000);
		return () => clearTimeout(timer);
	}, [sec]);

	// update timers every second
	useEffect(() => {
		if (IDB.timersOnStart) {
			IDB.getAllKeys().then((res: number[]) => (idNum[0] = `${Math.max(...res)}`));
			setTimers(IDB.timersOnStart);
		}
	}, [IDB.timersOnStart]);

	// add new Timer
	function onClickHandler(event: MouseEvent): void {
		const newTimer: timer = {
			name: "Название",
			datesActive: [],
			dateStart: new Date(),
			id: getId(),
		};
		IDB.write(newTimer);
		setTimers(a => [...a, newTimer]);
	}

	// Delete timer
	function onDeleteHandler(event: MouseEvent, id: string) {
		IDB.delete(id);
		setTimers(el =>
			el.flatMap(a => {
				if (a.id === id) return [];
				return [a];
			})
		);
	}

	// change timer's name
	function onNameChange(id: string, newName: string) {
		setTimers(el =>
			el.flatMap(a => {
				if (a.id === id) {
					a.name = newName;
					IDB.delete(id).then(r => IDB.write(a));
					return [a];
				} else return [a];
			})
		);
	}

	// change timer's state (record or none)
	function onTimerStateChange(event: MouseEvent, id: string) {
		setTimers(el =>
			el.flatMap(a => {
				if (a.id === id) {
					if (a.state === "active") {
						a.datesActive[a.datesActive.length - 1].push(new Date());
						a.state = null;
					} else {
						a.datesActive.push([new Date()]);
						a.state = "active";
					}
					IDB.delete(id).then(r => IDB.write(a));
					return [a];
				} else return [a];
			})
		);
	}

	return (
		<>
			<div className="add-timer">
				<Button mode="dark" onClickHandler={onClickHandler}>
					Добавить таймер {plusImg}
				</Button>
			</div>
			{timers.map((a, i) => {
				return (
					<Timer
						onTimerStateChange={onTimerStateChange}
						onDeleteHandler={onDeleteHandler}
						onNameChange={onNameChange}
						{...a}
						key={a.id}
					/>
				);
			})}
		</>
	);
}
