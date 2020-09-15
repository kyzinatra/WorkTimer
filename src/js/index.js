/** @format */

window.addEventListener("load", () => {
	if (navigator.serviceWorker) {
		navigator.serviceWorker
			.register("./servise-worker.js", {
				scope: "/",
			})
			.then(res => {
				console.log(res.scope);
			}, console.error);
	}
});
