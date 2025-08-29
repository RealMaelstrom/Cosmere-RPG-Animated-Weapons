import { mappings as FreeMappings } from "../mappings/free-animations.mjs";
import { MODULE_ID, SETTINGS } from "./constants";

export function registerModuleSettings() {
	game.settings.register(MODULE_ID, SETTINGS.AnimationMappings, {
		name: "Asset Mappings",
		hint: "Determines the mappings for various assets to identifiers of individual Foundry system items.",
		scope: "world",
		default: FreeMappings,
		type: Object,
		config: false,
		requiresReload: false,
	});

	game.settings.register(MODULE_ID, SETTINGS.MappingSync, {
		name: "Mapping Sync",
		hint: "Indicates when the mappings were last synchronized.",
		scope: "world",
		default: "0.0.0",
		type: String,
		config: false,
		requiresReload: false,
	});
}
