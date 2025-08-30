import { mappings as FreeMappings } from "../mappings/free-animations.mjs";
import { MODULE_ID, SETTINGS } from "./constants";
import { SyncButton } from "./sync button.js";

export function registerModuleSettings() {
	// Hidden Settings
	const hiddenSettings = [
		{
			name: SETTINGS.AnimationMappings,
			type: Object,
			default: FreeMappings,
		},
		{
			name: SETTINGS.MappingSync,
			type: Object,
			default: {
				system: "0.0.0",
				module: "0.0.0",
			},
		}
	];

	hiddenSettings.forEach(setting => {
		game.settings.register(MODULE_ID, setting.name, {
			name: game.i18n.localize(`cosmere-animations.settings.${setting.name}.name`),
			hint: game.i18n.localize(`cosmere-animations.settings.${setting.name}.hint`),
			default: setting.default,
			type: setting.type,
			scope: "world",
			config: false,
		});
	});

	// Settings Buttons
	const buttonSettings = [
		{
			name: SETTINGS.SyncButton,
			icon: 'fas fa-bars',
			restricted: true,
			type: SyncButton,
		}
	];

	buttonSettings.forEach(button => {
		game.settings.registerMenu(MODULE_ID, button.name, {
			name: game.i18n.localize(`cosmere-animations.settings.${button.name}.name`),
			label: game.i18n.localize(`cosmere-animations.settings.${button.name}.name`),
			hint: game.i18n.localize(`cosmere-animations.settings.${button.name}.hint`),
			icon: button.icon,
			restricted: button.restricted,
			type: button.type,
			config: true
		});
	});
}
