class AudioClassASG {
    constructor(_url, _loop = false, _volume) {
        this.audio = new Audio(_url);
        this.audio.loop = _loop;
        this.audio.volume = _volume;
    }

    playAudio() {
        let isMuted = localStorage.getItem("Muted");
        if (isMuted == "false" || isMuted == null) {
            this.audio.play();
        }
    }
}

var audios = [];