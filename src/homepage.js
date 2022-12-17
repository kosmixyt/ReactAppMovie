import React, { useEffect, useState } from "react";
import { RenderRightClick } from "./handler";
import { GetSlide } from "./slides";
import { Modal } from "./modal";
import { get, loadRandom, loadItem, download, loadSearch } from "./util";
import { isPlaying, homepage, random, maxWidthVideo } from "./index";
import {Player} from './player'
import {Search} from './search';

export function BuilDHomePage() {
  var MostViewedCatMovie = homepage.arrayofMostf;
  var MostViewedCatSeries = homepage.arrayofMosts;
  const [modalInfo, setModalInfo] = useState({ open: false, data: null });
  const [lier, setlier] = useState({ open: false, data: null });
  const [splayer, setplayer] = useState({open :false, data : null})
  const [rightclick, setrightclick] = useState({
    open: false,
    data: null,
    event: null,
  });
  const [modalPlayer, setmodalPlayer] = useState({ open: false, data: null });

  console.log(("Building homepage"))
  return (
    <div>
      <TopLevel arg={{modalInfo, setModalInfo}} />
        <Player arg={{modalPlayer, setmodalPlayer}} />

      <RenderRightClick
        player={{ modalPlayer, setmodalPlayer }}
        data={rightclick}
        set={setrightclick}
      />

      <Modal
          openp={{modalPlayer, setmodalPlayer}}
        rightclick={{ rightclick, setrightclick }}
        setinfo={{ modalInfo, setModalInfo }}
        link={{ lier, setlier }}
        info={modalInfo}
        player={{ modalPlayer, setmodalPlayer }}
      ></Modal>
      <DisplayAllAffice
        link={{ lier, setlier }}
        modalSetData={{ modalInfo, setModalInfo }}
        rightclick={{ rightclick, setrightclick }}
        player={{ modalPlayer, setmodalPlayer }}
      ></DisplayAllAffice>
      <br />
      <GetSlide
        link={{ lier, setlier }}
        Data={homepage.recents}
        modalSetData={{ modalInfo, setModalInfo }}
        rightclick={{ rightclick, setrightclick }}
        player={{ modalPlayer, setmodalPlayer }}
        key={homepage.recents.length}
        Raison="Recents"
      ></GetSlide>
      {MostViewedCatMovie.map((e) => {
        return (
          <GetSlide
            link={{ lier, setlier }}
            modalSetData={{ modalInfo, setModalInfo }}
            rightclick={{ rightclick, setrightclick }}
            player={{ modalPlayer, setmodalPlayer }}
            Data={e.data}
            key={e.id}
            Raison={e.id}
            ge
          ></GetSlide>
        );
      })}
      {MostViewedCatSeries.map((e) => {
        return (
          <GetSlide
            link={{ lier, setlier }}
            modalSetData={{ modalInfo, setModalInfo }}
            player={{ modalPlayer, setmodalPlayer }}
            Data={e.data}
            Raison={e.id}
          ></GetSlide>
        );
      })}
    </div>
  );
}

export function DisplayAllAffice(args) {
    console.log("Rendering affiche")
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

          {window.innerWidth > 1100 ? <span
          className="cent"
          style={{ position: "relative", top: "24%", left: "5%", maxHeight : "400px" }}
        >
          {get().Overview(item)}
        </span> : ""}
        <br />
        <br />
        <span className="cent">
          <br />
          <br />
          <br />
          <button
            className="centka"
            style={{
              position: "relative",
              top: "-30px",
              marginLeft: "10px",
              border: "1px solid red",
              backgroundColor: "white",
              fontWeight: 1000,
              borderRadius: "10px",
              height: "40px",
              width: "100px",
              color: "black",
              transition: "transform 0.4s",
            }}
            onClick={async () => {
              if (modaldata.modalInfo.open) {
                modaldata.setModalInfo({ open: false, data: null });
              } else {
                modaldata.setModalInfo({
                  open: true,
                  data: await loadItem(item.uuid),
                });

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

function TopLevel(arg) {
  const [search, setsearch] = useState({ input: "", data: null });

  // const [modalInfo, setModalInfo] = arg;
  return (
    <div style={{ lineHeight: "27px" }}>
      <Search arg={{search, setsearch, arg }} />
      <br />

      <hr />
    </div>
  );
}


