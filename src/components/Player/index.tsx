import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { usePlayer } from '../../hooks/usePlayer'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import styles from './styles.module.scss'

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    tooglePlay,
    toogleLoop,
    toogleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious
  } = usePlayer()
  
  useEffect(()=>{
    if (!audioRef.current){
      return;
    }

    if (isPlaying){
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }


  }, [isPlaying])

  const episode = episodeList[currentEpisodeIndex]

  return(
    <div className = {styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora"/>
        <strong>Tocando agora</strong>
      </header>

      { episode ? 
        (
          <div className={styles.currentEpisode}> 
            <Image 
              width={592}
              height={592} 
              src={episode.thumbnail} 
              objectFit="cover"
            />
            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
          </div>
        ):(
          <div className={styles.emptyPlayer}> 
            <strong>Selecione um podcast para ouvir</strong>
          </div>
        )
      }

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
            <div className={styles.slider}>
              {
                episode ?
                (
                  <Slider
                    trackStyle={{backgroundColor: '#04d361'}}
                    railStyle={{backgroundColor: '#9f75ff'}}
                    handleStyle={{borderColor: '#04d361', borderWidth: 4}}
                  />
                ):(
                  <div className={styles.emptySlider}/>
                ) 
              }
            </div>
          <span>00:00</span>
        </div>

        {episode && (
          <audio 
            src={episode.url}
            ref={audioRef}
            autoPlay
            loop={isLooping}
            onPlay={()=> {setPlayingState(true)}}
            onPause={()=> {setPlayingState(false)}}
           />
        )}

        <div className={styles.buttons}>
          <button
           type="button"
           onClick={toogleShuffle}
           disabled={!episode || episodeList.length === 1}
           className={isShuffling ? styles.isActive : ''}
          >
            <img src="/shuffle.svg" alt="Embaralhar"/>
          </button>
          <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
            <img src="/play-previous.svg" alt="Tocar anterior"/>
          </button>
          <button
            type="button"
            onClick={tooglePlay} 
            className={styles.playButton}
            disabled={!episode}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Tocar"/>
            ):(
              <img src="/play.svg" alt="Tocar"/>
            )}
          
          </button>
          <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
            <img src="/play-next.svg" alt="Tocar pr??xima" />
          </button>
          <button 
            type="button"
            onClick={toogleLoop}
            disabled={!episode}
            className={isLooping ? styles.isActive : ''}
          >
            <img src="/repeat.svg" alt="Repetir"/>
          </button>
        </div>
      </footer>
    </div>
  )
}