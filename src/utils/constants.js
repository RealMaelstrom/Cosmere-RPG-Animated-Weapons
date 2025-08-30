/**
 * String identifier for the module used throughout other scripts.
 */
export const MODULE_ID = 'cosmere-rpg-animated-weapons';

/**
 * Full title string of the module.
 */
export const MODULE_NAME = 'Cosmere RPG Animated Weapons';

/**
 * String identifier for the system used throughout other scripts.
 */
export const SYSTEM_ID = 'cosmere-rpg';


/**
 * Psuedo enum for which JB2A assets are available.
 */
export const Assets = Object.freeze({
	None: Symbol("none"),
	Free: Symbol("free"),
	Premium: Symbol("premium"),
});

/**
 * Psuedo enum for settings ids.
 */
export const SETTINGS = Object.freeze({
	AnimationMappings: "animationAssetMappings",
	MappingSync: "mappingSync",
	SyncButton: "syncMappingButton",
});
