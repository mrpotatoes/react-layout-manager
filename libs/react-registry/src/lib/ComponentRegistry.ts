import Registry from './Registry';
import { has } from 'lodash'

export default class ComponentRegistry {
	private registries = {}
	public static DEFAULT_TARGET: string = "default";
	private static instance: ComponentRegistry;

	private constructor() {
		// Initialize the registries container and default target
		const defaultRegistry: Registry = new Registry();

		this.registries[ComponentRegistry.DEFAULT_TARGET] = defaultRegistry
	}

	public static getInstance() {
		if (!ComponentRegistry.instance) {
			ComponentRegistry.instance = new ComponentRegistry();
		}
		return ComponentRegistry.instance;
	}

	public getRegistry(targetOption?: string): Registry {
		const newRegistry: Registry = new Registry();
		const target = (targetOption) ? targetOption : ComponentRegistry.DEFAULT_TARGET;
		
		if (has(this.registries, target)) {
			return this.registries[target] as Registry;
		}
		
		this.registries[target] = newRegistry

		return newRegistry;
	}

	public register(component: object, key: string, conditions?: object, target?: string): void {
		const registry: Registry = this.getRegistry(target);
		
		registry.register(component, key, conditions);
	}

	public get(key: string, conditions?: object, target?: string): object | undefined {
		return (this.getRegistry(target))
			? this.getRegistry(target).get(key, conditions)
			: undefined;
	}
}
