import * as React from 'react';

import Registry, { get, render } from './Registry';
import { parseArgs } from './util/Arguments';
import { ProviderArguments } from './util/ProviderArguments';
import { Args, ProviderArgs } from './types';

export default class Provider {
	private arguments: ProviderArgs;

	constructor(params: ProviderArgs) {
		this.arguments = ProviderArguments.parseArgs(params);
	}

	public static getArgs(provider: ProviderArgs, local: Args): Args {
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

	public get(params: string | Args): object | undefined {
		const local: Args = parseArgs(params);
		return get(Provider.getArgs(this.arguments, local));
	}

	public render(params: string | Args, props?: object): object | undefined {
		const local: Args = parseArgs(params);
		return render(Provider.getArgs(this.arguments, local), props);
	}

	public createElement(params: string | Args, props?: object): object | undefined {
		return this.render(params, props);
	}
}
