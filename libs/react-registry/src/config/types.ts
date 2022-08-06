export interface ComponentRegistry {
  getRegistry(target: string): any;
  register(component: object, key: string,  conditions?: object, target?: string): void;
  get(key: string, conditions?: object, target?: string): object | undefined;
}

export interface ProviderArgs {
  conditions?: object;
 registry?: string;
}

export interface Args {
	id: string;
	conditions?: object;
	registry?: string;
}

export interface ProviderProps {
	conditions?: object;
	registry?: string;
}