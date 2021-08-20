import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { info } from '@actions/core';
import { exec } from '@actions/exec';

export const analyse = async (): Promise<void> => {
	writeConfigFile();
	await scan();
};

// TODO: Make parts of config configurable
const config = `
module.exports = {
	crawlFrom: '../',
	globs: ['**/(components|pages)/**/!(*.test|*.spec).@(js|ts)?(x)'],
	includeSubComponents: true,
	importedFrom: /^(@guardian\\/src-).*/,
	getComponentName: ({ imported, moduleName }) => {
		return [moduleName, imported].join("\\");
	},
	processors: [
		['count-components-and-props', {}],
		['raw-report', { outputTo: '../.source/source-analysis.json' }],
	],
};
`;

const writeConfigFile = () => {
	if (existsSync('.source')) {
		// TODO: Handle this better
		throw new Error('A .source directory already exists');
	}

	info('Creating .source directory');
	mkdirSync('.source');

	info('Writing config file');
	writeFileSync('.source/config.js', config);
};

const scan = async (): Promise<void> => {
	info('Running react-scanner');
	await exec('cat .source/config.js');
	await exec('npx react-scanner -c .source/config.js');
};
