import {createContext, ReactNode, useContext, useState} from 'react'

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  tooglePlay: () => void;
  toogleLoop: () => void;
  toogleShuffle: () => void;
  play: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

type PlayerContextProviderProps = {
  children: ReactNode;
}


export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({children}: PlayerContextProviderProps){

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);


  function play(episode: Episode){
    setIsPlaying(true);
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
  }

  function playList(list: Episode[], index: number){
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function tooglePlay(){
    setIsPlaying((playing)=>!playing)
  }

  function toogleLoop(){
    setIsLooping((looping)=>!looping)
  }

  function toogleShuffle(){
    setIsShuffling((shuffle)=>!shuffle)
  }


  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = currentEpisodeIndex + 1 < episodeList.length

  function playNext() {
    if(isShuffling){

      //PAREI AQUI

    }

    if(hasNext){
      setCurrentEpisodeIndex((index) => index +1)
    }
  }

  function playPrevious() {
    if(hasPrevious){
      setCurrentEpisodeIndex((index) => index - 1)
    }
  }

  return (
    <PlayerContext.Provider 
      value = {{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffling,
        tooglePlay,
        toogleLoop,
        toogleShuffle,
        play,
        setPlayingState,
        playList,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer(): PlayerContextData{
  const context = useContext(PlayerContext);
  return context;
}