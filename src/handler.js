import { createPortal } from "react-dom";
import React from "react";
import { handleMouseMove, download, OpenPlayer } from "./util";
import {} from "./index";

export function RenderRightClick(data) {
  // {getRIght event}
  const event = data.data.event;
  const player = data.player;
  let right = data.set;
  const element = data.data.data;

  const open = data.data.open;
  if (open === false) {
    console.log("Not open returning");
    return <div></div>;
  }

  console.log("rendering right click", data);
  console.log(handleMouseMove(event).x, handleMouseMove(event).y);

  const styleDif = {
    weight: "100%",
    height: "14%",
    // verticalAlign : "",
    // textAlign : "center",
    // marginTop : "10px",
    lineHeight: "1em",
  };

  // document.body.addEventListener("click", function bodyclickhandler(e) {
  //
  //
  //     console.log((e))
  //     console.log('body clicked');
  //     console.log(data);
  //     right({open: false, data: null, event: null});
  //     document.body.removeEventListener("click", bodyclickhandler);
  //
  // })
  setTimeout(() => {
    right({ open: false, data: null, event: null });
  }, 1000);

  return createPortal(
    <div
      onClick={(e) => {
        // console.log((event), right);
        console.log("right clicked element");
      }}
      className="animate__animated animate__zoomIn"
      style={{
        borderRadius: "5px",
        "animation-duration": "0.2s",
        backgroundColor: "rgb(40, 40, 43)",
        height: "140px",
        width: "200px",
        position: "absolute",
        top: handleMouseMove(event).y + "px",
        left: handleMouseMove(event).x + "px",
        zIndex: 5,
      }}
    >
      <table style={{ width: "100%", height: "100%" }}>
        <tbody>
          <tr
            style={styleDif}
            onClick={(e) => {
              console.log(("Opening media", element));
              right({ open: false, data: null, event: null });

              // player={{modalPlayer, setmodalPlayer}}

              OpenPlayer(element);
            }}
          >
            Lire
          </tr>
          <tr
            style={styleDif}
            onClick={(e) => {
              download(element);
            }}
          >
            Telecharger
          </tr>
          <tr style={styleDif}>Convertir</tr>
          <tr style={styleDif}>Associer</tr>
          <tr style={styleDif}>Bouger</tr>
        </tbody>
      </table>
    </div>,

    document.body
  );

  // return <div>cocasse</div>
}
