export let idNum = ["0"];

export function getId(): string {
	let res: string = "";
	let c: number = 0;
	let a: string[] = idNum;
	let b: string[] = ["1"];

	while (a.length || b.length || c) {
		c += ~~a.pop() + ~~b.pop();
		res = (c % 10) + res;
		c = +(c > 9);
	}

	const result = res.replace(/^0+/, "");
	idNum[0] = result;
	return result;
}
