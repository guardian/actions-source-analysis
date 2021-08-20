import { debug, info, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { analyseComponents } from './actions/components';
import { name } from './lib/pkg';

async function run(): Promise<void> {
	try {
		info(`Running ${name}`);

		debug(`Event name: ${context.eventName}`);
		debug(`Action type: ${context.payload.action ?? 'Unknown'}`);

		await analyseComponents();
	} catch (error) {
		if (error instanceof Error) {
			setFailed(error.message);
		} else {
			throw error;
		}
	}
}

void run();
