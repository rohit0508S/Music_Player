import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import SongCard from "../../components/songCard";
import Queue from "../../components/queue";
import AudioPLayer from "../../components/audioPlayer";
import Widgets from "../../components/widgets";

export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
        });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  // const [audioFile, setAudioFile] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setAudioFile(file);

  //   localStorage.setItem("audioFile", URL.createObjectURL(file));
  // };

  // const handlePlay = () => {
  //   const audioPlayer = document.getElementById("audioPlayer");
  //   audioPlayer.play();
  // };

  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        <AudioPLayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <Widgets artistID={currentTrack?.album?.artists[0]?.id} />







      </div>
      <div className="right-player-body">
        <SongCard album={currentTrack?.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />



      </div>
      {/* <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handlePlay} disabled={!audioFile}>Play</button>
      {audioFile && (
        <audio id="audioPlayer" controls>
          <source src={localStorage.getItem('audioFile')} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )} */}



    </div>
  );
}
