import React, { useState, useRef, useEffect} from "react";
import Songs from "./Songs";
import "../index.css";

const MusicPlayer = () => {

  const [songs, setSongs] = useState([]);
  const [id, setId] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    getSongs();
  }, [])
  
  const getSongs = async () => {
    try {
      const response = await fetch('https://assets.breatheco.de/apis/sound/songs');      
      // console.log(response);
      if(response.ok) {
        const data = await response.json();
        setSongs(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  
  
  
  
  
  let refAudio = useRef();

  const pause = () => {
    refAudio.current.pause();
    setIsPaused(true);
  };

  const play = () => {
    refAudio.current.play();
    setIsPaused(true);
  };

  const rewind = () => {
    if (id > 0 && id <= songs.length) {
      setCurrentSong(
        `https://assets.breatheco.de/apis/sound/${songs[id - 1].url}`
      );
      setId(id - 1);
      setIsPaused(false);
    } else {
      pause();
      setCurrentSong("#");
      setId(null);
    }
  };

  const forward = () => {
    if (id < songs.length - 1) {
      console.log(id + 1);
      setCurrentSong(
        `https://assets.breatheco.de/apis/sound/${songs[id + 1].url}`
      );
      setId(id + 1);
      setIsPaused(false);
    } else {
      pause();
      setId(0);
      setCurrentSong("#");
    }
  };

  return (
    <>
      <audio src={currentSong} ref={refAudio} autoPlay></audio>
      <div className="container">
        <div className="content">
          <div className="head">
            <ul className="list">
              {songs.map((value, i) => {
                return (
                  <li
                    className="item"
                    key={value.id}
                    onClick={(e) => {
                      console.log(isPaused);
                      setCurrentSong(
                        `https://assets.breatheco.de/apis/sound/${value.url}`
                      );
                      setId(i);
                      setIsPaused(false);
                    }}
                  >
                    {value.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="body">
            <button onClick={rewind} className="btn-rf">
              {" "}
              R{" "}
            </button>
            {isPaused ? (
              <button onClick={play} className="btn">
                {" "}
                |>{" "}
              </button>
            ) : (
              <button onClick={pause} className="btn">
                ||
              </button>
            )}

            <button onClick={forward} className="btn-rf">
              {" "}
              |>|>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default MusicPlayer;
