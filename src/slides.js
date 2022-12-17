import { Swiper, SwiperSlide } from "swiper/react";
import LazyLoad from "react-lazy-load";
import React from "react";
import { get, HandLeError, loadItem } from "./util";

export function GetSlide(data) {
  // console.log((data))
  // player={{modalPlayer, setmodalPlayer}}
  var ElementArray = data.Data;
  var player = data.player;
  var Raison = "Pas de raison";
  var link = data.link;
  const modalData = data.modalSetData.modalInfo;
  const setModalData = data.modalSetData.setModalInfo;
  const rightclick = data.rightclick;

  return (
    <div>
      <span className="Raison-swiper">{Raison} : </span>

      <br />
      <Swiper
        spaceBetween={15}

        slidesPerView={6}

        onSlideChange={() => {}}
        breakpoints={{
          0: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 5,
            centeredSlides: false,
          },
          600: {
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
                onContextMenu={(e) => {
                  e.preventDefault();
                  rightclick.setrightclick({
                    open: false,
                    data: null,
                    event: null,
                  });
                  setTimeout(() => {
                    rightclick.setrightclick({
                      open: true,
                      data: element,
                      event: e,
                    });
                  }, 0);
                }}
                onClick={(e) => {
                  // setModalInfo(true, "data",
                  //"dat");
                  console.log(modalData);
                  if (modalData.open) {
                    setModalData({ open: false, data: null });
                  }
                  setTimeout(async () => {
                    setModalData({
                      open: true,
                      data: await loadItem(element.uuid),
                      onscroll: async (e) => {
                        console.log("scroll");
                        setModalData({ open: false, data: null });
                      },
                    });
                  }, 0);

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
}
