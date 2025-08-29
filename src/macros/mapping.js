import { Assets, MODULE_ID, SETTINGS } from "../utils/constants";

export function DetectMapping() {
	if (game.modules.get('jb2a_patreon')?.active) {
		return Assets.Premium;
	} else if (game.modules.get('JB2A_DnD5e')?.active) {
		return Assets.Free;
	} else {
		ui.notifications.error("No animation assets detected. Please install either JB2A Free or their Patreon pack!");
		return Assets.None;
	}
}

export function SyncMapping() {
	const mapping = GetMapping();
	if (mapping) {
		game.settings.set(MODULE_ID, SETTINGS.AnimationMappings, mapping);
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
