import fourk from "./quality/no.svg";
import audio from "./svg/audio.svg";
import { download, get, OpenPlayer, ArrierePlanFlou } from "./util";
import dl from "./svg/dl.svg";
import React, { useRef } from "react";
import play from "./svg/play.svg";
import addtol from "./svg/addtol.svg";
import like from "./svg/like.svg";
import muted from "./svg/muted.svg";
import sound from "./svg/sound.svg";
import { createPortal } from "react-dom";
import closeModal from "./svg/cameback.svg";

const GenIcons = function (v) {
  const data = v.data;
  const Match = "54";
  return (
    <div>
      <span
        style={{
          fontWeight: 800,
          position: "relative",
          left: "10px",
          fontFamily: "'Roboto', sans-serif",
          color: "#46d369",
          top: "-155px",
          zIndex: 4,
        }}
      >
        {Match}% Match
      </span>
      <span
        style={{
          fontFamily: "'Roboto', sans-serif",
          position: "relative",
          top: "-155px",
          left: "18px",
          fontWeight: 1000,
          zIndex: 4,
        }}
      >
        2019
      </span>
      <span
        style={{
          fontWeight: 1000,
          color: "white",
          left: "25px",
          top: "-155px",
          position: "relative",
          zIndex: 4,
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <img
          alt="failed load img"
          style={{ height: "25px", verticalAlign: "-7px" }}
          src={fourk}
        />
      </span>
      <span
        style={{
          position: "relative",
          top: "-155px",
          left: "32px",
          fontWeight: 1000,
          color: "white",
          fontFamily: "'Roboto', sans-serif",
          border: "solid 1px color",
          backgroundColor: "red",
          borderRadius: "5px",
          padding: "4px",
          zIndex: 4,
        }}
      >
        + 17
      </span>
      <span
        style={{
          position: "relative",
          top: "-155px",
          left: "40px",
          fontWeight: 1000,
          color: "white",
          fontFamily: "'Roboto', sans-serif",
          zIndex: 4,
        }}
      >
        1h 30min
      </span>
      <span
        onMouseOver={(e) => {
          console.log(data.ffprobe);
        }}
        style={{
          position: "relative",
          top: "-155px",
          left: "50px",
          fontWeight: 1000,
          color: "white",
          fontFamily: "'Roboto', sans-serif",
          zIndex: 4,
        }}
      >
        <img
          alt="image not loaded"
          style={{ height: "25px", verticalAlign: "top" }}
          src={audio}
        />
      </span>
      <span
        style={{
          position: "relative",
          top: "-155px",
          left: "60px",
          color: "white",
          fontFamily: "'Roboto', sans-serif",
          zIndex: 4,
        }}
        onClick={(e) => {
          download(data);
        }}
      >
        <img style={{ height: "22px" }} src={dl} />
      </span>
    </div>
  );
};

const OverPlayer = function (data) {
    console.log(data);
    const nplayer = data.data.modalPlayer;
    const setnplayer = data.data.setmodalplayer;
  const element = data.data.element;
  const videoEl = data.data.videoElement;
  const soundEl = data.data.soundElement;
  const handeleImg = data.data.funcHand;
  return (
    <div>
      <h5
        style={{
          position: "relative",
          top: "30px",
          left: "20px",
          fontWeight: "800",
          fontFamily: "'Roboto', sans-serif",
          fontSize: "30px",
        }}
      >
        {get().Name(element).length > 20
          ? get().Name(element).substr(0, 17) + "..."
          : get().Name(element)}
      </h5>
      <button
        onClick={(e) => {
          console.log(("opening player"))
            setnplayer({ open : true, data : element})

        }}
        style={{
          position: "relative",
          top: "40px",
          left: "20px",
          backgroundColor: "white",
          border: "none",
          borderRadius: "4px",
          width: "110px",
          height: "42px",
          fontWeight: "800",
          fontFamily: "'Roboto', sans-serif",
          fontSize: "16px",
        }}
      >
        <img
          alt="img not found"
          style={{ verticalAlign: "middle", width: "24px", height: "24px" }}
          src={play}
        />
        Play
      </button>

      <button
        style={{
          position: "relative",
          top: "40px",
          left: "18px",
          border: "none",
          borderRadius: "4px",
          background: "transparent",
        }}
      >
        <img style={{ height: "40px" }} alt="failed load image" src={addtol} />
      </button>
      <button
        style={{
          border: "none",
          position: "relative",
          top: "40px",
          left: "14px",
          background: "transparent",
          borderRadius: "4px",
        }}
      >
        <img style={{ height: "40px" }} src={like} />
      </button>

      <button
        style={{
          border: "none",
          background: "transparent",
          position: "relative",

          top: "40px",
          left: "425px",
        }}
        onClick={handeleImg}
      >
        <img ref={soundEl} style={{ height: "40px" }} src={muted} />
      </button>
    </div>
  );
};

export function Modal(data) {
    const nplayer = data.openp.modalPlayer;
    const setnplayer = data.openp.setmodalPlayer;
  const soundElement = useRef();
  const minfo = data.setinfo;
  const portalref = useRef();
  const link = data.link;
  const videoElement = useRef();
  const funcHand = () => {
    if (videoElement.current.muted == true) {
      soundElement.current.src = sound;
      videoElement.current.muted = false;
    } else {
      soundElement.current.src = muted;
      videoElement.current.muted = true;
    }
  };
  if (data.info.open) {
    var minWidth = 700;
    var maxWidth = 725;
    // setImmediate(async  () => {
    //
    //
    //
    // });
    //

    const getWidth = () =>
      window.innerWidth / 2 > minWidth
        ? window.innerWidth / 2 > 900
          ? maxWidth
          : window.innerWidth / 2
        : minWidth;
    const getHeight = () => window.innerHeight / 1.2;

    var info = data.info.data;
    return createPortal(
      <div
        ref={portalref}
        className="animate__fadeInUp"
        style={{
          "animation-duration": "0.3s",

          zIndex: 4,
          position: "absolute",
          borderRadius: "10px",

          height: getHeight() + "px",
          width: getWidth() + "px",
          top: window.scrollY + getHeight() / 8 + "px",
          left:
            window.scrollX + (window.innerWidth / 2 - getHeight() / 2) + "px",
          backgroundColor: "rgb(24, 24, 24)",
        }}
      >
        <ArrierePlanFlou />

        <video
          ref={videoElement}
          style={{
            width: getWidth() + "px",
            height: getHeight() / 2 + "px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            display: "block",
            objectFit: "contain",
          }}
          onError={(e) => {
            console.log("Failed to load video", e.target.src);
          }}
          autoPlay={true}
          loop={true}
          muted={true}
        >

          <source
            src={
              "http://192.168.0.22/api/library/ba.mp4?mediauuid=" + info.uuid
            }
          />
          {/*<source src="/api/library/ba.mp4?mediauuid=e03c39ac-5bbe-41cd-91fb-c9c85c86c629#t=6">*/}
        </video>
          <span
              onClick={(e) => {
                  // minfo.setModalInfo({ open: false, data: null });

                  portalref.current.classList.remove("animate__fadeInUp");
                  portalref.current.style.setProperty("--animation-duration", "0.2s");
                  portalref.current.classList.add("animate__backOutDown");
                  setTimeout(() => {
                      minfo.setModalInfo({ open: false, data: null });
                  }, 199);
              }}
              style={{ position: "relative", top: "-355px", left: "660px" }}
          >
          <img style={{ height: "40px" }} src={closeModal} />
        </span>


        <div
          style={{
            zIndex: 2,
            background: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #181818 100%)`,
            // backgroundColor : "red",
            height: "150px",
            position: "relative",
            width: getWidth() + "px",
            top: "-147px",
          }}
        >
          <OverPlayer
            data={{
                modalPlayer : nplayer,
                setmodalplayer : setnplayer,
              element: data.info.data,
              videoElement,
              soundElement,
              funcHand,
            }}
          />
        </div>
        <GenIcons data={data.info.data} />
        <div>
          <h5
            style={{
              fontSize: "16px",
              position: "relative",
              top: "-145px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            {get().Overview(data.info.data)}
          </h5>
        </div>
      </div>,

      document.body
    );
  } else {
    return <div></div>;
  }
}
