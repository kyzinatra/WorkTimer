import { timer } from "../components/App/App";

export class IDBManager {
	db: IDBDatabase | undefined;
	name: string;
	version: number;
	timersOnStart: any;
	constructor(name: string, version: number) {
		this.name = name;
		this.version = version;

		const openRequest = indexedDB.open(name, version);

		openRequest.onsuccess = () => {
			const db = openRequest.result;
			this.db = db;
			this.getAll().then(res => {
				this.timersOnStart = res;
			});
			db.onversionchange = function () {
				db.close();
				alert("База данных устарела, пожалуста, перезагрузите страницу.");
			};
		};

		openRequest.onupgradeneeded = () => {
			const db = openRequest.result;
			switch (db.version) {
				case 1:
					db.createObjectStore(name, { keyPath: "id" });
					break;
			}
		};
	}
	async write(obj: timer) {
		if (!this.db) return;
		const transaction = this.db.transaction(this.name, "readwrite");
		const store = transaction.objectStore(this.name);
		const request = store.add(obj);
		return new Promise((res, rej) => {
			request.onsuccess = () => res(request.result);
			request.onerror = () => rej(request.error);
		});
	}

	async get(id: string) {
		if (!this.db) return false;
		const transaction = this.db.transaction(this.name, "readwrite");
		const store = transaction.objectStore(this.name);
		const request = store.get(id);
		return new Promise((res: (value: timer[]) => void, rej) => {
			request.onsuccess = () => res(request.result);
			request.onerror = () => rej(request.error);
		});
	}
	async getAll() {
		if (!this.db) return false;
		const transaction = this.db.transaction(this.name, "readwrite");
		const store = transaction.objectStore(this.name);
		const request = store.getAll();
		return new Promise((res: (value: timer[]) => void, rej) => {
			request.onsuccess = () => res(request.result);
			request.onerror = () => rej(request.error);
		});
	}

	async getAllKeys() {
		if (!this.db) return false;
		const transaction = this.db.transaction(this.name, "readwrite");
		const store = transaction.objectStore(this.name);
		const request = store.getAllKeys();
		return new Promise((res, rej) => {
			request.onsuccess = () => res(request.result);
			request.onerror = () => rej(request.error);
		});
	}
	async delete(id: string) {
		if (!this.db) return;
		const transaction = this.db.transaction(this.name, "readwrite");
		const store = transaction.objectStore(this.name);
		const request = store.delete(id);
		return new Promise((res, rej) => {
			request.onsuccess = () => res(request.result);
			request.onerror = () => rej(request.error);
		});
	}
}
