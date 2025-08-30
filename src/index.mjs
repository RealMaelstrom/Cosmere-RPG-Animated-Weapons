import { mappings as PremiumMappings } from "./mappings/premium-animations.mjs";
import { mappings as FreeMappings } from "./mappings/free-animations.mjs";
import { AnimationMacros } from "./macros";
import { registerModuleSettings } from "./utils/settings";
import { NeedsSynced } from "./utils/version-parsing";
import { MODULE_ID, SETTINGS } from "./utils/constants";

Hooks.once('init', () => {
	globalThis.cosmereAnimations = Object.assign(
		{
			utils: AnimationMacros,
			mappings: {
				free: FreeMappings,
				premium: PremiumMappings,
			},
		}
	);

	registerModuleSettings();

	// Preload Handlebars templates.
	//return preloadHandlebarsTemplates();
});

Hooks.once('ready', () => {
	if (NeedsSynced()) {
		ui.notifications.info("cosmere-animations.notifications.mappingSync", { localize: true });
		AnimationMacros.syncMapping();
	}
});

Hooks.on('cosmere-rpg.useItem', (item, rollConfig, _options) => {
	if (item.parent) {
		cosmereAnimations.utils.runAnimation(item.system.id, item.parent);
	}
});
