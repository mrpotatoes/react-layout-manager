import * as PropTypes from 'prop-types';
import * as React from 'react';

import Provider from './Provider';
import { render } from './Registry';
import { Arguments } from './util/Arguments';
import { Args } from './types';
import { ProviderArguments } from './util/ProviderArguments';
import { ProviderArgs } from './types';

// Type of props any to allow passing of many props into the registered component
export default class Registered extends React.Component<IArguments, any> {
	public static contextTypes = {
		registryProviderArgs: PropTypes.object
	};

	constructor(props: any) {
		super(props);
	}

	public render() {
		let args: Args = Arguments.parseArgs({ ...this.props });

		/** Determine if a {@link ProviderComponent} is present */
		if (this.context.registryProviderArgs) {

			// Supplement supplied arguments with those from the provider
			const providerArgs: ProviderArgs = ProviderArguments.parseArgs(this.context.registryProviderArgs);
			args = Provider.getArgs(providerArgs, args);
		}

		return render(args, { ...this.props }) as JSX.Element;
	}
}
