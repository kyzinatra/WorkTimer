export class TimeManager {
	mode: string | null;
	constructor(public time: number, mode?: string | null) {
		this.mode = mode;
	}
	getTime() {
		if (this.mode) {
			const hours = ~~(this.time / (3600 * 1000));
			const minutes = `${new Date(this.time).getMinutes()}`.padStart(2, "0");
			if (hours > 99) return `${hours}h`;
			else return `${hours}:${minutes}`;
		} else {
			const hours = new Date(this.time).getHours().toString().padStart(2, "0");
			const minutes = new Date(this.time).getMinutes().toString().padStart(2, "0");
			return hours + ":" + minutes;
		}
	}
	getPast() {
		const past = Date.now() - this.time;
		const hours = ~~(past / (3600 * 1000));
		const minutes = `${new Date(past).getMinutes()}`.padStart(2, "0");
		const seconds = `${new Date(past).getSeconds()}`.padStart(2, "0");
		if (hours > 99) return `${hours}h`;
		else return `${hours}:${minutes}:${seconds}`;
	}
}
