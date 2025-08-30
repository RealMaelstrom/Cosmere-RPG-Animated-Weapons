import { MODULE_ID, SETTINGS } from "../utils/constants";

export function RunAnimation(itemId, actor, missed = false) {
	// make sure we have a target
	const target = Array.from(game.user.targets)[0];
	if (!target) {
		ui.notifications.error('cosmere-animations.notifications.animationTargetError', { localize: true });
		return;
	}

	// make sure the animation exists
	const mappings = game.settings.get(MODULE_ID, SETTINGS.AnimationMappings);
	const mapping = mappings[itemId];
	if (!mapping) {
		console.warn(`Unable to find mapping for ${item.system.id}.`);
		return;
	}

	// get a token
	const token = Array.from(canvas.tokens.documentCollection).find(t => t.actorId === actor._id)
		?? canvas.tokens.controlled[0];
	if (!token) {
		console.warn(`Unable to find token on current scene for actor '${actor._id}'`)
		return;
	}

	// initial sequence setup
	const sequence = new Sequence().effect()
		.file(mapping.file)
		.scale(mapping.scale)
		.duration(mapping.duration);
	const location = mapping.location === 'token' ? token : target;

	// either stretch to the target or rotate to them
	if (mapping.stretchToTarget) {
		sequence.atLocation(location);
		sequence.stretchTo(target, { onlyX: true });
	} else if (mapping.rotateToTarget) {
		sequence.atLocation(location, {
			offset: {
				x: -1.5,
				y: 0,
			},
			gridUnits: true,
			local: true,
		});
		sequence.rotateTowards(target);
	}

	// if the attack was a miss, apply a random offset to the animation
	if (missed) {
		sequence.missed();
	}

	// play the animation
	sequence.play();
}
