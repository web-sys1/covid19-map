(this["webpackJsonpcovid19-map"]=this["webpackJsonpcovid19-map"]||[]).push([[0],{29:function(e,a,t){e.exports=t(45)},34:function(e,a,t){},45:function(e,a,t){"use strict";t.r(a);var n=t(0),o=t.n(n),r=t(12),c=t.n(r),s=(t(34),t(35),t(28)),l=t(10),i=t(22),m=t.n(i),u=Object(n.memo)((function(e){var a=e.setTooltipContent;return m.a.parse("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv",{download:!0,complete:function(e){alert("Loaded information about "+e.data.length+" countries or regions.")}}),o.a.createElement(l.ComposableMap,{projection:"geoMercator"},o.a.createElement(l.ZoomableGroup,{zoom:1},o.a.createElement(l.Geographies,{geography:"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"},(function(e){return e.geographies.map((function(e){return o.a.createElement(l.Geography,{key:e.rsmKey,geography:e,onMouseEnter:function(){var t,n=e.properties,o=n.NAME,r=n.POP_EST;a("".concat(o," \u2014 ").concat((t=r)>1e9?Math.round(t/1e8)/10+"Bn":t>1e6?Math.round(t/1e5)/10+"M":Math.round(t/100)/10+"K"))},onMouseLeave:function(){a("")},style:{default:{fill:"#D6D6DA",outline:"none"},hover:{fill:"#F53",outline:"none"},pressed:{fill:"#E42",outline:"none"}}})}))}))))})),p=t(23),d=t(25),E=t(26),h=t(27),g=t(11),v=t(17),b=t(15),f=t(16);var _=function(){var e=Object(n.useState)(""),a=Object(s.a)(e,2),t=a[0],r=a[1];return[o.a.createElement(g.a,{bg:"light",fixed:"top",className:"p-0 pl-2",expand:"lg"},o.a.createElement(g.a.Brand,null,o.a.createElement(b.a,{icon:f.c}),o.a.createElement("span",{className:"small"}," COVID19 ")),o.a.createElement(g.a.Toggle,{"aria-controls":"basic-navbar-nav",className:"border-0 "}),o.a.createElement(g.a.Collapse,{id:"basic-navbar-nav"},o.a.createElement(v.a,{className:"mr-auto"},o.a.createElement(v.a.Link,{className:"small",href:"https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series"},o.a.createElement(b.a,{icon:f.b})," Data source"),o.a.createElement(v.a.Link,{className:"small",href:"https://github.com/daniel-karl/covid19-map"},o.a.createElement(b.a,{icon:f.a})," Source code")))),o.a.createElement(d.a,{fluid:!0,className:"p-0"},o.a.createElement(E.a,{noGutters:"true"},o.a.createElement(h.a,null,o.a.createElement(u,{setTooltipContent:r}),o.a.createElement(p.a,null,t))))]};c.a.render(o.a.createElement(_,null),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.e7642f71.chunk.js.map