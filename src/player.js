import {createPortal} from "react-dom";
import {ArrierePlanFlou} from "./util";

export function Player(arg){

    const thisplayer = arg.arg.modalPlayer;
    const thisetplayer = arg.arg.setmodalPlayer;


    if(!thisplayer.open){
return (<div></div>)   ;
    }
    console.log("opening player")


    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    return (

        createPortal(<div style={{ zIndex : 10}}>



            <iframe  src={"http://192.168.0.22/stream?item=" + thisplayer.data.uuid} style={{ backgroundColor : "black", position : "absolute", zIndex : 10, top : "0px", left : "0px", height : "100%", width : "100%"}} allowFullScreen={true}>

            </iframe>


        </div>, document.body)


    )



}
