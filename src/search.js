import { get, loadSearch } from "./util";
import React from "react";

export function Search(arg) {
    // console.log(arg.arg.setsearch);
    const args = arg.arg
  return (
    <div>
      <ModalSearch modal={args.arg} search={args.search} setsearch={args.setsearch} />
      <input
        value={args.search.input}
        onInput={async (e) => {
          args.setsearch({ input: e.target.value, data: args.search.data });
          var out = await loadSearch(e.target.value);
          args.setsearch({ input: e.target.value, data: out });
        }}
        type="text"
        placeholder="Search A media Here"
        style={{
          width: "300px",
          marginTop: "10px",
          marginRight: "30px",
          borderRadius: "6px",
          float: "right",
        }}
      />
    </div>
  );
}

function ModalSearch(search) {
  if (!search.search.data) {
    console.log("don't have value for modal , finish");
    return <div></div>;
  }
  const modalm = search.modal.arg;

  return (
    <div
      style={{
        zIndex: 4,
        minHeight: "100px",
        width: "20%",
        minWidth: "300px",
        backgroundColor: "black",
        position: "absolute",
        borderRadius: "10px",
        top: "50px",
        right: "10px",
      }}
    >
      {search.search.data.length !== 0 ? (
        search.search.data.map((e) => {
          return (
            <div
              className="search_prop"
              style={{ marginTop: "1px", borderRadius: "10px" }}
              onClick={(event) => {
                modalm.setModalInfo({ open: false, data: null });

                setTimeout((v) => {
                  modalm.setModalInfo({ open: true, data: e });
                }, 0);
              }}
            >
              <img
                src={"http://192.168.0.22/minia/" + e.uuid + "/p"}
                style={{
                  height: "160px",
                  marginLeft: "6px",
                  display: "inline-block",
                  verticalAlign: "top",
                }}
              />
              <h6 style={{ maxWidth: "40%", display: "inline-block" }}>
                <br />
                <br />
                <br />
                {get().Name(e)}
              </h6>
            </div>
          );
        })
      ) : (
        <div
          style={{
            height: "100%",
            width: "100%",
            textAlign: "center",
            marginTop: "8%",
          }}
        >
          <h4>Pas de resultats trouvé ! </h4>
        </div>
      )}
    </div>
  );
}
