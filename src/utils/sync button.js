import { AnimationMacros } from "../macros";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api
export class SyncButton extends HandlebarsApplicationMixin(ApplicationV2) {
	async _prepareContext() {
		console.log("SYNCING!");
		AnimationMacros.syncMapping();
		console.log("SYNCED!");
		this.close();
	}
}
