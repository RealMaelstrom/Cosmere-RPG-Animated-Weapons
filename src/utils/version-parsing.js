function SemanticVersioning(version) {
	const splitVersion = version.split(".");
	if (splitVersion.length < 3) {
		console.error("Invalid semantic version string!");
		return {
			major: 0,
			minor: 0,
			patch: 0,
		};
	}

	return {
		major: splitVersion[0],
		minor: splitVersion[1],
		patch: splitVersion[2],
	};
}

function VersionMatch(versionA, versionB) {
	const splitA = SemanticVersioning(versionA);
	const splitB = SemanticVersioning(versionB);
	return splitA.major === splitB.major && splitA.minor === splitB.minor && splitA.patch === splitB.patch;
}

function IsNewerVersion(current, previous) {
	const splitCurrent = SemanticVersioning(current);
	const splitPrevious = SemanticVersioning(previous);

	if (splitCurrent.major === splitPrevious.major) {
		if (splitCurrent.minor > splitPrevious.minor) {
			return true;
		}
		if (splitCurrent.minor === splitPrevious.minor) {
			if (splitCurrent.patch > splitCurrent.patch) {
				return true;
			}
		}
	} else if (splitCurrent.major > splitPrevious.major) {
		return true;
	}

	return false;
}

export function NeedsSynced() {
	const mappingSync = game.settings.get(MODULE_ID, SETTINGS.MappingSync);
	const systemVersion = game.system.version;
	const moduleVersion = game.modules.get(MODULE_ID).version;

	return !VersionMatch() && (
		IsNewerVersion(systemVersion, mappingSync.system)
		|| IsNewerVersion(moduleVersion, mappingSync.module)
	);
}
