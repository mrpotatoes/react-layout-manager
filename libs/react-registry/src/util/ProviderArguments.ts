import Logger from './Logger';
import { ProviderArgs } from '../types'

export class ProviderArguments implements ProviderArgs {
	public conditions?: object;
	public registry?: string;

	constructor(conditions?: object, name?: string) {
		this.conditions = conditions;
		this.registry = name;
	}
	
	public static isValid(args: any): boolean {
		return typeof args === 'object' && (
			(typeof args.conditions === 'object' && typeof args.registry === 'undefined') ||
			(typeof args.conditions === 'undefined' && typeof args.registry === 'string') ||
			(typeof args.conditions === 'object' && typeof args.registry === 'string')
		);
	}

	public static parseArgs(arg1: any): ProviderArguments {
		if (ProviderArguments.isValid(arg1)) {
			return new ProviderArguments(arg1.conditions, arg1.registry);
		}

		Logger.error("arguments.provider"); // Non essential, log error instead of throwing

		return new ProviderArguments();
	}

	public isValid(): boolean {
		return ProviderArguments.isValid(this);
	}
}

export const isValid = (args: any): boolean => (
  (typeof args === 'object') && (
    (typeof args.conditions === 'object' && typeof args.registry === 'undefined') ||
    (typeof args.conditions === 'undefined' && typeof args.registry === 'string') ||
    (typeof args.conditions === 'object' && typeof args.registry === 'string')
  )
)

export const parseArgs = (arg1: any): ProviderArguments => {
  if (isValid(arg1)) {
    return new ProviderArguments(arg1.conditions, arg1.registry);
  }

  // Non essential, log error instead of throwing
  Logger.error('arguments.provider');

  return new ProviderArguments();
}