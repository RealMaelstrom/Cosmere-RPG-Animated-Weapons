import { mappings as PremiumMappings } from "./premium-animations.mjs";
import { mappings as FreeMappings } from "./free-animations.mjs";

const Assets = Object.freeze({
    None: Symbol("none"),
    Free: Symbol("free"),
    Premium: Symbol("premium"),
});

var assetState = Assets.None;

Hooks.once('ready', () => {
    if (game.modules.get('jb2a_patreon')?.active) {
        assetState = Assets.Premium;
    } else if (game.modules.get('JB2A_DnD5e')?.active) {
        assetState = Assets.Free;
    } else {
        ui.notifications.error("No animation assets detected. Please install either JB2A Free or their Patreon pack!");
    }
});

Hooks.on('createItem', (item, options, userId) => {
    if (item.parent) {
        switch (assetState) {
            case Assets.Premium: {
                assignAssets(item, PremiumMappings);
                break;
            }
            case Assets.Free: {
                assignAssets(item, FreeMappings);
                break;
            }
        }
    }
});

function assignAssets(item, mappings) {
    const mapping = mappings[item.system.id];
    if (!mapping) {
        console.warn(`Unable to find mapping for ${item.system.id}.`);
        return;
    }

    var macro = "let target = Array.from(game.user.targets)[0];\n";
    macro += "if (!target) {\n\t"
    macro += "ui.notifications.error('Animation requires a target!');\n\treturn;\n}\n\n";
    macro += "new Sequence().effect()\n\t";
    macro += `.file("${mapping.file}")\n\t.scale(${mapping.scale})\n\t.atLocation(${mapping.location})\n\t`;
    macro += `.stretchTo(${mapping.stretchTo})\n\t.duration(${mapping.duration})\n\t.play();`;

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