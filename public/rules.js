export function renderRules() {
    const div = document.querySelector('#rules');

    const p = document.createElement('p');
    
    p.innerHTML = `<b>Rules:</b><br>
    Choose 10 drivers who you think will accumulate the most points over the season.<br>
    You are only allowed a maximum of 5 drivers from last season's top 5 teams (McLaren, Ferrari, Red Bull, Mercedes, Aston Martin)<br>
    Points are accumulated from the main race and sprint races. There are no points for fastest lap this year. <br><br>
    <b>Bonus</b> points can be gained each race by successfully predicting the main race podium. 3 points if one of your selections is on the podium,  6 points for two drivers, 10 points for three drivers and 20 points for 3 three drivers in the correct order.
    Your podium selection must be submitted before the countdown timer reaches zero.`;

    div.appendChild(p);

    return div;
}