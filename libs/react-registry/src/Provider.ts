import * as React from 'react';

import Registry from './Registry';
import { Arguments } from './util/Arguments';
import { ProviderArguments } from './util/ProviderArguments';
import { IArguments, IProviderArguments } from './types';

export default class Provider {
	private arguments: IProviderArguments;

	constructor(params: IProviderArguments) {
		this.arguments = ProviderArguments.parseArgs(params);
	}

	public static getArgs(provider: IProviderArguments, local: IArguments): IArguments {
		// If a provider with conditions is present and there are no local conditions, use the provider's conditions
		if (!local.conditions && provider.conditions) {
			local.conditions = provider.conditions;
		}

		// If a provider with a registry name is present and there is no local registry name, use the provider's registry name
		if (!local.registry && provider.registry) {
			local.registry = provider.registry;
		}

		return local;
	}

	public get(params: string | IArguments): object | undefined {
		const local: IArguments = Arguments.parseArgs(params);
		return Registry.get(Provider.getArgs(this.arguments, local));
	}

	public render(params: string | IArguments, props?: object): object | undefined {
		const local: IArguments = Arguments.parseArgs(params);
		return Registry.render(Provider.getArgs(this.arguments, local), props);
	}

	public createElement(params: string | IArguments, props?: object): object | undefined {
		return this.render(params, props);
	}
}
