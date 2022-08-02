import Registry from './Registry';

export interface ComponentRegistry {
  getRegistry(target: string): Registry;
  register(component: object, key: string,  conditions?: object, target?: string): void;
  get(key: string, conditions?: object, target?: string): object | undefined;
}

export interface IProviderArguments {
  conditions?: object;
 registry?: string;
}

export interface IArguments {
	id: string;
	conditions?: object;
	registry?: string;
}

export interface IProviderProps {
	conditions?: object;
	registry?: string;
}