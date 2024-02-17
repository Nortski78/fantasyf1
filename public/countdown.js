function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
    /* return {
      total: 0,
      days,
      hours,
      minutes,
      seconds: 10
    }; */
  }
  
export function initializeClock(endtime) {
    //console.log(endtime);
    const daysSpan = document.querySelector('#days-digit');
    const hoursSpan = document.querySelector('#hours-digit');
    const minutesSpan = document.querySelector('#minutes-digit');
    const secondsSpan = document.querySelector('#seconds-digit');
  
    function updateClock() {
      const t = getTimeRemaining(endtime);
  
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        console.log('Button disabled');
        disableSubmit();
        clearInterval(timeinterval);
      }
    }
  
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}

function disableSubmit() {
  const btn = document.querySelector('#podium-btn');

  btn.disabled = true;
}