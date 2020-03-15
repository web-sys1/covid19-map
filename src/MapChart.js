import React, { memo} from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";

import Papa from "papaparse";
import Form from 'react-bootstrap/Form';
import ReactBootstrapSlider from "react-bootstrap-slider";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-10m.json";

const confirmed = [];
const recovered = [];
const deaths = [];
const MAX_SIZE = 67786;

let totConf = 0;
let totRec = 0;
let totDead = 0;

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

class MapChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setTooltipContent: props.setTooltipContent,
      setTotConf: props.setTotConf,
      setTotRec: props.setTotRec,
      setTotDead: props.setTotDead,
      chart: "pie",
      factor: 20,
      width: 2,
      jhmode: false
    }
  }

  componentDidMount() {
    let that = this;
    Papa.parse("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv", {
      download: true,
      complete: function(results) {
        that.confirmed = [];
        let skipRow = true;
        let minSize = 0;
        let maxSize = MAX_SIZE;
        for(let data of results.data) {
          if(skipRow) {
            skipRow = false;
            continue;
          }
          let size = "";
          let i = data.length - 1;
          while(size==="" && i > 0) {
            size = data[i];
            i = i - 1;
          }
          if(size==="") {
            size = 0;
          }
          size = Number(size);
          if(size > maxSize) {
            maxSize = size;
          }
          let marker = {
            markerOffset: 0,
            name: (data[0] ? data[0] + ", " + data[1] : data[1]) ? (data[0] ? data[0] + ", " + data[1] : data[1]) : "",
            coordinates: [data[3], data[2]],
            size: size,
            val: size
          };
          totConf += size;
          confirmed.push(marker)
        }
        that.state.setTotConf(totConf);
        console.log(maxSize);
        for(let i = 0; i < confirmed.length; i++) {
          confirmed[i].size = (confirmed[i].size - minSize) / (maxSize - minSize);
        }
        that.setState({});
      }
    });

    Papa.parse("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv", {
      download: true,
      complete: function(results) {
        that.recovered = [];
        let skipRow = true;
        let minSize = 0;
        let maxSize = MAX_SIZE;
        for(let data of results.data) {
          if(skipRow) {
            skipRow = false;
            continue;
          }
          let size = "";
          let i = data.length - 1;
          while(size==="" && i > 0) {
            size = data[i];
            i = i - 1;
          }
          if(size==="") {
            size = 0;
          }
          size = Number(size);
          if(size > maxSize) {
            maxSize = size;
          }
          let marker = {
            markerOffset: 0,
            name: data[0] ? data[0] + ", " + data[1] : data[1],
            coordinates: [data[3], data[2]],
            size: size,
            val: size
          };
          totRec += size;
          recovered.push(marker)
        }
        that.state.setTotRec(totRec);
        for(let i = 0; i < recovered.length; i++) {
          // console.log(recovered[i].size + ", " + minSize + ", " + maxSize);
          recovered[i].size = (recovered[i].size - minSize) / (maxSize - minSize);
        }
        that.setState({});
      }
    });

    Papa.parse("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv", {
      download: true,
      complete: function(results) {
        that.deaths = [];
        let skipRow = true;
        let minSize = 0;
        let maxSize = MAX_SIZE;
        for(let data of results.data) {
          if(skipRow) {
            skipRow = false;
            continue;
          }
          let size = "";
          let i = data.length - 1;
          while(size==="" && i > 0) {
            size = data[i];
            i = i - 1;
          }
          if(size==="") {
            size = 0;
          }
          size = Number(size);
          if(size > maxSize) {
            maxSize = size;
          }
          let marker = {
            markerOffset: 0,
            name: data[0] ? data[0] + ", " + data[1] : data[1],
            coordinates: [data[3], data[2]],
            size: size,
            val: size
          };
          totDead += size;
          deaths.push(marker)
        }
        that.state.setTotDead(totDead);
        for(let i = 0; i < deaths.length; i++) {
          // console.log(deaths[i].size + ", " + minSize + ", " + maxSize);
          deaths[i].size = (deaths[i].size - minSize) / (maxSize - minSize);
        }
        that.setState({});
      }
    });
  }

  render() {
    let that = this;
    return (
      <>
      <Form>
        <div className="ml-3 small controls">
          <Form.Check inline className="small" checked={that.state.chart==="pie" } label="Circles" type={"radio"} name={"a"} id={`inline-radio-1`} onClick={() => {that.setState({chart: "pie"});}}/>
          <Form.Check inline className="small" checked={that.state.chart==="bar" } label="Bars" type={"radio"} name={"a"} id={`inline-radio-2`} onClick={() => {that.setState({chart: "bar"});}} />
        </div>
      </Form>
      <div className="small controls2">
        <ReactBootstrapSlider value={this.state.factor} change={e => {this.setState({ factor: e.target.value, width: e.target.value / 10 });}} step={1} max={100} min={1} />
        <Form.Check inline className="small" checked={that.state.jhmode} label="Johns Hopkins Mode" type={"checkbox"} name={"a"} id={`inline-checkbox-2`} onClick={() => {that.setState({jhmode: !that.state.jhmode});}} />
      </div>
      <ComposableMap
          projection={"geoMercator"}
          projectionConfig={{scale: 200}}
          height={window.innerWidth}
          width={window.innerHeight - 50}
          style={{width: "100%", height: "100%"}}
      >
        <ZoomableGroup maxZoom={1000}>
          <Geographies geography={geoUrl}>
            {
              ({geographies}) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const {NAME, POP_EST} = geo.properties;
                      if(NAME === "Antarctica") {
                        return;
                      }
                      this.state.setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                    }}
                    onMouseLeave={() => {
                      this.state.setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: "#ddd",
                        outline: "none"
                      },
                      hover: {
                        fill: "#999",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#ddd",
                        outline: "none"
                      }
                    }}
                  />
                ))
            }
          </Geographies>
          {
            confirmed.map(({ name, coordinates, markerOffset, size, val }) => {
              if(that.state.jhmode) {
                size = Math.log(size * 100000) / 25;
              }
              return (<Marker coordinates={coordinates}>
                <rect style={that.state.chart==="bar" ? {display: "block", hover: {fill: "#F00"}} : {display: "none", hover: {fill: "#F00"}}} x={that.state.width * 0 - that.state.width * 1.5} y={-size * that.state.factor} width={that.state.width} height={size * that.state.factor} fill="#F008" />
                <circle style={that.state.chart==="pie" ? {display: "block", hover: {fill: "#F00"}} : {display: "none", hover: {fill: "#F00"}}} r={Math.sqrt(size) * that.state.factor} fill="#F008" />
                <title>{name + " - " + val + " confirmed"}</title>
                <text
                  textAnchor="middle"
                  y={markerOffset}
                  style={{ fontSize: name.endsWith(", US") ? "0.005em" : "2px", fontFamily: "Arial", fill: "#5D5A6D33", pointerEvents: "none" }}
                >
                  {name}
                </text>
              </Marker>
            )})
          }
          {
            !that.state.jhmode &&
            recovered.map(({ name, coordinates, markerOffset, size, val }) => {
              if(that.state.jhmode) {
                size = Math.log(size * 100000) / 25;
              }
              return (<Marker coordinates={coordinates}>
                <rect style={that.state.chart==="bar" ? {display: "block", hover: {fill: "#0F0"}} : {display: "none", hover: {fill: "#0F0"}}} x={that.state.width * 1 - that.state.width * 1.5} y={-size * that.state.factor} width={that.state.width} height={size * that.state.factor} fill="#0F08" />
                <circle style={that.state.chart==="pie" ? {display: "block", hover: {fill: "#0F0"}} : {display: "none", hover: {fill: "#0F0"}}} r={Math.sqrt(size) * that.state.factor} fill="#0F08" />
                <title>{name + " - " + val + " recovered"}</title>
                <text
                  textAnchor="middle"
                  y={markerOffset}
                  style={{ fontSize: "1px", fontFamily: "system-ui", fill: "#5D5A6D", pointerEvents: "none" }}
                >
                  {/*name*/}
                </text>
              </Marker>
            )})
          }
          {
            !that.state.jhmode &&
            deaths.map(({ name, coordinates, markerOffset, size, val }) => {
              if(that.state.jhmode) {
                size = Math.log(size * 100000) / 25;
              }
              return (<Marker coordinates={coordinates}>
                <rect style={that.state.chart==="bar" ? {display: "block", hover: {fill: "#000"}} : {display: "none", hover: {fill: "#000"}}} x={that.state.width * 2 - that.state.width * 1.5} y={-size * that.state.factor} width={that.state.width} height={size * that.state.factor} fill="#0008" />
                <circle style={that.state.chart==="pie" ? {display: "block", hover: {fill: "#000"}} : {display: "none", hover: {fill: "#000"}}} r={Math.sqrt(size) * that.state.factor} fill="#0008" />
                <title>{name + " - " + val + " deceased"}</title>
                <text
                  textAnchor="middle"
                  y={markerOffset}
                  style={{ fontSize: "1px", fontFamily: "system-ui", fill: "#5D5A6D33", pointerEvents: "none" }}
                >
                  {/*name*/}
                </text>
              </Marker>
            )})
          }
        </ZoomableGroup>
      </ComposableMap>
    </>
    );
  }
}

export default memo(MapChart);