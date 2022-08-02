import { Args } from '../types'
import Logger from './Logger';

export class Arguments implements Args {
	public id: string;
	public conditions?: object;
	public registry?: string;

	constructor(id: string, conditions?: object, registry?: string) {
		this.id = id;
		this.conditions = conditions;
		this.registry = registry;
	}

	public isValid(): boolean {
		return Arguments.isValid(this);
	}
	
	public static isValid(args: any): boolean {
		return typeof args === 'string' || (typeof args === 'object' && (
			(typeof args.id === 'string' && typeof args.conditions === 'undefined' && typeof args.registry === 'undefined') ||
			(typeof args.id === 'string' && typeof args.conditions === 'object' && typeof args.registry === 'undefined') ||
			(typeof args.id === 'string' && typeof args.conditions === 'undefined' && typeof args.registry === 'string') ||
			(typeof args.id === 'string' && typeof args.conditions === 'object' && typeof args.registry === 'string')
		));
	}

	public static parseArgs(params: any, thow: boolean = true): Args {		
		if (thow && !Arguments.isValid(params)) {
			Logger.throw("arguments.common"); // id is essential, throw error instead of logging it
		}

		if (typeof params === 'string') { // id from string
			return new Arguments(params);
		}

		if (typeof params === 'object') {
			return new Arguments(params.id, params.conditions, params.registry);
		}		
	}

	public static parseComponentArgs(component: any, params: string | object): Args {
		const componentArgs: any = {};
		
		// Arugmnets provided by component functions
		if(typeof component !== 'undefined') {
		
			// Id provided by component
			if(typeof component.getId !== 'undefined') {
				componentArgs.id = component.getId();
			}

			// Conditions provided by component
			if(typeof component.getConditions !== 'undefined') {
				componentArgs.conditions = component.getConditions();
			}

			// Registry provided by component
			if(typeof component.getRegistry !== 'undefined') {
				componentArgs.registry = component.getRegistry();
			}
		}

		// Parse arguments but don't throw error for invalid arguments yet
		const paramArgs: Args = Arguments.parseArgs(params, false);

		// Arguments provied to register function. Override those provided by component.
		if(typeof paramArgs !== 'undefined') {
		
			// Override id provied by component function with id provied by args
			if(typeof paramArgs.id !== 'undefined') {
				componentArgs.id = paramArgs.id;
			}

			// Override conditions provied by component function with conditions provied by args
			if(typeof paramArgs.conditions !== 'undefined') {
				componentArgs.conditions = paramArgs.conditions;
			}

			// Override registry provied by component function with registry provied by args
			if(typeof paramArgs.registry !== 'undefined') {
				componentArgs.registry = paramArgs.registry;
			}
		}

		return Arguments.parseArgs(componentArgs);
	}
}
