import { mappings as PremiumMappings } from "./mappings/premium-animations.mjs";
import { mappings as FreeMappings } from "./mappings/free-animations.mjs";
import { AnimationMacros } from "./macros";
import { MODULE_ID, SETTINGS } from "./utils/constants";

Hooks.once('init', async function () {
	globalThis.cosmereAnimations = Object.assign(
		{
			macros: AnimationMacros,
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

Hooks.on('createItem', (item, options, userId) => {
	if (item.parent) {
		addMacroEvent(item);
	}
});

function addMacroEvent(item) {
	const mappings = game.settings.get(MODULE_ID, SETTINGS.AnimationMappings);
	const mapping = mappings[item.system.id];
	if (!mapping) {
		console.warn(`Unable to find mapping for ${item.system.id}.`);
		return;
	}

	var macro = "// This macro will always call the most recent version of the code, do not modify or you risk breaking it.";
	macro += `\n\ncosmereAnimations.macros.runAnimation(${item.system.id});`;

	const events = item.system.events;
	events[`${item.system.id}-animation-macro`] = {
		"id": "AaPJGHg3XlkXrPde",
		"description": `${item.name} Animation`,
		"event": "use",
		"handler": {
			"type": "execute-macro",
			"inline": true,
			"macro": {
				"type": "script",
				"command": macro,
			}
		},
	};

	item.update({ 'system.events': events });
}
