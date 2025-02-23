const header = document.querySelector('#header');

export function renderPodiumButton() {
    const div = document.createElement('div');
    div.setAttribute('id', 'podium-selection');

    const btn = document.createElement('button');
    btn.setAttribute('id', 'podium-btn');
    btn.textContent = "Choose Your Podium";

    div.appendChild(btn);
    header.appendChild(div);

    btn.addEventListener('click', handlePodiumBtn);
}

export function renderDriverOptions() {
    const div = document.createElement('div');
    div.setAttribute('id', 'podium-options');
    div.classList.add('hide');

    const form = document.createElement('form');
    form.setAttribute('id', 'podium-form');
    //form.setAttribute('action', '/insert-podium-selection');
    form.setAttribute('method', "POST");

    const selectOne = document.createElement('select');
    selectOne.classList.add('select-group');
    selectOne.setAttribute('id', 'first');
    selectOne.setAttribute('name', 'first');
    selectOne.required = true;
    const selectTwo = document.createElement('select');
    selectTwo.classList.add('select-group');
    selectTwo.setAttribute('id', 'second');
    selectTwo.setAttribute('name', 'second');
    selectTwo.required = true;
    const selectThree = document.createElement('select');
    selectThree.classList.add('select-group');
    selectThree.setAttribute('id', 'third');
    selectThree.setAttribute('name', 'third');
    selectThree.required = true;

    form.appendChild(selectOne);
    form.appendChild(selectTwo);
    form.appendChild(selectThree);

    div.appendChild(form);

    header.appendChild(div);

}

export function renderPinField() {
    const form = document.querySelector('#podium-form');

    const div = document.createElement('div');
    div.setAttribute('id', 'player-pin');

    const textArea = document.createElement('textarea');
    textArea.setAttribute('id', 'pin-field');
    textArea.setAttribute('minlength', '4');
    textArea.setAttribute('maxlength', '4');
    textArea.setAttribute('placeholder', 'pin');
    textArea.required = true;

    div.appendChild(textArea);
    form.appendChild(div);
}

export function renderSubmitButton() {
    const form = document.querySelector('#podium-form');

    const div = document.createElement('div');
    div.setAttribute('id', 'submit-btn-wrap');

    const btn = document.createElement('button');
    btn.setAttribute('id', 'submit-btn');
    btn.setAttribute('type', 'submit');
    btn.textContent = 'Submit';    

    div.appendChild(btn);
    form.appendChild(div);

    //Event listener
    form.addEventListener('submit', handleSubmit);
}

export function updateDriverOptions(data) {
    const selectNodes = document.querySelectorAll('.select-group');

    selectNodes.forEach((node, index) => {
        
        const option = document.createElement('option');
        option.setAttribute('value', '');
        option.disabled = true;
        option.selected = true;
        option.hidden = true;

        if(index == 0) option.textContent = '1ST';
        else if(index == 1) option.textContent = '2ND';
        else option.textContent = '3RD';

        node.appendChild(option);

        data.forEach((driver) => {
            const option = document.createElement('option');
            option.setAttribute('value', driver.id);
            option.setAttribute('data-driverid', driver.id);
            option.setAttribute('data-drivername', driver.driver_name);
            option.textContent = driver.driver_name;
            node.appendChild(option);
        })
    })

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
}

const handlePodiumBtn = (e) => {
    const podiumBtn = document.querySelector('#podium-selection');
    const optionsDiv = document.querySelector('#podium-options');
    optionsDiv.classList.toggle('hide');
    podiumBtn.classList.toggle('hide');
}

const handleSubmit = async (e) => {
    e.preventDefault();

    const eventID = parseInt(document.querySelector('#event-name').dataset.eventid);
    const first = document.querySelector('#first').selectedOptions[0].getAttribute("data-drivername");
    const second = document.querySelector('#second').selectedOptions[0].getAttribute("data-drivername");
    const third = document.querySelector('#third').selectedOptions[0].getAttribute("data-drivername");
    const pin = parseInt(document.querySelector('#pin-field').value);;
    
    const playerID = await getPlayerDetails(pin);

    if(!playerID.id) {
        console.log('No player found');
        return;
    }

    const formData = {
        'event_id': eventID,
        'first': first,
        'second': second,
        'third': third,
        'player_id': playerID.id,
        'player_name': playerID.player_name
    }

    insertPodiumSelection(formData);
}

const getPlayerDetails = async (pin) => {

    const response = await fetch(`player-details-one/${pin}`);
    const data = await response.json();
   
    if(!data.id) {
        alert("Incorrect pin");
        return false;
    }

    return data;
}

const insertPodiumSelection = async (data) => {
    console.log(data);
    fetch('insert-podium-selection',
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then(res => {return res.json()})
    .then(data => {
        handlePodiumBtn();
        //alert('Podium submitted successfully');
        alert("1st - " + JSON.stringify(data.first) + "\n" + 
              "2nd - " + JSON.stringify(data.second) + "\n" +
              "3rd - " + JSON.stringify(data.third) + "\n \n" + 
              "You can resubmit your selection any time before the countdown ends.");               
    })
    .catch(error => console.log(error));
}