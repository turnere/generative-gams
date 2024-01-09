import * as Tone from 'tone';
import './styles.css';

const AUTO_PLAYBACK_KEY_NAME = 'GMClassroomShouldPlayAutomatically';

const assignVersion = () => {
  const versionTag = document.getElementById(
    'version-link'
  ) as HTMLAnchorElement;
  versionTag.innerText = `Tone.js version ${Tone.version}`;
  versionTag.href = `https://tonejs.github.io/docs/${Tone.version}/`;
};

const attachControlHandlers = () => {
  const controls = document.getElementById('controls') as HTMLAudioElement;
  controls.addEventListener('volumechange', () => {
    const toneDestination = Tone.getDestination();
    toneDestination.mute = controls.muted;
    toneDestination.output.gain.value = controls.volume;
  });
  controls.addEventListener('play', () => {
    Tone.start()
      .then(() => import('../generator.js'))
      .then(() => {
        Tone.loaded().then(() => {
          document.getElementById('tone-load-feedback').innerText =
            'Audio files loaded!';
        });
      });
  });
  controls.addEventListener('pause', () => {
    Tone.getTransport().stop();
    Tone.getDestination().mute = true;

    // For now, force student to reload page after stopping
    // so we don't have to deal with disposing nodes and weird "restart" behavior
    const controlsContainer = document.getElementById('controls-container');
    //controlsContainer.removeChild(controls);
    const reloadButton = document.createElement('button');
    reloadButton.innerText = 'Refresh';
    reloadButton.addEventListener('click', () => {
      window.location.reload();
    });
    controlsContainer.append(reloadButton);
  });
};

const handleRestartBehavior = () => {
  const shouldPlayAutomatically =
    localStorage.getItem(AUTO_PLAYBACK_KEY_NAME) === 'true';
  const automaticPlaybackCheckbox = document.getElementById(
    'automatic-play-checkbox'
  ) as HTMLInputElement;
  if (shouldPlayAutomatically) {
    automaticPlaybackCheckbox.checked = true;
    const controls = document.getElementById('controls') as HTMLAudioElement;
    controls.play();
  }
  automaticPlaybackCheckbox.addEventListener('change', () => {
    localStorage.setItem(
      AUTO_PLAYBACK_KEY_NAME,
      automaticPlaybackCheckbox.checked.toString()
    );
  });
};

const handleDOMContentLoaded = () => {
  assignVersion();
  attachControlHandlers();
  handleRestartBehavior();
};

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
