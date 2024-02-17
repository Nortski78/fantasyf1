export function eventDetails(details){
    const event = document.querySelector('#event-details');

    const eventName = document.createElement('h1');
    eventName.setAttribute('id', 'event-name');
    eventName.setAttribute('data-eventID', details.id);
    eventName.textContent = details.event_name;

    const eventLocationLabel = document.createElement('h4');
    eventLocationLabel.setAttribute('id', 'event-location-label');
    eventLocationLabel.textContent = "Circuit:";

    const eventLocation = document.createElement('h2');
    eventLocation.setAttribute('id', 'event-location');
    eventLocation.textContent = details.circuit;

    event.appendChild(eventName);
    event.appendChild(eventLocationLabel);
    event.appendChild(eventLocation);

    return event;
}