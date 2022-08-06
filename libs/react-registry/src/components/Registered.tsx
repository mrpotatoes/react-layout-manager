import * as React from 'react';
import { render } from '../util/Registry';
import { Args } from '../config/types';
import { parseArgs } from '../util/Arguments';

export default (props: any): React.ReactElement => {
	const args: Args = parseArgs({ ...props });

	return render(args, { ...props }) as JSX.Element;
}