import { Assets, MODULE_ID, SETTINGS } from "../utils/constants";

export function DetectMapping() {
	if (game.modules.get('jb2a_patreon')?.active) {
		return Assets.Premium;
	} else if (game.modules.get('JB2A_DnD5e')?.active) {
		return Assets.Free;
	} else {
		ui.notifications.error("cosmere-animations.notifications.noAnimationAssetsError");
		return Assets.None;
	}
}

export function SyncMapping() {
	// to-do, add custom mappings in settings and detect them
	// so they aren't overridden by this sync
	const mapping = GetMapping();
	if (mapping) {
		game.settings.set(MODULE_ID, SETTINGS.AnimationMappings, mapping);
		game.settings.set(MODULE_ID, SETTINGS.MappingSync, {
			system: game.system.version,
			module: game.modules.get(MODULE_ID).version,
		});
	}
}

export function GetMapping() {
	switch (DetectMapping()) {
		case Assets.Premium: {
			return cosmereAnimations.mappings.premium;
		}
		case Assets.Free: {
			return cosmereAnimations.mappings.free;
		}
	}
}
