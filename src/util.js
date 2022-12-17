import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import React from "react";
import { createPortal } from "react-dom";
import axios from "axios";

export function get() {
  return {
    Name: (element) => {
      return (
        element.Parsed.title ||
        element.Parsed.name ||
        element.filename ||
        element.original_filename[0]
      );
    },
    Duration: (element) => {
      return element.Parsed.runtime || element.duration;
    },
    Overview: (element) => {
      return element.Parsed.overview;
    },
    Minia: {
      b: (element) => {
        return "http://192.168.0.22/minia/" + element.uuid + "/b";
      },
      p: (element) => {
        return "http://192.168.0.22/minia/" + element.uuid + "/p";
      },
    },
    Video: function (element) {
      return (
        "http://192.168.0.22/api/library/ba.mp4?mediauuid=" +
        element.uuid +
        "#t=6"
      );
    },
  };
}
export function HandLeError(typeError, type) {
  switch (type) {
    case "image":
      typeError.target.src = "/cnc.png";
      typeError.target.onclick = () => {
        console.log("clicked failed to load image");
        withReactContent(Swal)
          .fire({
            title: <h3>Cinéma francais</h3>,
            showDenyButton: true,
            showConfirmButton: true,
            confirmButtonText: "Voir le site",
            denyButtonText: "Non je veux juste voir le média",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              window.open("https://www.cinema-francais.fr/", "_blank");
            } else {
              // setModalInfo(await loadItem(typeError.target.dataset.uuid));
            }
          });
      };
      break;

    // console.log("Error ", typeError);
    default:
      console.log("Error", typeError, type);
  }
}

export function handleMouseMove(event) {
  var dot, eventDoc, doc, body, pageX, pageY;

  event = event || window.event; // IE-ism

  // If pageX/Y aren't available and clientX/Y are,
  // calculate pageX/Y - logic taken from jQuery.
  // (This is to support old IE)
  if (event.pageX == null && event.clientX != null) {
    eventDoc = (event.target && event.target.ownerDocument) || document;
    doc = eventDoc.documentElement;
    body = eventDoc.body;

    event.pageX =
      event.clientX +
      ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
      ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
    event.pageY =
      event.clientY +
      ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
      ((doc && doc.clientTop) || (body && body.clientTop) || 0);
  }

  var mousePos = {
    x: event.pageX,
    y: event.pageY,
  };
  return mousePos;
}
export function download(item) {
  console.log("Downloading item", item);
  return (document.location.href =
    "http://192.168.0.22/api/download?itemuuid=" + item.uuid);
}
export function OpenPlayer(element) {
  if (element.type == "series") {
    console.log("cannot stream serie for the momen");
    return <div></div>;
  }
  return createPortal(
    <iframe
      src={"http://192.168.0.22/stream?itemuuid=" + element.uuid}
    ></iframe>,
    document.body
  );

  console.log("Opening player for element", element);
  document.location.href = "/stream?item=" + element.uuid;
}

export function ArrierePlanFlou() {
  return createPortal(
    <div
      style={{
        position: "absolute",
        top: window.scrollY + "px",
        height: "100%",
        width: "100%",
        left: "0px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 3,
      }}
    ></div>,
    document.body
  );
}

export async function loadItem(item_uuid) {
  console.log("fetching item");
  var res = await axios
    .get("http://192.168.0.22/api/library/item?itemuuid=" + item_uuid)
    .catch((e) => HandLeError(e, "item"));
  return res.data.data;
}
export async function loadRandom() {
  var res = await axios
    .get("http://192.168.0.22/api/library/random")
    .catch((e) => HandLeError(e, "random"));
  return res.data.data;
}

export async function loadSearch(query){
var res = await axios.get("http://192.168.0.22/api/search?q=" + query).catch((e) => HandLeError("search"))
  return res.data.data;

}
