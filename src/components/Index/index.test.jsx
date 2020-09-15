document.write("<div id='root'></div>");
const { store } = require(".");

test("Index render should be complited", () => {
	expect(store).toBeInstanceOf(Object);
	expect(store.dispatch).toBeInstanceOf(Function);
	expect(store.getState).toBeInstanceOf(Function);
	expect(store.replaceReducer).toBeInstanceOf(Function);
	expect(store.subscribe).toBeInstanceOf(Function);
});
