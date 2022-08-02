export default class ComponentEntry {
	public component: object;
	public conditions: object | undefined;

	constructor(component: object, conditions?: object) {
		this.component = component;
		this.conditions = conditions;
	}
}
