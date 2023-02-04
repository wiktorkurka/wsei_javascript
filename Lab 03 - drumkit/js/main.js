let soundMap = loadSoundMap();
let channelCount = 0;
let isRecording = false;
let isPlaying = false;
let channelNodes = [];
let recordingQueue = []
let selectedChannel = 0;
let sliderPosition = 0;
let BPM;
let tickRate;

for (let i = 0; i < 3; i++)
    addChannel()

document.addEventListener('keypress', handleKeyPress)
document.querySelector('#addChannelButton').addEventListener('click', addChannel)
document.querySelector('#recordButton').addEventListener('click', toggleRecording)
document.querySelector('#playButton').addEventListener('click', togglePlayback)
document.querySelector('#slider').addEventListener('change', (event) => {
    sliderPosition = event.target.value
})
setBPM(65)
setInterval(handleTick, 1);
updateSliderPosition();

function addChannel() {
    let i = channelCount

    let channelContainer = document.querySelector('#channelContainer');
    let channelTemplate = document.querySelector('#channelTemplate');

    let node = channelTemplate.cloneNode(true);
    node.removeAttribute('hidden');
    node.setAttribute('class', 'channel');

    node.channel = {
        isToggled: i == 0 ? true : false,
        isMuted: false,
        recording: {}
    };

    node.querySelector('input[name=toggleButton').checked = node.channel.isToggled

    channelNodes.push(node);

    node.querySelector('input[name=toggleButton').addEventListener('click', () => {
        let idx = channelNodes.indexOf(node);
        toggleChannel(idx);
    })
    node.querySelector('input[name=muteButton').addEventListener('click', (event) => {
        let idx = channelNodes.indexOf(node);
        if (toggleChannelMute(idx))
            event.target.value = "Unmute";
        else
            event.target.value = "Mute";
    })

    node.querySelector('input[name=deleteButton').addEventListener('click', () => {
        let idx = channelNodes.indexOf(node);
        channelContainer.removeChild(node)
        channelNodes[idx] = null
    })

    channelContainer.appendChild(node);
    channelCount
}

function setBPM(bpm) {
    BPM = bpm;
    tickRate = 60000 / BPM;
}

function loadSoundMap(instrument = 'drumkit') {
    let mapping = {}
    fetch(`sounds/${instrument}.json`)
        .then((response) => response.json())
        .then((json) => {
            Object.entries(json).forEach(([key, value]) => {

                let audio = document.createElement('audio');
                mapping[key] = audio;

                audio.setAttribute('id', `sound_${value}`);
                audio.setAttribute('src', `sounds/${instrument}/${value}`);

                document.head.appendChild(audio);
            });
        });
    return mapping;
}

playSound = (sound) => { sound.currentTime = 0; sound.play(); }


function toggleRecording() {
    if (isRecording) {
        isRecording = false;
    } else {
        isPlaying = false;
        isRecording = true;
    }
}

function togglePlayback() {
    if (isPlaying) {
        isPlaying = false;
    } else {
        isRecording = false;
        isPlaying = true;
    }
}

function toggleChannel(channelNumber) {
    let i = 0;
    channelNodes.forEach((node) => {
        if (node != null) {
            let channel = node.channel;
            channel.isToggled = channelNumber == i ? true : false;
        }
        i++;
    })
    selectedChannel = channelNumber;
}

function toggleChannelMute(channelNumber) {
    let channel = channelNodes[channelNumber].channel;
    channel.isMuted = !channel.isMuted;
    return channel.isMuted;
}

function updateSliderPosition() {
    document.querySelector('#slider').value = sliderPosition;
}

function handleKeyPress(event) {
    if (event.key in soundMap) {
        let sound_obj = soundMap[event.key]
        playSound(sound_obj);

        if (isRecording)
            recordingQueue.push(event.key)
    }
}

let lastTick = 0;
function handleTick() {

    if (isRecording) {
        sliderPosition++;
        if (recordingQueue.length > 0) {
            let channel = channelNodes[selectedChannel].channel;
            let recording = channel.recording
            let key = recordingQueue.pop();
            let sound_length = soundMap[key].duration
            recording[sliderPosition] = key
        }
        updateSliderPosition();
    }

    if (isPlaying) {
        sliderPosition++;
        channelNodes.forEach((node) => {
            let channel = node.channel;
            let recording = channel.recording;
            if (sliderPosition in recording && !channel.isMuted)
                playSound(soundMap[recording[sliderPosition]]);
        });
        updateSliderPosition();
    }

    let timeNow = performance.now();
    if (timeNow - lastTick > tickRate) {
        lastTick = timeNow;
        // metronomeCounter++;
        // metronomeTick();
    }

}

//Map channel block colors to sounds 