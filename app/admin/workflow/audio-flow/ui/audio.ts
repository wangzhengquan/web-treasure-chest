'use client';
let audioContext: AudioContext | null = null;

if (typeof window !== 'undefined') {
  audioContext = new AudioContext();
  audioContext.suspend();
}

// let mediaRecorder;
// let chunks = [];
const audioNodes = new Map();

// audioNodes.set('output', audioContext.createMediaStreamDestination());

export function isRunning() {
  return audioContext?.state === 'running';
}

export function toggleAudio() {
  if (!audioContext) return;
  return isRunning() ? audioContext.suspend() : audioContext.resume();
}

export function createAudioNode(id: string, type: string, data?: any) {
  if (!audioContext) return;
  switch (type) {
    case 'osc': {
      const node = audioContext.createOscillator();
      audioNodes.set(id, node);
      node.frequency.value = data.frequency;
      node.type = data.type;
      node.start();
      break;
    }
    case 'amp': {
      const node = audioContext.createGain();
      audioNodes.set(id, node);
      node.gain.value = data.gain;
      break;
    }
    case 'record': {
      const node = audioContext.createMediaStreamDestination();
      // mediaRecorder = new MediaRecorder(node.stream);
      audioNodes.set(id, node);
      break;
    }
    case 'out': {
      audioNodes.set(id, audioContext.destination);
      break;
    }
  }
}

export function updateAudioNode(id: string, props: any) {
  const node = audioNodes.get(id);

  for (const [key, val] of Object.entries(props)) {
    if (node[key] instanceof AudioParam) {
      node[key].value = val as number;
    } else {
      node[key] = val;
    }
  }
}

export function removeAudioNode(id: string) {
  const node = audioNodes.get(id);

  node.disconnect();
  node.stop?.();

  audioNodes.delete(id);
}

export function connect(sourceId: string, targetId: string) {
  const source = audioNodes.get(sourceId);
  const target = audioNodes.get(targetId);

  source.connect(target);
}

export function disconnect(sourceId: string, targetId: string) {
  const source = audioNodes.get(sourceId);
  const target = audioNodes.get(targetId);

  source.disconnect(target);
}
