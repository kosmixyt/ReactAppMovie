import axios, { create } from "axios";
import { BuilDHomePage, DisplayAllAffice } from "./homepage";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { GetSlide } from "./slides";
import { RenderRightClick } from "./handler";
import ReactDom, { createPortal } from "react-dom";
import withReactContent from "sweetalert2-react-content";
import { Animated } from "react-animated-css";
import "./css/global.css";
import dl from "./svg/dl.svg";
import { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import { Portal } from "react-portal";
import play from "./svg/play.svg";
import addtol from "./svg/addtol.svg";
import muted from "./svg/muted.svg";
import closeModal from "./svg/cameback.svg";
import sound from "./svg/sound.svg";
import audio from "./svg/audio.svg";
import like from "./svg/like.svg";
import "animate.css";
import { get, HandLeError, loadRandom, loadItem } from "./util";
import { useDispatch, useSelector } from "react-redux";
import LazyLoad from "react-lazy-load";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import fourk from "./quality/no.svg";
import { download, OpenPlayer } from "./util";
import portal from "react-portal/lib/Portal";
// import "react-toastify/dist/ReactToastify.css";

const root = ReactDom.createRoot(document.getElementById("root"));

export let homepage = [];
export const maxWidthVideo = "800;";
export let isPlaying = false;
export let random = {};

async function Tasks() {
  let tasks = (await axios.get("http://192.168.0.22/api/tasks")).data.data;
}

const loadHomepage = function () {
  return new Promise((r, j) => {
    axios
      .get("http://192.168.0.22/api/homepage")
      .then((res) => {
        homepage = res.data.data;
        console.log("SuccessFully Loaded Homepage");
        r();
      })
      .catch((e) => {
        HandLeError(e, "homepage");
        r();
      });
  });
};

async function Main() {
  await Tasks();
  await loadHomepage();
  random = await loadRandom();
}

function App() {
  return <BuilDHomePage></BuilDHomePage>;
}

async function lier(itemuuid, type) {}

Main().then(() => {
  root.render(
    <div>
      <BuilDHomePage />
    </div>
  );
});
