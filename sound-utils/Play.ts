export class Play {
    private playSource:AudioBufferSourceNode;
    private startPlayTime = 0;
    private start = 0;
    private dur = 0;
    private audioBuffer:AudioBuffer;

    constructor(public audioContext:AudioContext) {
    }

    setAudio(audioBuffer:AudioBuffer) {
        this.audioBuffer = audioBuffer;
    }

    cutAudioBuffer(start:number, end:number) {
        start = start * this.audioBuffer.sampleRate | 0;
        end = end * this.audioBuffer.sampleRate | 0;
        var len = end - start;
        var numberOfChannels = this.audioBuffer.numberOfChannels;
        var buff = this.audioContext.createBuffer(numberOfChannels, len, this.audioBuffer.sampleRate);
        for (var i = 0; i < numberOfChannels; i++) {
            var channel:Float32Array = this.audioBuffer.getChannelData(i);
            var sourceChannel:Float32Array = buff.getChannelData(i);
            sourceChannel.set(channel.subarray(start, end));
        }
        return buff;
    }

    play(start:number, dur:number, loop = false) {
        this.stop();
        this.playSource = this.audioContext.createBufferSource();
        this.playSource.buffer = this.audioBuffer;
        this.playSource.connect(this.audioContext.destination);
        this.playSource.onended = ()=>this.stop();

        if (!this.audioBuffer) {
            throw new Error('audioBuffer is empty');
        }
        this.start = start;
        this.dur = dur;
        this.startPlayTime = this.audioContext.currentTime;
        this.playSource.start(0, start, dur);
        this.playSource.loop = loop;
    }

    stop() {
        if (this.playSource) {
            this.playSource.stop();
        }
        this.playSource = null;
    }

    getCurrentTime() {
        var currTime = this.audioContext.currentTime - this.startPlayTime;
        var playDur = this.dur;
        return this.start + (this.playSource ? currTime % playDur : 0);
    }
}