import axios, { create } from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDom, { createPortal } from "react-dom";
import withReactContent from "sweetalert2-react-content";
import { Animated } from "react-animated-css";
import "./global.css";
import dl from './dl.svg';
import { useState, useEffect, useRef } from "react";
import { Portal } from "react-portal";
import play from "./play.svg";
import addtol from "./addtol.svg";
import muted from "./muted.svg";
import sound from "./sound.svg";
import audio from './audio.svg'
import like from "./like.svg";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import LazyLoad from "react-lazy-load";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import fourk from "./quality/no.svg";
// import "react-toastify/dist/ReactToastify.css";

const root = ReactDom.createRoot(document.getElementById("root"));

let homepage = [];
const maxWidthVideo = "800;";
let random = {};

async function Tasks() {
  let tasks = (await axios.get("http://localhost/api/tasks")).data.data;
}

const HandLeError = function (typeError, type) {
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
};
const loadHomepage = function () {
  return new Promise((r, j) => {
    axios
      .get("http://localhost:80/api/homepage")
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
async function loadItem(item_uuid) {
    console.log(("fetching item"))
  var res = await axios
    .get("http://localhost/api/library/item?itemuuid=" + item_uuid)
    .catch((e) => HandLeError(e, "item"));
  return res.data.data;
}
async function loadRandom() {
  var res = await axios
    .get("http://localhost/api/library/random")
    .catch((e) => HandLeError(e, "random"));
  return res.data.data;
}

async function Main() {
  await Tasks();
  await loadHomepage();
  random = await loadRandom();
}

// console.log(DisplayAllAffice())

function BuilDHomePage() {
  var MostViewedCatMovie = homepage.arrayofMostf;
  var MostViewedCatSeries = homepage.arrayofMosts;
  const [modalInfo, setModalInfo] = useState({ open: false, data: null });
  const [lier, setlier] = useState({ open: false, data: null });

  return (
    <div>
      <Modal
          link={{lier, setlier}}
          info={modalInfo}></Modal>
      <DisplayAllAffice
          link={{ lier, setlier }}

        modalSetData={{ modalInfo, setModalInfo }}
      ></DisplayAllAffice>
      <br />
      <GetSlide
          link={{ lier, setlier }}
        Data={homepage.recents}
        modalSetData={{ modalInfo, setModalInfo }}
        key={homepage.recents.length}
        Raison="Recents"
      ></GetSlide>
      {MostViewedCatMovie.map((e) => {
        return (
          <GetSlide
              link={{ lier, setlier }}
            modalSetData={{ modalInfo, setModalInfo }}
            Data={e.data}
            key={e.id}
            Raison={e.id}
          ></GetSlide>
        );
      })}
      {MostViewedCatSeries.map((e) => {
        return (
          <GetSlide
              link={{ lier, setlier }}
            modalSetData={{ modalInfo, setModalInfo }}
            Data={e.data}
            Raison={e.id}
          ></GetSlide>
        );
      })}
    </div>
  );
}

function DisplayAllAffice(args) {

  var item = random;
  var modaldata = args.modalSetData;
  var link = args.link;
  return (
    <div>
      <div style={{ display: "inline-block", height: "70vh", width: "26%" }}>
        <span
          className="cent"
          style={{
            fontSize: "40px",
            verticalAlign: "middle",
            fontWeight: "bold",
          }}
        >
          {get().Name(item)}
          <span></span>
        </span>
        <br />
        <span
          className="cent"
          style={{ position: "relative", top: "24%", left: "5%" }}
        >
          {get().Overview(item)}
        </span>
        <br />
        <br />
        <span className="cent">
          <br />
          <br />
          <br />
          <button
            className="centka"
            onClick={async () => {
              if (modaldata.modalInfo.open) {
                modaldata.setModalInfo({ open: false, data: null });
              } else {
                modaldata.setModalInfo({ open: true, data: await loadItem(item.uuid) });

                document.addEventListener(
                  "scroll",
                  function scrollHandlerevent(e) {
                    document.removeEventListener("scroll", scrollHandlerevent);

                    modaldata.setModalInfo({ open: false, data: null });
                  }
                );
              }
            }}
          >
            Voir Plus
          </button>
        </span>
      </div>
      <div
        className="img-first"
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "linear-gradient(to left, rgba(255, 255, 255, 0) 70%, rgb(0, 0, 0) 100%),  url(https://www.themoviedb.org/t/p/original/" +
            item.Parsed.backdrop_path +
            ")",
          display: "inline-block",
          width: "74%",
          height: "70vh",
          float: "right",
        }}
      ></div>
    </div>
  );
}

const get = function () {
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
      return  element.Parsed.overview;
    },
    Minia: {
      b: (element) => {
        return "http://localhost/minia/" + element.uuid + "/b";
      },
      p: (element) => {
        return "http://localhost/minia/" + element.uuid + "/p";
      },
    },
    Video: function (element) {
      return (
        "http://localhost/api/library/ba.mp4?mediauuid=" + element.uuid + "#t=6"
      );
    },
  };
};

