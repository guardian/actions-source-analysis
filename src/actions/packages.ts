import { readFileSync, writeFileSync } from 'fs';

type Components = Record<
	string,
	{
		instances: number;
		props: Record<string, number>;
	}
>;

interface PackageJson {
	dependencies: Record<string, string>;
}

export const analysePackages = (): void => {
	const components = JSON.parse(
		readFileSync('.source/output/component-usage.json', 'utf8'),
	) as Components;

	const usedPackages = [
		...new Set(
			Object.keys(components).map((component) =>
				component.substring(0, component.lastIndexOf('/')),
			),
		),
	];

	const packageJson = JSON.parse(
		readFileSync('package.json', 'utf-8'),
	) as PackageJson;

	const allPackages = Object.keys(packageJson.dependencies).filter((pkg) =>
		pkg.startsWith('@guardian/src-'),
	);

	const unusedPackages = allPackages.filter(
		(pkg) => !usedPackages.includes(pkg),
	);

	const packageVersions = allPackages.reduce(
		(versions, pkg) => ({
			...versions,
			[pkg]: packageJson.dependencies[pkg],
		}),
		{},
	);

	writeFileSync(
		'.source/output/packages.json',
		JSON.stringify(
			{
				usedPackages,
				unusedPackages,
				packageVersions,
			},
			null,
			2,
		),
	);
};
