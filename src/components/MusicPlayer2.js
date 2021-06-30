import React, { useState, useRef, useEffect } from "react";
import Songs from "./Songs";

function MusicPlayer2() {
  const [songs, setSongs] = useState([]);
  const [id, setId] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);
 

  useEffect(() => {
    getSongs('https://assets.breatheco.de/apis/sound/songs');
  }, []);

  const getSongs = async (url) => {
    try {
      const response = await fetch(url);
     
      if (response.ok) {
        const data = await response.json();
        setSongs(data);
        console.log(data)
        
     
      }
    } catch (err) {
      console.log(err);
    }
  };

  let refAudio = useRef();

  const pause = () => {
    refAudio.current.pause();
    setIsPaused(true);
  };

  const play = () => {
    refAudio.current.play();
    setIsPaused(false);
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

      <div className="container my-5 bg-dark py-5 rounded border border-warning border-4">
        <h1 className="text-center">Music Player</h1>
        {

        }
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <ul className="list-group">
              {songs.map((value, i) => {
                  return(
                <li
                  className={"list-group-item list-group-item-action" + (i + 1 === value.id ? "active" : "" )}
                  key={value.id+value.name}
                  onClick={(e) => {
                    setCurrentSong(
                      `https://assets.breatheco.de/apis/sound/${value.url}`
                    );
                    setId(i);
                    console.log(value)
                    
                    setIsPaused(false);
                    console.log(i)
                  }}
                >
                  {value.name}
                </li>
                );
              })}
            </ul>
          </div>
          <div className="row">
            <div className="col-md-6 offset-md-3 d-flex justify-content-center py-3">
              <div className="button-group d-flex ">
                <button className="btn btn-danger mx-1" onClick={rewind}>
                  bw
                </button>

                {isPaused ? (
                  <button className="btn btn-success mx-1" onClick={play}>
                    py
                  </button>
                ) : (
                  <button className="btn btn-danger mx-1" onClick={pause}>
                    Pd
                  </button>
                )}
                <button className="btn btn-danger mx-1" onClick={forward}>fw</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer2;
