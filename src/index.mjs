const Assets = Object.freeze({
  None: Symbol("none"),
  Free: Symbol("free"),
  Premium: Symbol("premium"),
});

var assetState = Assets.None;

Hooks.once('read', () => {
  if(game.modules.get('jb2a_patreon')?.active) {
    assetState = Assets.Premium;
  } else if(game.modules.get('JB2A_DnD5e')?.active) {
    assetState = Assets.Free;
  } else {
    ui.notifications.error("No animation assets detected. Please install either JB2A Free or their Patreon pack!");
  }
});

Hooks.on('createItem', (item, options, userId) => {
  if(item.parent) {
    switch(assetState) {
      case Assets.Premium: {
        assignPremiumAssets(item);
        break;
      }
      case Assets.Free: {
        assignFreeAssets(item);
        break;
      }
    }
  }
});

function assignPremiumAssets(item) {
  // stuff here
}

function assignFreeAssets(item) {
  // stuff here
}