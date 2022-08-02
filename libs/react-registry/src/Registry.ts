import * as React from 'react';
import ComponentRegistry from './lib/ComponentRegistry';
import Logger from './util/Logger';
import { Args } from './types';
import { Arguments } from './util/Arguments';

/**
 * 
 * @param component 
 * @param params 
 */
export const register = (component: any, params?: string | Args): void => {
	if ((typeof component === 'object' || typeof component === 'function') && (typeof params === 'undefined' ||  typeof params !== 'object' || typeof params !== 'string')) {
		const args: Args = Arguments.parseComponentArgs(component, params); 
		
		ComponentRegistry.getInstance().register(component, args.id, args.conditions, args.registry);
	} else {
		Logger.error("arguments.register");	
	}
}

/**
 * 
 * @param params 
 * @returns 
 */
export const get = (params: string | Args): object | undefined => {
	const args: Args = Arguments.parseArgs(params);

	return ComponentRegistry.getInstance().get(args.id, args.conditions, args.registry);
}

/**
 * 
 * @param params 
 * @param props 
 * @returns 
 */
export const render = (params: string | Args, props?: object): React.ReactElement<any> | undefined => {
	const args: Args = Arguments.parseArgs(params);
	const component = ComponentRegistry.getInstance().get(args.id, args.conditions, args.registry);

	if (typeof component === 'function') { // class or function
		return React.createElement(component as React.ComponentClass, props);
	}

	Logger.warn("component.invalid");
}

/**
 * 
 * @param params 
 * @param props 
 * @returns 
 */
export const createElement = (params: string | Args, props?: object): React.ReactElement<any> | undefined => {
	return render(params, props);
}