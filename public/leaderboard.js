export function updateLeaderboard(data) {
    //console.log(data);

    const leaderBoard = document.querySelector('#leaderboard');

    data.forEach((player) => {
        const playerWrap = document.createElement('div');
        playerWrap.classList.add('player-wrap');
        playerWrap.setAttribute('data-playerid', player.id);
        const playerName = document.createElement('div');
        playerName.classList.add('player-label');
        playerName.setAttribute('data-playerid', player.id);
        const playerPoints = document.createElement('div');
        playerPoints.classList.add('player-points');
        playerPoints.setAttribute('data-playerid', player.id);

        const driverWrap = document.createElement('div');
        driverWrap.classList.add('driver-selection', 'hide');
        driverWrap.setAttribute('data-playerid', player.id);
        driverWrap.setAttribute('data-selectionid', player.id);      

        player.driver_details.driver_name.forEach((driver, index) => {
            const driverDetails = document.createElement('div');
            driverDetails.classList.add('driver-details');              
            const driverName = document.createElement('div');
            driverName.classList.add('driver-label');
            const driverPoints = document.createElement('div');
            driverPoints.classList.add('driver-points');


            driverName.textContent = driver;
            driverPoints.textContent = player.driver_details.driver_points[index];

            driverDetails.appendChild(driverName);
            driverDetails.appendChild(driverPoints);

            driverWrap.appendChild(driverDetails);
        })

        // bonus points - not DRY -----------------------
        const driverDetails = document.createElement('div');
        driverDetails.classList.add('driver-details');              
        const driverName = document.createElement('div');
        driverName.classList.add('driver-label');
        const driverPoints = document.createElement('div');
        driverPoints.classList.add('driver-points');


        driverName.textContent = "Bonus";
        driverPoints.textContent = player.bonus;
        driverDetails.appendChild(driverName);
        driverDetails.appendChild(driverPoints);
        driverWrap.appendChild(driverDetails);
        //------------------------------------------------

        playerName.textContent = player.player_name;
        playerPoints.textContent = player.points;

        playerWrap.appendChild(playerName);
        playerWrap.appendChild(playerPoints);
        playerWrap.appendChild(driverWrap);

        leaderBoard.appendChild(playerWrap);

        //Click events
        playerWrap.addEventListener('click', handleEvent);
    });
    
    return leaderBoard;        
}

const handleEvent = (e) => {
    const id = e.target.dataset.playerid;
    const element = document.querySelector(`[data-selectionid="${id}"]`);
    
    element.classList.toggle('hide');
}