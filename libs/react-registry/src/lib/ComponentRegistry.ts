import ObjectMap from '../util/ObjectMap';
import { ComponentRegistry as TYP } from '../types';
import Registry from './Registry';

export default class ComponentRegistry implements TYP {
	public static DEFAULT_TARGET: string = "default";

	public static getInstance() {
		if (!ComponentRegistry.instance) {
			ComponentRegistry.instance = new ComponentRegistry();
		}
		return ComponentRegistry.instance;
	}

	private static instance: ComponentRegistry;
	private registries: ObjectMap;

	private constructor() {
		// Initialize the registries container and default target
		const defaultRegistry: Registry = new Registry();

		this.registries = new ObjectMap();
		this.registries.put(ComponentRegistry.DEFAULT_TARGET, defaultRegistry);
	}

	public getRegistry(target?: string): Registry {
		target = (target) ? target : ComponentRegistry.DEFAULT_TARGET;

		if (this.registries.has(target)) {
			return this.registries.get(target) as Registry;
		}

		const newRegistry: Registry = new Registry();
		this.registries.put(target, newRegistry);

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
