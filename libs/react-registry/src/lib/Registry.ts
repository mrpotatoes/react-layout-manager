import RegistryEntry from './RegistryEntry';

export default class Registry {
	private registry;
	
	constructor() {
		this.registry = {}
	}

	public register(component: object, key: string, conditions?: object): void {
		const entry = this.registry[key];

		if (entry) {
			entry.add(component, conditions);
		} else {
			const newEntry = new RegistryEntry();
			newEntry.add(component, conditions);
			this.registry[key] = newEntry;
		}
	}

	public get(key: string, conditions?: object): object | undefined {
		const entry = this.registry[key]

		if (entry) {
			return entry.get(false, conditions); // TODO implement mustMatch
		}

		return undefined;
	}
}
