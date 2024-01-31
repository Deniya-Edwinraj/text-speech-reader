// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// Manual array of voices with languages
const voices = [
  { name: 'US English Female', lang: 'en-US' },
  { name: 'UK English Female', lang: 'en-GB' },
  // Add more voices as needed
];

// Fill the voice select dropdown
voices.forEach(voice => {
  const option = document.createElement('option');
  option.textContent = voice.name + '(' + voice.lang + ')';
  option.setAttribute('data-lang', voice.lang);
  option.setAttribute('data-name', voice.name);
  voiceSelect.appendChild(option);
});

// Speak
const speak = () => {
  if (textInput.value !== '') {
    // Add background animation
    body.style.background = '#141414 url(img/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';

    // Get selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    // Set pitch and rate
    const options = {
      rate: rate.value,
      pitch: pitch.value,
      onend: () => {
        console.log('Done speaking...');
        body.style.background = '#141414';
      },
      onerror: () => {
        console.error('Something went wrong');
      },
    };

    // Find the selected voice
    const selectedVoiceObj = voices.find(voice => voice.name === selectedVoice);

    // Speak using responsivevoice.js
    responsiveVoice.speak(textInput.value, selectedVoiceObj.lang, options);
  }
};

// EVENT LISTENERS

// Text form submit
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener('change', e => speak());
