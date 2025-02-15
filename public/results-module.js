export async function renderForm() {

    const drivers = await getDriverDetails();
    const events = await getEventDetails();

    const form = document.querySelector('#results-form');
    const eventDiv = document.createElement('div');
    const eventSelect = document.createElement('select');
    const eventLabel = document.createElement('label');
    const btnDiv = document.createElement('div');
    const submitBtn = document.createElement('button');
    const fastestSelect = document.createElement('select');
    
    eventSelect.setAttribute('id', 'event-select');
    eventLabel.classList.add('tab');
    eventLabel.textContent = "Event";
    submitBtn.textContent = "Submit Race Result";
    fastestSelect.setAttribute('id', 'fastest-lap');

    eventDiv.appendChild(eventLabel);
    eventDiv.appendChild(eventSelect);
    btnDiv.appendChild(submitBtn);
    form.appendChild(eventDiv);

    events.forEach((event) => {
        const option = document.createElement('option');
        option.setAttribute('value', event.id);
        option.setAttribute('data-eventname', event.event_name);
        option.textContent = event.event_name;
        eventSelect.appendChild(option);
    })

    let pos = 1;
    drivers.forEach((driver) => {        

        const selection = document.createElement('select');
        const wrap = document.createElement('div');
        const label = document.createElement('label');

        label.classList.add('tab');
        label.textContent = `${pos}. `;
        wrap.classList.add('driver-form-field');

        selection.classList.add('select-group')
        wrap.appendChild(label);
        wrap.appendChild(selection);
        pos += 1;

        const option = document.createElement('option');
        option.setAttribute('value', '');
        option.textContent = "--"
        option.disabled = true;
        option.selected = true;
        option.hidden = true;
        selection.appendChild(option);

        drivers.forEach((driver) => {
            const option = document.createElement('option');
            option.setAttribute('value', driver.id);
            option.textContent = driver.driver_name;
            selection.appendChild(option);
        })

        form.appendChild(wrap);
    })

    drivers.forEach((driver) => {
        const option = document.createElement('option');
        option.setAttribute('value', driver.id);
        option.textContent = driver.driver_name;
        fastestSelect.appendChild(option);
    })


    const option = document.createElement('option');
    const label = document.createElement('label');
    label.classList.add('tab');
    label.textContent = 'Fastest Lap:';
    option.setAttribute('value', 0);
    option.textContent = "No fastest lap"
    option.selected = true;
    fastestSelect.appendChild(option);
    form.appendChild(label);
    form.appendChild(fastestSelect);
    form.appendChild(btnDiv);

    const selectNodes = document.querySelectorAll('.select-group');

    //Add event listeners - disable driver from lists if already selected
    selectNodes.forEach((elem) => {
        elem.addEventListener('change', (event) => {
            const values = Array.from(selectNodes).map((select) => select.value);
            for (const select of selectNodes) {
                select.querySelectorAll('option').forEach((option) => {
                    const value = option.value;
                    if (value &&  value !== select.value && values.includes(value)) {
                        option.disabled = true;
                    } else {
                        option.disabled = false;
                    }
                });
            }
        });
    });

    form.addEventListener('submit', handleRaceResultSubmit);
}