// console.log((document.body

function App() {


  return <BuilDHomePage></BuilDHomePage>;
}

const Modal = function (data) {
  const soundElement = useRef();
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
        className="animate__fadeInUp"
        style={{
          "animation-duration": "0.4s",

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
          <ArrierePlanFlou/>
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
            src={"http://localhost/api/library/ba.mp4?mediauuid=" + info.uuid}
          />
          {/*<source src="/api/library/ba.mp4?mediauuid=e03c39ac-5bbe-41cd-91fb-c9c85c86c629#t=6">*/}
        </video>

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
              element: data.info.data,
              videoElement,
              soundElement,
              funcHand,
            }}
          />
        </div>
          <GenIcons data={data.info.data}/>
          <div>
          <h5 style={{fontSize : "16px", position : "relative", top : "-145px", marginLeft : "10px", marginRight : "10px"}}>{get().Overview(data.info.data)}</h5>
      </div>
      </div>,

      document.body
    );

  } else {
    return <div></div>;
  }
};
// --animate-delay: 1s;
// --animate-repeat: 1;
// color: #e5e5e5;
// user-select: none;
// --animate-duration: 0.4s;
// background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 20%, #181818 100%);
// height: 150px;
// position: relative;
// width: var(--largeur-video);
// top: -150px;*






const ArrierePlanFlou = function ()
{
    return createPortal(<div  style={{position : "absolute", top : window.scrollY +  "px", height : "100%", width : "100%", left : "0px", backgroundColor : "rgba(0, 0, 0, 0.7)", zIndex : 3}}></div>, document.body)
}

