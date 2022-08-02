import { find } from 'lodash';
import Logger from '../util/Logger';
import ComponentEntry from './ComponentEntry';
import * as Sets from '../util/set';

export default class RegistryEntry {
	private components: ComponentEntry[];

	constructor() {
		this.components = new Array();
	}

	public findDefault(): ComponentEntry | undefined { // use lodash for find to avoid the need for es6 pollyfill
		return find(this.components, (ce) => ce.conditions === undefined);
	}

	public getDefault(): object | undefined {
		const c: ComponentEntry = this.findDefault();
		return c ? c.component : undefined;
	}

	public get(mustMatch: boolean, conditions?: object): object | undefined {		
		if (conditions === undefined) {
			// If there are no conditions provided, return the default component
			return this.getDefault();
		} else {

			// Search for components matching the provided conditions. The conditions on
			// the component must be a subset of the provided conditions or equal to them.

			const cce = find(this.components.slice().reverse(), (ce) => ( // use lodash for find to avoid the need for es6 pollyfill
				Sets.isSubset(conditions, ce.conditions)
			));

			// If a component is found with the provided conditions, return it.
			// Otherwise, if mustMatch == false, return the default component
			return cce ? cce.component : (!mustMatch ? this.getDefault() : undefined);
		}
	}

	public add(component: object, conditions?: object): void {
		if (conditions === undefined && this.findDefault() !== undefined) {
			Logger.warn("duplicate");
		} else {
			const ce = new ComponentEntry(component, conditions);
			this.components.push(ce);
		}
	}
}
