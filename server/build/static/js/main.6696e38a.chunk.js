(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{228:function(e,t){},231:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(76),c=n.n(r),l=(n(84),n(9)),u=n(35),i=n(77),s=n.n(i),d=n(78),g=n.n(d),b=s.a.create({baseURL:"http://localhost:3000"}),h=function(){var e=Object(o.useState)({}),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)({}),i=Object(l.a)(c,2),s=i[0],d=i[1],h=Object(o.useState)(0),f=Object(l.a)(h,2),m=f[0],v=f[1],p=Object(o.useState)(""),E=Object(l.a)(p,2),w=E[0],y=E[1];return Object(o.useEffect)((function(){!function(){var e=g()("http://localhost:3000");e.on("connect",(function(){return console.log("you are connected")})),e.on("disconnect",(function(){return console.log("you are disconnected")})),e.on("queue",(function(e){return y(e)})),e.on("progress",(function(e){v(e)}))}(),Promise.all([b.get("/employees/avg-salaries"),b.get("/employees/avg-ages")]).then((function(e){if(console.log(e),200===e[0].status){var t=e[0].data,n=t.map((function(e){return e.title})),o=t.map((function(e){return e.avg_salary}));r({labels:n,datasets:[{label:"Average Salary Per Job Title",backgroundColor:"rgba(255, 99, 132, 0.2)",borderColor:"rgba(255, 99, 132, 1)",borderWidth:1,hoverBackgroundColor:"rgba(255, 99, 132, 0.4)",hoverBorderColor:"rgba(255, 99, 132, 1)",data:o}]})}if(200===e[1].status){var a=e[1].data,c=a.map((function(e){return e.title})),l=a.map((function(e){return e.avg_age}));d({labels:c,datasets:[{label:"Average Age Per Job Title",backgroundColor:"rgba(0, 99, 132, 0.2)",borderColor:"rgba(0, 99, 132, 1)",borderWidth:1,hoverBackgroundColor:"rgba(0, 99, 132, 0.4)",hoverBorderColor:"rgba(0, 99, 132, 1)",data:l}]})}})).catch((function(e){console.log(e)}))}),[]),a.a.createElement("div",{style:{display:"flex"}},a.a.createElement("div",{style:{width:500,margin:10}},a.a.createElement(u.Bar,{width:500,height:200,data:n}),a.a.createElement(u.Bar,{width:500,height:200,data:s})),a.a.createElement("div",null,a.a.createElement("button",{onClick:function(){b.get("/queues/enqueue").then((function(e){200===e.status&&b.get("/queues/process").then((function(e){console.log(e)})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)}))}},"Generate Absence Data"),a.a.createElement("div",null,"Queue: ",w),a.a.createElement("div",null,"Status: ",m)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},79:function(e,t,n){e.exports=n(231)},84:function(e,t,n){}},[[79,1,2]]]);
//# sourceMappingURL=main.6696e38a.chunk.js.map