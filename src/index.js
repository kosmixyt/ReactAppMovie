import axios, { create } from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDom, { createPortal } from "react-dom";
import withReactContent from "sweetalert2-react-content";
import { Animated } from "react-animated-css";
import "./global.css";
import { useState, useEffect, useRef } from "react";
import { Portal } from "react-portal";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import LazyLoad from "react-lazy-load";
import React from "react";
import iziToast from "izitoast";

const root = ReactDom.createRoot(document.getElementById("root"));
console.log(document.getElementById("root"));

let homepage = [];
const maxWidthVideo = "800;";
let random = {};

async function Tasks() {
  let tasks = (await axios.get("http://localhost/api/tasks")).data.data;
  console.log(tasks);
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
        console.log(homepage);
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
  console.log(homepage);
}

// console.log(DisplayAllAffice())

function BuilDHomePage() {
  var MostViewedCatMovie = homepage.arrayofMostf;
  var MostViewedCatSeries = homepage.arrayofMosts;
  const [modalInfo, setModalInfo] = useState({ open: false, data: null });

  return (
    <div>
      <Modal info={modalInfo}></Modal>
      <DisplayAllAffice
        modalSetData={{ modalInfo, setModalInfo }}
      ></DisplayAllAffice>
      <br />
      <GetSlide
        Data={homepage.recents}
        modalSetData={{ modalInfo, setModalInfo }}
        Raison="Recents"
      ></GetSlide>
      {MostViewedCatMovie.map((e) => {
        return (
          <GetSlide
            modalSetData={{ modalInfo, setModalInfo }}
            key={e.id}
            Data={e.data}
            Raison={e.id}
          ></GetSlide>
        );
      })}
      {MostViewedCatSeries.map((e) => {
        return (
          <GetSlide
            modalSetData={{ modalInfo, setModalInfo }}
            key={e.id}
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
          {get().Name(item) + " - Made With React.js"}
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
            onClick={() => {
              if (modaldata.modalInfo.open) {
                modaldata.setModalInfo({ open: false, data: null });
              } else {
                modaldata.setModalInfo({ open: true, data: item });
                document.addEventListener(
                  "scroll",
                  function scrollHandlerevent(e) {
                    console.log("body scrolled removing modal");
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
      return element.Parsed.overview;
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

// console.log((document.body))

function App() {
  return <BuilDHomePage></BuilDHomePage>;
}

const Modal = function (data) {
  // console.log('OPEN MODAL', data);
  if (data.info.open) {
    // console.log("Open modal with data Hauteur : ", document.body.clientHeight + "px", "Largeur : ", document.body.clientWidth + "px", "EXTEND", document.body.clientHeight );

    var minWidth = 700;
    var maxWidth = 800;

    const getWidth = () =>
      window.innerWidth / 2 > minWidth
        ? window.innerWidth / 2 > 900
          ? maxWidth
          : window.innerWidth / 2
        : minWidth;
    const getHeight = () => window.innerHeight / 1.2;

    console.log(getWidth(), getHeight());

    var info = data.info.data;

    return createPortal(
      <div
        className="animate__fadeInUp"
        style={{
          "animation-duration": "0.4s",

          zIndex: 1,
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
        <video
          style={{
            maxWidth: getWidth() + "px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            display: "block",
            objectFit: "contain",
          }}
          autoPlay={true}
          loop={true}
          muted={true}
          onError={(e) => {
            console.log("failed while loading bande annonce");
            console.log(e);
            iziToast.error({
              message: "failed while loading bande annonce",
              title: "error while loading bande annonce",
            });
          }}
        >
          <source
            src={"http://localhost/api/library/ba.mp4?mediauuid=" + info.uuid}
          />
          {/*<source src="/api/library/ba.mp4?mediauuid=e03c39ac-5bbe-41cd-91fb-c9c85c86c629#t=6">*/}
        </video>

          <div style={{ zIndex : 2,
              background : `linear-gradient(to bottom, rgba(255, 255, 255, 0) 70%, #181818 100%)`,
              // backgroundColor : "red",
              height : '150px', position : 'relative', width : getWidth() + "px", top : "-100px"}}>

          </div>

      </div>,

      document.body
    );
  } else {
    console.log("Closing Modal");
    return <div></div>;
  }
};

const GetSlide = (data) => {
  // console.log((data))
  var ElementArray = data.Data;

  var Raison = "Pas de raison";
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
                  setTimeout(() => {
                    setModalData({
                      open: true,
                      data: element,
                      onscroll: (e) => {
                        console.log("scroll");
                        setModalData({ open: false, data: null });
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

Main().then(() => {
  root.render(
    <div>
      <BuilDHomePage />
    </div>
  );
});
