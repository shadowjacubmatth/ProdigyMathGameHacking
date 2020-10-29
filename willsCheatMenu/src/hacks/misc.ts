import { Swal, Toast, NumberInput, Confirm } from "../utils/swal";
import { Hack, category, Toggler } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom } from "../utils/util";
import { prodigy, game } from "../utils/util";

saveState = (state) => {
  playerStateHistory = JSON.parse(localStorage.getItem("playerStateHistory")) || [];
  
  if(typeof state == "object") {
      playerStateHistory.push(state);
      localStorage.setItem('playerStateHistory', JSON.stringify(state));
  } else {
    throw new TypeError(`Invalid state data. Expected object, got ${typeof state}.`);
  }
}

loadState = (stateNum) => {
  playerStateHistory = JSON.parse(localStorage.getItem("playerStateHistory")) || [];
	
	if(playerStateHistory == []) return throw new TypeError(`No state history exists.`);
	
	if(typeof stateNum == "number") {
		if(playerStateHistory.length[stateNum] == "undefined") {
			return throw new Error("State number is greater than state history length.");
		}
		
		_.player = playerStateHistory[stateNum];
	} else {
		throw new TypeError(`Invalid state ID data. Expected number, got ${typeof stateNum}.`);
	}
}

new Hack(category.misc, "Skip Tutorial").setClick(async () => {
	const setQuest = (t: string, i: number, n?: unknown, e?: unknown) => {
		_.instance.prodigy.world.getZone(t).testQuest(i, n, e);
		try {
			_.instance.game.state.states.TileScreen.process();
		} catch {}
	};

	setQuest("house", 2);
	setQuest("academy", 2);
	_.player.state.set("tutorial-0", 4);
	_.player.backpack.addKeyItem(13, 0);
	_.player.tutorial.data.menus[14] = [1]
	_.instance.prodigy.open.map(true, []);
	_.player.onTutorialComplete();
});

let viber: number | null = null;

new Toggler(category.misc, "Clothing Vibe")
	.setEnabled(async () => {
		viber = window.setInterval(() => {
			const rand = <T extends { ID: number }>(arr: T[]) =>
				pickRandom(arr).ID;
			_.player.equipment.setOutfit(rand(gameData.outfit));
			_.player.equipment.setBoots(rand(gameData.boots));
			_.player.equipment.setHat(rand(gameData.hat));
			_.player.appearanceChanged = true;
		}, 690);
	})
	.setDisabled(() => {
		if (viber) clearInterval(viber);
	});

new Hack(category.misc, "Bobbify", "Converts your account into Bobby Fancywoman.").setClick(async () => {
	if (!(
		await Confirm.fire("Are you sure you want your account to be turned into Bobby Fancywoman?", "This action is not reversable.")
	).value) return;

	_.player.name.data.nickname = null;
	_.player.name.data.firstName = 44;
	_.player.name.data.middleName = 754;
	_.player.name.data.lastName = 882;
	_.player.data.stars = -1e22;
	_.player.data.level = 69;

	_.player.appearance.setGender("male");
	_.player.appearance.setEyeColor(1);
	_.player.appearance.setFace(4);
	_.player.appearance.setHair(19, 1);
	_.player.appearance.setSkinColor(1);
	_.player.equipment.setFollow(19);
	_.player.equipment.setHat(19);
	_.player.equipment.setBoots(19);
	_.player.equipment.setOutfit(19);
	_.player.equipment.setWeapon(19);
	_.player.forceSaveCharacter();
	await Toast.fire("Bobbified!", "You are now Bobby Fancywoman.", "success");
});

new Hack(category.misc, "Reset Account","Completely resets your account.").setClick(async () => {
	if (!(await Confirm.fire("Are you sure you want to reset your account?", "This action is not reversable.")).value) return;
	_.player.resetAccount();
});

new Hack(category.misc, "Restore Player State", "Restores your player data to an earlier state (WCM must've been installed at the time, and the history data is local to this device only.)").setClick(async () => {
	
});
