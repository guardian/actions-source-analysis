import { debug, info, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { analyseComponents } from './actions/components';
import { analysePackages } from './actions/packages';
import { name } from './lib/pkg';

async function run(): Promise<void> {
	try {
		info(`Running ${name}`);

		debug(`Event name: ${context.eventName}`);
		debug(`Action type: ${context.payload.action ?? 'Unknown'}`);

		await analyseComponents();
		analysePackages();
	} catch (error) {
		if (error instanceof Error) {
			setFailed(error.message);
		} else {
			throw error;
		}
	}
}

void run();
