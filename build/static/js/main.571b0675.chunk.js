(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{228:function(e,t){},231:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(76),c=a.n(r),l=(a(84),a(5)),u=a(35),i=a(77),s=a.n(i),d=a(78),g=a.n(d),b=s.a.create({baseURL:"http://localhost:3000"}),h=function(){var e=Object(n.useState)({}),t=Object(l.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)({}),i=Object(l.a)(c,2),s=i[0],d=i[1],h=Object(n.useState)(0),f=Object(l.a)(h,2),m=f[0],v=f[1],p=Object(n.useState)(""),E=Object(l.a)(p,2),j=E[0],y=E[1],k=Object(n.useState)([]),O=Object(l.a)(k,2),w=O[0],C=O[1],B=Object(n.useState)(!0),S=Object(l.a)(B,2),q=S[0],x=S[1],A=function(e){b.get("/queues/kue-api/jobs/".concat(e,"/0..10/desc")).then((function(t){200===t.status&&t.data.length>0&&("active"===e?y(t.data[0].data.title):(t.data.reverse(),C(t.data)))})).catch((function(e){return console.log(e)}))};return Object(n.useEffect)((function(){!function(){var e=g()("http://localhost:3000");e.on("connect",(function(){return console.log("you are connected")})),e.on("disconnect",(function(){return console.log("you are disconnected")})),e.on("queue",(function(e){y(e),A("inactive")})),e.on("progress",(function(e){v(e)}))}(),Promise.all([b.get("/employees/avg-salaries"),b.get("/employees/avg-ages")]).then((function(e){if(console.log(e),200===e[0].status){var t=e[0].data,a=t.map((function(e){return e.title})),n=t.map((function(e){return e.avg_salary}));r({labels:a,datasets:[{label:"Average Salary Per Job Title",backgroundColor:"rgba(255, 99, 132, 0.2)",borderColor:"rgba(255, 99, 132, 1)",borderWidth:1,hoverBackgroundColor:"rgba(255, 99, 132, 0.4)",hoverBorderColor:"rgba(255, 99, 132, 1)",data:n}]})}if(200===e[1].status){var o=e[1].data,c=o.map((function(e){return e.title})),l=o.map((function(e){return e.avg_age}));d({labels:c,datasets:[{label:"Average Age Per Job Title",backgroundColor:"rgba(0, 99, 132, 0.2)",borderColor:"rgba(0, 99, 132, 1)",borderWidth:1,hoverBackgroundColor:"rgba(0, 99, 132, 0.4)",hoverBorderColor:"rgba(0, 99, 132, 1)",data:l}]})}x(!1)})).catch((function(e){console.log(e)})),A("active"),A("inactive")}),[]),o.a.createElement("div",{style:{display:"flex"}},o.a.createElement("div",{style:{width:"100%",height:"100vh",position:"fixed",zIndex:10,backgroundColor:"rgba(0, 0, 0, 0.2)",display:q?"flex":"none",justifyContent:"center",alignItems:"center"}},"Loading..."),o.a.createElement("div",{style:{width:500,margin:10}},o.a.createElement(u.Bar,{width:500,height:200,data:a}),o.a.createElement(u.Bar,{width:500,height:200,data:s})),o.a.createElement("div",null,o.a.createElement("div",null,"Active Queue: ",j),o.a.createElement("div",null,"Progress: ",m," employees"),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("div",null,o.a.createElement("p",null,"Queue List"),o.a.createElement("ul",null,w.map((function(e,t){return o.a.createElement("li",{key:t},e.data.title)})))),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("button",{onClick:function(){b.get("/queues/kue-api/jobs/active/0..10/desc").then((function(e){console.log(e.data),200===e.status&&(e.data.length<=0?b.get("/queues/enqueue").then((function(e){200===e.status&&b.get("/queues/process").then((function(e){console.log(e)})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)})):y(e.data[0].data.title))})).catch((function(e){console.log(e)}))}},"Execute Queues")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},79:function(e,t,a){e.exports=a(231)},84:function(e,t,a){}},[[79,1,2]]]);
//# sourceMappingURL=main.571b0675.chunk.js.map