const GenIcons = function (v) {
    const data = v.data;
    const Match = "54";
    return (<div>
        <span style={{fontWeight : 800, position : "relative", left : "10px", fontFamily : "'Roboto', sans-serif", color : "#46d369", top : "-155px", zIndex : 4}}>{Match}% Match</span>
        <span style={{fontFamily : "'Roboto', sans-serif", position : "relative", top : "-155px", left : "18px", fontWeight : 1000 , zIndex : 4}}>2019</span>
        <span style={{ fontWeight : 1000, color : "white", left : "25px", top : "-155px", position : "relative", zIndex : 4,  fontFamily : "'Roboto', sans-serif"}}><img alt="failed load img" style={{height : "25px", verticalAlign : "-7px"}} src={fourk} /></span>
        <span style={{position : "relative", top : "-155px", left : '32px', fontWeight : 1000, color : "white", fontFamily :  "'Roboto', sans-serif", border : "solid 1px color", backgroundColor : "red", borderRadius : "5px", padding : "4px", zIndex : 4}}>+ 17</span>
        <span style={{position : "relative", top : "-155px", left : "40px", fontWeight : 1000, color : "white", fontFamily : "'Roboto', sans-serif", zIndex : 4}}>1h 30min</span>
        <span onMouseOver={(e) => { console.log(data.ffprobe)}} style={{position : "relative", top : "-155px", left : "50px", fontWeight : 1000, color : "white", fontFamily : "'Roboto', sans-serif", zIndex : 4}}><img alt="image not loaded" style={{ height : "25px", verticalAlign : "top"}} src={audio}/></span>
        <span style={{position : "relative", top : "-155px", left : "60px", color : "white", fontFamily : "'Roboto', sans-serif", zIndex : 4}} onClick={(e) => { download(data) }}><img style={{height : "22px"}} src={dl}/></span>



    </div>);

}
const OverPlayer = function (data) {
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
        {get().Name(element).length > 20 ? get().Name(element).substr(0, 17) + "..." : get().Name(element)}
      </h5>
      <button
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

const GetSlide = (data) => {
  // console.log((data))


  var ElementArray = data.Data;

  var Raison = "Pas de raison";
  var link = data.link;
  const modalData = data.modalSetData.modalInfo;
  const setModalData = data.modalSetData.setModalInfo;

  return (
    <div>
      <span className="Raison-swiper">{Raison} : </span>

      <br />
      <Swiper
        spaceBetween={15}
        slidesPerView={6}
        onSlideChange={() => {}}
        breakpoints={{
          O: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 5,
            centeredSlides: false,
          },
          600: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 5,
            centeredSlides: false,
          },
          900: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 5,
            centeredSlides: false,
          },
          1200: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 5,
            centeredSlides: false,
          },
          1500: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 5,
            centeredSlides: false,
          },
          1800: {
            slidesPerView: 6,
            slidesPerGroup: 6,
            spaceBetween: 5,
            centeredSlides: false,
          },
        }}
      >
        {ElementArray.map((element) => {
          return (
            <SwiperSlide key={element.uuid} onClick={(e) => {}}>
              <div
                style={{ textAlign: "center" }}
                className="contener-data"
                key={element.uuid + "_div"}
                onClick={(e) => {
                  // setModalInfo(true, "data",
                  //"dat");
                  console.log(modalData);
                  if (modalData.open) {
                    setModalData({ open: false, data: null });
                  }
                  setTimeout(async  () => {
                    setModalData({
                      open: true,
                      data: await loadItem(element.uuid),
                      onscroll: async (e) => {
                        console.log("scroll");
                        setModalData({ open: false, data: null  });
                      },
                    });
                  }, 50);

                  console.log("adding scroll event body");
                  document.addEventListener(
                    "scroll",
                    function scrollHandlerevent(e) {
                      console.log("body scrolled removing modal");
                      document.removeEventListener(
                        "scroll",
                        scrollHandlerevent
                      );

                      setModalData({ open: false, data: null });
                    }
                  );

                  console.log("react clicked component");
                }}
              >
                <LazyLoad>
                  <img
                    alt={get().Name(element)}
                    onError={(e) => {
                      HandLeError(e, "image");
                    }}
                    key={element.uuid + "_img"}
                    className="contener-data-img"
                    mediauuid={element.uuid}
                    src={get().Minia.b(element)}
                  />
                </LazyLoad>
                <span className="contener-data-title">
                  {" "}
                  {get().Name(element)}
                </span>{" "}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

// class BuildModalInfo extends React.Component{
//    constructor() {
//        super();
//        this.state = true;
//
//    }
//    render()
//    {
//        if(this.state === true) {
//
//            return ReactDom.createPortal(<div>
//                <a style={{"font-size": "40px", "color": "red"}}  target="_blank" href="https://kosmix.fr/index.html">Aller Sur le site de kosmix</a>
//            </div>, document.getElementById(("root")));
//        }
//    }
//
//
// }



function  download(item)
{
    console.log("Downloading item", item);
    return document.location.href = 'http://localhost/api/download?itemuuid='+item.uuid;
}

async function lier(itemuuid, type){




}





Main().then(() => {


  root.render(
    <div>
      <BuilDHomePage />
    </div>
  );
});
