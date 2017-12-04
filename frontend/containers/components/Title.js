import React from "react";
import Inputfield from "./Inputfield";

class Title extends React.Component {
  

  

  render() {
    var b=false;
    return (
      <div className="col l10 offset-l1">
        <h1
          className="center smallFontMobile"
          style={{
            color: "white",
            textTransform: "uppercase",
            fontWeight: 300,

          }}
        >
          <span
            style={{
              fontWeight: 400,
              transformStyle: "color:"
            }}
          >
            Emory
          </span>{" "}
          COURSE CRITIQUE
        </h1>
        <div className="hide-on-small-only"
          style={{
            height: 12
          }}
        />
        <div className="row">
          <div className="col s12 m10 offset-m1 l10 offset-l1 xl8 offset-xl2">
            <nav
              className
              style={{
                background: "white",
                height:56,
                borderRadius:30
              }}
            >
              <div className="nav-wrapper">
                <form>
                  <Inputfield search={b}/>
                </form>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Title;
