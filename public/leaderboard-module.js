export function leaderBoard(data) {
    const leaderBoard = document.querySelector('#leaderboard');

    const head = document.createElement('div');
    head.setAttribute('id', 'leaderboard-head');

    const headTitle = document.createElement('div');
    headTitle.setAttribute('id', 'leaderboard-title');
    headTitle.textContent = 'LEADERBOARD';

    const scoreTitle = document.createElement('div');
    scoreTitle.setAttribute('id', 'score-title');
    scoreTitle.textContent = 'POINTS';

    head.appendChild(headTitle);
    head.appendChild(scoreTitle);

    leaderBoard.appendChild(head);

    return leaderBoard;
}