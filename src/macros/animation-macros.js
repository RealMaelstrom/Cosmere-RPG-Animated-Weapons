import { MODULE_ID, SETTINGS } from "../utils/constants";

export function RunAnimation(itemId) {
	const target = Array.from(game.user.targets)[0];
	if (!target) {
		ui.notifications.error('Animation requires a target!');
		return;
	}

	const mappings = game.settings.get(MODULE_ID, SETTINGS.AnimationMappings);
	const mapping = mappings[itemId];
	if (!mapping) {
		console.warn(`Unable to find mapping for ${item.system.id}.`);
		return;
	}

	new Sequence()
		.effect()
		.file(mapping.file)
		.scale(mapping.scale)
		.atLocation(mapping.location)
		.stretchTo(mapping.stretchTo)
		.duration(mapping.duration)
		.play();
}
