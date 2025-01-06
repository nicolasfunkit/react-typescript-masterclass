import Soundfont, { InstrumentName, Player } from "soundfont-player";
import { MidiValue } from "../../domain/note";
import { ReactElement, useCallback, useEffect, useState, useRef } from "react";
import { AudioNodesRegistry, DEFAULT_INSTRUMENT } from "../../domain/sound";
import { Optional } from "../../domain/types";

type ProvidedProps = {
  loading: boolean;
  play(note: MidiValue): Promise<void>;
  stop(note: MidiValue): Promise<void>;
};

type ProviderProps = {
  instrument?: InstrumentName;
  AudioContext: AudioContextType;
  render(props: ProvidedProps): ReactElement;
};

export const SoundfontProvider = ({
  AudioContext,
  instrument,
  render,
}: ProviderProps) => {
  let activeNodes: AudioNodesRegistry = {};

  const [current, setCurrent] = useState<Optional<InstrumentName>>(null);

  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState<Optional<Player>>(null);

  const audio = useRef(new AudioContext());

  const loadInstrument = useCallback(() => load(instrument), [instrument]);

  async function load(instrument: InstrumentName = DEFAULT_INSTRUMENT) {
    setLoading(true);
    const player = await Soundfont.instrument(audio.current, instrument);
    setLoading(false);
    setCurrent(instrument);
    setPlayer(player);
  }

  useEffect(() => {
    if (!loading && instrument !== current) {
      loadInstrument();
    }
  }, [loadInstrument, loading, instrument, current]);

  async function resume() {
    return audio.current.state === "suspended"
      ? await audio.current.resume()
      : Promise.resolve();
  }

  async function play(note: MidiValue) {
    await resume();
    if (!player) return;

    const node = player.play(note.toString());
    activeNodes = { ...activeNodes, [note]: node };
  }

  async function stop(note: MidiValue) {
    await resume();
    if (!activeNodes[note]) return;

    activeNodes[note]!.stop();
    activeNodes = { ...activeNodes, [note]: null };
  }

  return render({
    loading,
    play,
    stop,
  });
};
