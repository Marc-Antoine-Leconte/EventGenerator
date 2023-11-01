"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react';
import GetGoogleSheet from './helper/googleSheetApi';

enum Action {
  null,
  initEventDeck,
  getNextEvent,
}

type Event = {
  title: string;
  description: string;
  action1: string;
  action2: string;
  action3: string;
  quantity: number
}

const defaultEvents = [
  //{name : "", description : "", action1 : "", action2 : "", action3 : ""},
  { title: "_La pluie_", description: "La pluie tombe drue, ce n'est pas possible d'avancer avec ce temps, sauf si vous avez un chapeau", action1: "Voler le chapeau d'un autre joueur et avancer d'une case (-1 SALUT)", action2: "Consommer un chapeau et avancer d'une case", action3: "Ne rien faire" },
  { title: "_Les bandits_", description: "Une embuscade, vous devez fuir pour sauver votre vie, ou laisser le temps aux autres de s'enfuir", action1: "Fuir (rien ne se passe)", action2: "Rester (vous perdez 2 objets mais +1 SALUT)" },
  { title: "_l'orphelin_", description: "Un jeune garcon s'approche de vous, il a faim", action1: "Forcer son voisin à donner à manger (-1 SALUT)", action2: "Lui donner de la nourriture (+1 SALUT)", action3: "Ne rien faire" },
  { title: "_Le froid_", description: "Par ce temps il n'est pas possible d'avancer sans être bien couvert", action1: "Vous regardez dans la pioche équipement jusqu'à ce que vous piochiez un vêtement (-1 SALUT par carte regardée)", action2: "Consommer un vêtement", action3: "Ne rien faire" },
];

//var events: any[] = [];

export default function Home() {
  const [gameIsOn, setGameIsOn] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [remainingEvents, setRemainingEvents] = useState<number[]>([]);
  const [discardedEvents, setDiscardedEvents] = useState<number[]>([]);
  const [action, setAction] = useState<Action>(Action.null);
  const [events, setEvents] = useState<any[]>([])

  // Fill the event deck
  function initEventDeck() {
    console.log('## INIT EVENT DECK', events);
    var newEventDeck : number[] = [];

    events.forEach((value, index) => {
      var quantity = value.quantity ?? 1;
      var quantityArray = Array.from({length: quantity}, () => index)

      newEventDeck = newEventDeck.concat(quantityArray);
    })

    setRemainingEvents(newEventDeck);
    setDiscardedEvents([]);
  }

  // Get the next event card that will be displayed
  function getNextEvent() {
    console.log('get next event');
    var randomId = Math.floor(Math.random() * remainingEvents.length);
    var nextEventId : number = remainingEvents.at(randomId) ?? 0;

    console.log('random id => ', randomId);
    console.log('new discarded events => ', [...discardedEvents, nextEventId]);
    console.log('filtered events id => ', remainingEvents.filter((value, index) => index != randomId));
    console.log('nextEventId => ', nextEventId);

    setDiscardedEvents([...discardedEvents, nextEventId]);
    setRemainingEvents(remainingEvents.filter((value, index) => index != randomId));
    setSelectedEventId(nextEventId);
  };

  // Update the selected Event when the selectedId is changed
  useEffect(() => {
    if (selectedEventId === null) {
      setSelectedEvent(null);
      return;
    }

    if (selectedEventId < 0 || selectedEventId > events.length) {
      console.error('Value is out of range : ' + { selectedEventId } + " is not bewteen 0 and " + events.length);
      setSelectedEventId(null);
      return;
    }

    setSelectedEvent(events.at(selectedEventId));
  }, [selectedEventId]);

  // Launch the start of the game
  useEffect(() => {
    if (gameIsOn === true) {
      setAction(Action.initEventDeck);
      return;
    }

    setSelectedEventId(null);
    setDiscardedEvents([]);
    setRemainingEvents([]);
  }, [gameIsOn]);

  // Actions handler
  useEffect(() => {
    if (action === Action.null) {
      console.log("## ACTION IS NULL")
      return;
    }
    if (action === Action.initEventDeck) {
      console.log("## initEventDeck")
      
      initEventDeck();
      setAction(Action.getNextEvent);
    }
    if (action === Action.getNextEvent) {
      console.log("## getNextEvent")

      if (remainingEvents.length <= 0) {
        setSelectedEventId(null);
        if (!confirm("Le paquet de carte est épuisé, souhaitez vous remélanger le packet ?")) {
          setGameIsOn(false);
        } else {
          setAction(Action.initEventDeck);
        }
      } else {
        getNextEvent();
        setAction(Action.null);
      }
    }
  }, [action]);

  // Load the card from the google card API
  useEffect(() => {
    GetGoogleSheet((results: any[]) => setEvents(results), () => setEvents(defaultEvents));
  }, []);

  return (
    <main className="test flex min-h-screen flex-col items-center p-24">
      <div id="app-version">v1.0</div>
      <div className="buttons-container">
        <button onClick={() => GetGoogleSheet((results: any[]) => setEvents(results), () => setEvents(defaultEvents))}>
            Import des cartes
          </button>
        {gameIsOn ? (
          <button onClick={() => setAction(Action.getNextEvent)}>
             Evènement suivant ({remainingEvents.length} cartes restantes)
          </button>
        ) : (
          <button onClick={() => setGameIsOn(true)}>
             Commencer une partie
          </button>
        )}
      </div>
      <div>
        <div className='event-generator fix place-items-center'>
          <div className='card'>
            {selectedEventId === null && (
              <div className='card-content'>
                <div className='card-description'>
                  Vide
                </div>
              </div>)}
            {selectedEvent !== null && (
              <div className='card-content'>
                <div className='card-title'>
                  {selectedEvent.title}
                </div>
                <div className='card-description'>
                  <div className='card-description-text'>
                    {selectedEvent.description}
                  </div>
                </div>
                <div className='card-action-list'>
                  <div className='card-action-item'>
                    <div className='card-action-text'>
                      {selectedEvent.action1}
                    </div>
                  </div>
                  <div className='card-action-item'>
                    <div className='card-action-text'>
                      {selectedEvent.action2}
                    </div>
                  </div>
                  <div className={"card-action-item"}>
                    <div className='card-action-text'>
                      {selectedEvent.action3}
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </main>
  )
}
