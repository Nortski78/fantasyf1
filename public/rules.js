export function renderRules() {
    const div = document.querySelector('#rules');

    const p = document.createElement('p');
    
    p.innerHTML = `<b>Rules:</b><br>
    Choose 10 drivers who you think will accumulate the most points over the season.<br>
    You are only allowed a total of 5 drivers from last season's top 5 teams (Red Bull, Mercedes, Ferrari, McLaren, Aston Martin)<br>
    Only points from the feature race will count, including fastest lap. Sprint race points do not count.<br><br>
    <b>Bonus</b> points can be gained each race by successfully predicting the podium. 10 points for the correct order, 5 points in any order.
    Your podium selection must be submitted before the countdown timer reaches zero.`;

    div.appendChild(p);

    return div;
}