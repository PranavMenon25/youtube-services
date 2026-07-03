"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Room = () => {
  const [userStream, setUserStream] = useState();

  const streamUser = async() => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setUserStream(stream);
  }

  return (
    <div>
      <button onClick={streamUser}>Stream</button>

      <ReactPlayer
        src={userStream}
        controls={true}
        height="720px"
        width="1080px"
      />
    </div>
  );
};

export default Room;
