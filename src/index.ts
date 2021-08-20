import { debug, info, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { name } from './lib/pkg';

function run(): void {
	try {
		info(`Running ${name}`);

		debug(`Event name: ${context.eventName}`);
		debug(`Action type: ${context.payload.action ?? 'Unknown'}`);
	} catch (error) {
		if (error instanceof Error) {
			setFailed(error.message);
		} else {
			throw error;
		}
	}
}

void run();
