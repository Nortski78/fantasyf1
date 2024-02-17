export function countdown() {
    const clock = document.querySelector('#countdown');
    
    const days = document.createElement('div');
    days.setAttribute('id', 'days');
    const daysDigit = document.createElement('div');
    daysDigit.setAttribute('id', 'days-digit');
    daysDigit.classList.add('time');
    const daysLabel = document.createElement('div');
    daysLabel.setAttribute('id', 'days-label');
    daysLabel.classList.add('label');
    daysLabel.textContent = "days";
    days.appendChild(daysDigit);
    days.appendChild(daysLabel);

    const hours = document.createElement('div');
    hours.setAttribute('id', 'hours');
    const hoursDigit = document.createElement('div');
    hoursDigit.setAttribute('id', 'hours-digit');
    hoursDigit.classList.add('time');
    const hoursLabel = document.createElement('div');
    hoursLabel.setAttribute('id', 'hours-label');
    hoursLabel.classList.add('label');
    hoursLabel.textContent = "hours";
    hours.appendChild(hoursDigit);
    hours.appendChild(hoursLabel);

    const minutes = document.createElement('div');
    minutes.setAttribute('id', 'minutes');
    const minutesDigit = document.createElement('div');
    minutesDigit.setAttribute('id', 'minutes-digit');
    minutesDigit.classList.add('time');
    const minutesLabel = document.createElement('div');
    minutesLabel.setAttribute('id', 'minutes-label');
    minutesLabel.classList.add('label');
    minutesLabel.textContent = "minutes";
    minutes.appendChild(minutesDigit);
    minutes.appendChild(minutesLabel);

    const seconds = document.createElement('div');
    seconds.setAttribute('id', 'seconds');
    const secondsDigit = document.createElement('div');
    secondsDigit.setAttribute('id', 'seconds-digit');
    secondsDigit.classList.add('time');
    const secondsLabel = document.createElement('div');
    secondsLabel.setAttribute('id', 'seconds-label');
    secondsLabel.classList.add('label');
    secondsLabel.textContent = "seconds";
    seconds.appendChild(secondsDigit);
    seconds.appendChild(secondsLabel);

    clock.appendChild(days);
    clock.appendChild(hours);
    clock.appendChild(minutes);
    clock.appendChild(seconds);

    return clock;
}