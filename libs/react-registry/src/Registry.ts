import * as React from 'react';

import ComponentRegistry from './lib/ComponentRegistry';
import { IArguments } from './types';
import { Arguments } from './util/Arguments';
import Logger from './util/Logger';

export default class Registry {
	public static register(component: any, params?: string | IArguments): void {
		if ((typeof component === 'object' || typeof component === 'function') && (typeof params === 'undefined' ||  typeof params !== 'object' || typeof params !== 'string')) {
			const args: IArguments = Arguments.parseComponentArgs(component, params); 
			
			ComponentRegistry.getInstance().register(component, args.id, args.conditions, args.registry);
		} else {
			Logger.error("arguments.register");	
		}
	}

	public static get(params: string | IArguments): object | undefined {
		const args: IArguments = Arguments.parseArgs(params);

		return ComponentRegistry.getInstance().get(args.id, args.conditions, args.registry);
	}

	public static render(params: string | IArguments, props?: object): React.ReactElement<any> | undefined {
		const args: IArguments = Arguments.parseArgs(params);
		const component = ComponentRegistry.getInstance().get(args.id, args.conditions, args.registry);

		if (typeof component === 'function') { // class or function
			return React.createElement(component as React.ComponentClass, props);
		}

		Logger.warn("component.invalid");
	}

	public static createElement(params: string | IArguments, props?: object): React.ReactElement<any> | undefined {
		return Registry.render(params, props);
	}
}

export const register = (component: any, params?: string | IArguments): void => {
	if ((typeof component === 'object' || typeof component === 'function') && (typeof params === 'undefined' ||  typeof params !== 'object' || typeof params !== 'string')) {
		const args: IArguments = Arguments.parseComponentArgs(component, params); 
		
		ComponentRegistry.getInstance().register(component, args.id, args.conditions, args.registry);
	} else {
		Logger.error("arguments.register");	
	}
}

export const get = (params: string | IArguments): object | undefined => {
	const args: IArguments = Arguments.parseArgs(params);

	return ComponentRegistry.getInstance().get(args.id, args.conditions, args.registry);
}

export const render = (params: string | IArguments, props?: object): React.ReactElement<any> | undefined => {
	const args: IArguments = Arguments.parseArgs(params);
	const component = ComponentRegistry.getInstance().get(args.id, args.conditions, args.registry);

	if (typeof component === 'function') { // class or function
		return React.createElement(component as React.ComponentClass, props);
	}

	Logger.warn("component.invalid");
}

export const createElement = (params: string | IArguments, props?: object): React.ReactElement<any> | undefined => {
	return Registry.render(params, props);
}