// render sprint form
export async function renderSprintForm() {

    const drivers = await getDriverDetails();
    const events = await getEventDetails();

    const form = document.querySelector('#sprint-results-form');
    const eventDiv = document.createElement('div');
    const eventSelect = document.createElement('select');
    const eventLabel = document.createElement('label');
    const btnDiv = document.createElement('div');
    const submitBtn = document.createElement('button');
    const fastestSelect = document.createElement('select');
    
    eventSelect.setAttribute('id', 'event-select');
    eventLabel.classList.add('tab');
    eventLabel.textContent = "Event";
    submitBtn.textContent = "Submit Race Result";
    fastestSelect.setAttribute('id', 'fastest-lap');

    eventDiv.appendChild(eventLabel);
    eventDiv.appendChild(eventSelect);
    btnDiv.appendChild(submitBtn);
    form.appendChild(eventDiv);

    events.forEach((event) => {
        const option = document.createElement('option');
        option.setAttribute('value', event.id);
        option.setAttribute('data-eventname', event.event_name);
        option.textContent = event.event_name;
        eventSelect.appendChild(option);
    })

    let pos = 1;
    drivers.forEach((driver) => {        

        const selection = document.createElement('select');
        const wrap = document.createElement('div');
        const label = document.createElement('label');

        label.classList.add('tab');
        label.textContent = `${pos}. `;
        wrap.classList.add('driver-form-field');

        selection.classList.add('select-group')
        wrap.appendChild(label);
        wrap.appendChild(selection);
        pos += 1;

        const option = document.createElement('option');
        option.setAttribute('value', '');
        option.textContent = "--"
        option.disabled = true;
        option.selected = true;
        option.hidden = true;
        selection.appendChild(option);

        drivers.forEach((driver) => {
            const option = document.createElement('option');
            option.setAttribute('value', driver.id);
            option.textContent = driver.driver_name;
            selection.appendChild(option);
        })

        form.appendChild(wrap);
    })

    drivers.forEach((driver) => {
        const option = document.createElement('option');
        option.setAttribute('value', driver.id);
        option.textContent = driver.driver_name;
        fastestSelect.appendChild(option);
    })


    const option = document.createElement('option');
    const label = document.createElement('label');
    label.classList.add('tab');
    label.textContent = 'Fastest Lap:';
    option.setAttribute('value', 0);
    option.textContent = "No fastest lap"
    option.selected = true;
    fastestSelect.appendChild(option);
    form.appendChild(label);
    form.appendChild(fastestSelect);
    form.appendChild(btnDiv);

    const selectNodes = document.querySelectorAll('.select-group');

    //Add event listeners - disable driver from lists if already selected
    selectNodes.forEach((elem) => {
        elem.addEventListener('change', (event) => {
            const values = Array.from(selectNodes).map((select) => select.value);
            for (const select of selectNodes) {
                select.querySelectorAll('option').forEach((option) => {
                    const value = option.value;
                    if (value &&  value !== select.value && values.includes(value)) {
                        option.disabled = true;
                    } else {
                        option.disabled = false;
                    }
                });
            }
        });
    });

    form.addEventListener('submit', handleRaceResultSubmit);
}

const getDriverDetails = async () => {
    const response = await fetch('driver-details');
    const data = await response.json();

    //renderForm(data);
    return data;
}


const getEventDetails = async () => {
    const response = await fetch('events');
    const data = await response.json();

    return data;
}

function handleRaceResultSubmit(e) {
    e.preventDefault();

    let positions = [{id: null, points: 25}, {id: null, points: 18},{id: null, points: 15},{id: null, points: 12},{id: null, points: 10},
        {id: null, points: 8},{id: null, points: 6},{id: null, points: 4},{id: null, points: 2},{id: null, points: 1},
        {id: null, points: 0},{id: null, points: 0},{id: null, points: 0},{id: null, points: 0},{id: null, points: 0},
        {id: null, points: 0},{id: null, points: 0},{id: null, points: 0},{id: null, points: 0},{id: null, points: 0},];

    const eventID = parseInt(document.querySelector('#event-select').value);
    const elem = document.querySelector('#event-select');
    const option = elem.options[elem.selectedIndex];
    const eventName = option.getAttribute("data-eventname");
    const selectGroup = document.querySelectorAll('.select-group');
    const fastestLap = parseInt(document.querySelector('#fastest-lap').value);

    let driversArr = [];
    selectGroup.forEach((driver, index) => {
        if(parseInt(driver.value) === fastestLap) {
            positions[index].points = positions[index].points + 1; 
        }      
        
            positions[index].id = parseInt(driver.value);
            driversArr.push(parseInt(driver.value));
        
    })

    for(const element of positions) {
        element.event_id = eventID;
        element.event_name = eventName;
    }

    const raceResult = {
        event_id: eventID,
        event_name: eventName,
        fastest_lap: fastestLap, // not tested
        result: positions
    }

    insertRaceResult(raceResult);
    updateDriverResults(raceResult);
}

const insertRaceResult = async (data) => {
    fetch('result',
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then(res => {return res.json()})
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

const updateDriverResults = async (data) => {
    fetch('driver-points',
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then(res => {
        return res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.log(error));
}