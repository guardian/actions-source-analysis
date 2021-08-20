import { debug, info, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { analyse } from './actions/analyse';
import { name } from './lib/pkg';

async function run(): Promise<void> {
	try {
		info(`Running ${name}`);

		debug(`Event name: ${context.eventName}`);
		debug(`Action type: ${context.payload.action ?? 'Unknown'}`);

		await analyse();
	} catch (error) {
		if (error instanceof Error) {
			setFailed(error.message);
		} else {
			throw error;
		}
	}
}

void run();
