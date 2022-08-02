import * as PropTypes from 'prop-types';
import * as React from 'react';

import Provider from './Provider';
import Registry from './Registry';
import { Arguments } from './util/Arguments';
import { IArguments } from './types';
import { ProviderArguments } from './util/ProviderArguments';
import { IProviderArguments } from './types';

// Type of props any to allow passing of many props into the registered component
export default class Registered extends React.Component<IArguments, any> {
	public static contextTypes = {
		registryProviderArgs: PropTypes.object
	};

	constructor(props: any) {
		super(props);
	}

	public render() {
		let args: IArguments = Arguments.parseArgs({ ...this.props });

		/** Determine if a {@link ProviderComponent} is present */
		if (this.context.registryProviderArgs) {

			// Supplement supplied arguments with those from the provider
			const providerArgs: IProviderArguments = ProviderArguments.parseArgs(this.context.registryProviderArgs);
			args = Provider.getArgs(providerArgs, args);
		}

		return Registry.render(args, { ...this.props }) as JSX.Element;
	}
}
