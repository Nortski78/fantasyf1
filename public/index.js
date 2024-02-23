import { countdown } from "./coundown-module.js";
import { initializeClock } from "./countdown.js";
import { eventDetails } from "./event-details-module.js";
import { renderRules } from "./rules.js";
import { leaderBoard } from "./leaderboard-module.js";
import { updateLeaderboard } from "./leaderboard.js";
import { renderPodiumButton, renderDriverOptions, updateDriverOptions, renderPinField, renderSubmitButton } from "./podium-selection-module.js";

const getEventDetails = async () => {
    const response = await fetch('event-details');
    const data = await response.json();

    eventDetails(data);
    initializeClock(data.event_start);

    return data;
}

const getPlayerDetails = async () => {
    const response = await fetch('player-details');
    const data = await response.json();

    updateLeaderboard(data);

    return data;
}

const getDriverDetails = async () => {
    const response = await fetch('driver-details');
    const data = await response.json();

    updateDriverOptions(data);

    return data;
}

countdown();
renderPodiumButton();
renderDriverOptions();
renderPinField();
renderSubmitButton();
renderRules();
leaderBoard();
getEventDetails();
getPlayerDetails();
getDriverDetails();