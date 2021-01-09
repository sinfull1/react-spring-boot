(this["webpackJsonpreact-redux-jwt-auth"]=this["webpackJsonpreact-redux-jwt-auth"]||[]).push([[0],{111:function(e,t,a){},168:function(e,t,a){e.exports=a(305)},177:function(e,t,a){},179:function(e,t,a){},297:function(e,t,a){},298:function(e,t,a){},299:function(e,t,a){},300:function(e,t,a){},301:function(e,t,a){},302:function(e,t,a){},303:function(e,t,a){},304:function(e,t,a){},305:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(28),s=a.n(l),o=a(34),c=a(32),i=a(116),u=a(117),m=a(19),d=localStorage.getItem("user"),h=d?{isLoggedIn:!0,user:d}:{isLoggedIn:!1,user:null},p={},f=Object(c.combineReducers)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"REGISTER_SUCCESS":case"REGISTER_FAIL":return Object(m.a)(Object(m.a)({},e),{},{isLoggedIn:!1});case"LOGIN_SUCCESS":return Object(m.a)(Object(m.a)({},e),{},{isLoggedIn:!0,user:n.user});case"LOGIN_FAIL":case"LOGOUT":return Object(m.a)(Object(m.a)({},e),{},{isLoggedIn:!1,user:null});default:return e}},message:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"SET_MESSAGE":return{message:n};case"CLEAR_MESSAGE":return{message:""};default:return e}}}),v=[u.a],g=Object(c.createStore)(f,Object(i.composeWithDevTools)(c.applyMiddleware.apply(void 0,v))),b=(a(177),a(6)),E=a(5),y=a(7),k=a(13),w=a(12),N=a(9),O=a(15),S=(a(178),a(179),a(29)),C=a.n(S),j="https://www.gopaychain.in/",x=new(function(){function e(){Object(b.a)(this,e)}return Object(E.a)(e,[{key:"login",value:function(e,t){return C.a.post(j+"login",{username:e,password:t}).then((function(e){return console.log(e),e.data.token&&localStorage.setItem("user",e.data.token),e.data}))}},{key:"logout",value:function(){localStorage.removeItem("user")}},{key:"register",value:function(e,t,a){return C.a.post(j+"register",{username:e,email:t,password:a})}},{key:"isLoggedIn",value:function(){return!!localStorage.getItem("user")}}]),e}()),F=a(57),I=a.n(F),L=a(42),T=a.n(L),P=a(58),A=a.n(P),M=function(e){if(!e)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"This field is required!")},R=function(e){Object(k.a)(a,e);var t=Object(w.a)(a);function a(e){var n;return Object(b.a)(this,a),(n=t.call(this,e)).handleLogin=n.handleLogin.bind(Object(y.a)(n)),n.onChangeUsername=n.onChangeUsername.bind(Object(y.a)(n)),n.onChangePassword=n.onChangePassword.bind(Object(y.a)(n)),n.state={username:"",password:"",loading:!1},n}return Object(E.a)(a,[{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"handleLogin",value:function(e){var t=this;e.preventDefault(),this.setState({loading:!0}),this.form.validateAll();var a,n,r=this.props,l=r.dispatch,s=r.history;0===this.checkBtn.context._errors.length?l((a=this.state.username,n=this.state.password,function(e){return x.login(a,n).then((function(t){return e({type:"LOGIN_SUCCESS",payload:{user:t}}),Promise.resolve()}),(function(t){var a=t.response&&t.response.data&&t.response.data.message||t.message||t.toString();return e({type:"LOGIN_FAIL"}),e({type:"SET_MESSAGE",payload:a}),Promise.reject()}))})).then((function(){s.push("/home"),window.location.reload()})).catch((function(){t.setState({loading:!1})})):this.setState({loading:!1})}},{key:"render",value:function(){var e=this,t=this.props,a=t.isLoggedIn,n=t.message;return a?r.a.createElement(N.a,{to:"/home"}):r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"card card-container"},r.a.createElement("img",{className:"profile-img-card"}),r.a.createElement(I.a,{onSubmit:this.handleLogin,ref:function(t){e.form=t}},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"username"},"Username"),r.a.createElement(T.a,{type:"text",className:"form-control",name:"username",value:this.state.username,onChange:this.onChangeUsername,validations:[M]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement(T.a,{type:"password",className:"form-control",name:"password",value:this.state.password,onChange:this.onChangePassword,validations:[M]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-primary btn-block",disabled:this.state.loading},this.state.loading&&r.a.createElement("span",{className:"spinner-border spinner-border-sm"}),r.a.createElement("span",null,"Login"))),n&&r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{className:"alert alert-danger",role:"alert"},n)),r.a.createElement(A.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}}))))}}]),a}(n.Component);var D=Object(o.b)((function(e){return{isLoggedIn:e.auth.isLoggedIn,message:e.message.message}}))(R),U=a(118),B=function(e){if(!e)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"This field is required!")},G=function(e){if(!Object(U.isEmail)(e))return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"This is not a valid email.")},_=function(e){if(e.length<3||e.length>20)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"The username must be between 3 and 20 characters.")},V=function(e){if(e.length<6||e.length>40)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"The password must be between 6 and 40 characters.")},q=function(e){Object(k.a)(a,e);var t=Object(w.a)(a);function a(e){var n;return Object(b.a)(this,a),(n=t.call(this,e)).handleRegister=n.handleRegister.bind(Object(y.a)(n)),n.onChangeUsername=n.onChangeUsername.bind(Object(y.a)(n)),n.onChangeEmail=n.onChangeEmail.bind(Object(y.a)(n)),n.onChangePassword=n.onChangePassword.bind(Object(y.a)(n)),n.state={username:"",email:"",password:"",successful:!1},n}return Object(E.a)(a,[{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"onChangeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"handleRegister",value:function(e){var t,a,n,l=this;if(e.preventDefault(),this.state.successful)return r.a.createElement(N.a,{to:"/home"});this.setState({successful:!1}),this.form.validateAll(),0===this.checkBtn.context._errors.length&&this.props.dispatch((t=this.state.username,a=this.state.email,n=this.state.password,function(e){return x.register(t,a,n).then((function(t){return e({type:"REGISTER_SUCCESS"}),e({type:"SET_MESSAGE",payload:t.data.message}),Promise.resolve()}),(function(t){var a=t.response&&t.response.data&&t.response.data.message||t.message||t.toString();return e({type:"REGISTER_FAIL"}),e({type:"SET_MESSAGE",payload:a}),Promise.reject()}))})).then((function(){l.setState({successful:!0})})).catch((function(){l.setState({successful:!1})}))}},{key:"render",value:function(){var e=this,t=this.props.message;return this.state.successful?r.a.createElement(N.a,{to:"/home"}):r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"card card-container"},r.a.createElement(I.a,{onSubmit:this.handleRegister,ref:function(t){e.form=t}},!this.state.successful&&r.a.createElement("div",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"username"},"Username"),r.a.createElement(T.a,{type:"text",className:"form-control",name:"username",value:this.state.username,onChange:this.onChangeUsername,validations:[B,_]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement(T.a,{type:"text",className:"form-control",name:"email",value:this.state.email,onChange:this.onChangeEmail,validations:[B,G]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement(T.a,{type:"password",className:"form-control",name:"password",value:this.state.password,onChange:this.onChangePassword,validations:[B,V]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-primary btn-block"},"Sign Up"))),t&&r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{className:this.state.successful?"alert alert-success":"alert alert-danger",role:"alert"},t)),r.a.createElement(A.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}}))))}}]),a}(n.Component);var W=Object(o.b)((function(e){return{message:e.message.message}}))(q);function J(){var e=localStorage.getItem("user");return e?{Authorization:"Bearer "+e}:{}}new(function(){function e(){Object(b.a)(this,e)}return Object(E.a)(e,[{key:"getPublicContent",value:function(){return C.a.get("https://www.gopaychain.in/api/test/all",{headers:J()})}},{key:"getUserBoard",value:function(){return C.a.get("https://www.gopaychain.in/api/test/user",{headers:J()})}},{key:"getModeratorBoard",value:function(){return C.a.get("https://www.gopaychain.in/api/test/mod",{headers:J()})}},{key:"getAdminBoard",value:function(){return C.a.get("https://www.gopaychain.in/api/test/admin",{headers:J()})}}]),e}());var H=function(e){Object(k.a)(a,e);var t=Object(w.a)(a);function a(e){var n;return Object(b.a)(this,a),(n=t.call(this,e)).state={content:""},n}return Object(E.a)(a,[{key:"render",value:function(){return localStorage.getItem("user")?r.a.createElement("div",{className:"container"},r.a.createElement("header",{className:"jumbotron"},r.a.createElement("p",null,r.a.createElement(O.a,{to:"/eventGrid"}," Event Grid "),"with Adhoc reactivity design"),r.a.createElement("p",null,r.a.createElement(O.a,{to:"/upload"}," Upload ")," Download functionality on with filesystem "),r.a.createElement("p",null,r.a.createElement(O.a,{to:"/kafka"}," Kafka ")," high transaction simulator"),r.a.createElement("p",null,r.a.createElement(O.a,{to:"/spark"}," Spark ")," for file based analytics"),r.a.createElement("p",null,r.a.createElement(O.a,{to:"/d3"}," D3 Charts ")," with high repaint"))):r.a.createElement("div",{className:"container"},r.a.createElement("header",{className:"jumbotron"},r.a.createElement("h3",null,"Sid Blog"),r.a.createElement("p",null,"Following are some scribbles from the coding learning and experiences "),r.a.createElement("b",null,"Please  ",r.a.createElement(O.a,{to:"/login"}," Login ")," to see the main page")))}}]),a}(n.Component),Y=a(4),z=a.n(Y),Q=a(16),K=a(14),$=a(119),X=[{field:"userId",minWidth:20,checkboxSelection:!0,filter:"agTextColumnFilter",headerCheckboxSelectionFilteredOnly:!0,headerCheckboxSelection:!0},{field:"id",minWidth:20,filter:"agTextColumnFilter"},{field:"title",minWidth:350,filter:"agTextColumnFilter"},{field:"body",minWidth:350,filter:"agTextColumnFilter"}],Z={flex:1,minWidth:50,filter:!0,closeOnApply:!0},ee=(a(55),a(285),a(286),a(111),a(64)),te=a.n(ee),ae=a(120),ne=a.n(ae),re={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}};function le(e){var t=r.a.useState(""),a=Object(K.a)(t,2),n=a[0],l=a[1],s=r.a.useState(!1),o=Object(K.a)(s,2),c=o[0],i=o[1];function u(){return m.apply(this,arguments)}function m(){return(m=Object(Q.a)(z.a.mark((function t(){return z.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.submitfunc(n);case 2:i(!1);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{className:"button",onClick:function(){i(!0)}},e.titleName),r.a.createElement(ne.a,{isOpen:c,onAfterOpen:function(){},onRequestClose:u,style:re,contentLabel:"Example Modal"},r.a.createElement("form",{onSubmit:u},r.a.createElement("label",null,"Provide a Name",r.a.createElement("input",{type:"text",value:e.textvalue,onChange:function(t){console.log(e),l(t.target.value)}})),r.a.createElement("input",{className:"button",type:"submit",value:"Submit"}))))}var se=Math.random().toString(36).substr(2,9),oe=new EventSource("https://www.gopaychain.in/getHttp?subsId="+se);oe.onopen=function(e){return console.log("open",e)},oe.onerror=function(e){console.log("Server side shut"),oe.close(),oe=new EventSource("https://www.gopaychain.in/getHttp?subsId="+se)};var ce=[],ie=[],ue=[],me=[],de=(me[0],[]),he=[],pe=(de[0],de[0],[]);function fe(e){var t=Object(n.useState)([]),a=Object(K.a)(t,2),l=a[0],s=a[1],o=Object(n.useState)(null),c=Object(K.a)(o,2),i=c[0],u=c[1],m=Object(n.useState)(null),d=Object(K.a)(m,2),h=(d[0],d[1]);function p(){return(p=Object(Q.a)(z.a.mark((function e(t){return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:me.forEach((function(e,a){if(t.label==ue[a]){i.setFilterModel(e.value);var n=document.getElementsByClassName("Dropdown-placeholder placeClass is-selected").item(0);void 0!=n&&(n.innerHTML=t.label)}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(){return(f=Object(Q.a)(z.a.mark((function e(t){return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:me.forEach((function(e,a){if(t.label==ue[a]){i.setFilterModel(e.value);var n=document.getElementsByClassName("Dropdown-placeholder placeClass3 is-selected").item(0);void 0!=n&&(n.innerHTML=t.label)}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(){return(v=Object(Q.a)(z.a.mark((function e(t){return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i.deselectAll(),he.forEach((function(e,a){t.label==de[a]&&i.forEachNodeAfterFilterAndSort((function(t,a){0!==Object.keys(e.value).length&&e.value.map((function(e){e.id==t.id&&t.setSelected(!0)}))}))}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(){return(g=Object(Q.a)(z.a.mark((function e(){var t;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i.setFilterModel({}),void 0!=(t=document.getElementsByClassName("Dropdown-placeholder placeClass is-selected").item(0))&&(t.innerHTML="Saved Filters");case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(){return(b=Object(Q.a)(z.a.mark((function e(){var t;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i.deselectAll(),void 0!=(t=document.getElementsByClassName("Dropdown-placeholder placeClass2 is-selected").item(0))&&(t.innerHTML="Saved Selctions");case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}oe.onmessage=function(e){var t=e.data;s(JSON.parse(t))};return r.a.createElement("div",{style:{width:"1000px",height:"600px"}},r.a.createElement("button",{className:"button",onClick:function(){fetch("https://www.gopaychain.in/event?subsId="+se+"&event=sample")}},"Append row"),r.a.createElement("button",{className:"button",onClick:function(){return function(){var e=i.getSelectedRows(),t=l.filter((function(t){return!e.includes(t)}));s(t)}()}},"Delete rows"),r.a.createElement(le,{submitfunc:function(e){if(0==e.length||ue.includes(e))alert("Selection not saved, please select something");else{var t=JSON.parse(JSON.stringify(i.getSelectedRows()));0!==t.length?(ie.push(t),de.push(e),he.push({id:e,value:t})):alert("Nothing selected")}},titleName:"Save Selection"}),r.a.createElement("button",{className:"button",onClick:function(){return function(){return b.apply(this,arguments)}()}},"Clear Selection"),r.a.createElement("button",{className:"button",onClick:function(){return function(){return g.apply(this,arguments)}()}},"Remove all filters"),r.a.createElement(le,{submitfunc:function(e){if(0==e.length||ue.includes(e))alert("Filter creation failed check if name is already used or filter is created in grid");else{var t=JSON.parse(JSON.stringify(i.getFilterModel()));0!==Object.keys(t).length?(ce.push(t),ue.push(e),me.push({id:e,value:t})):alert("No Filter selected ")}},titleName:"Save Filter"}),r.a.createElement(te.a,{className:"dropdown",controlClassName:"controlClass",placeholderClassName:"placeClass",onChange:function(e){return p.apply(this,arguments)},options:ue,placeholder:"Saved Filters"}),r.a.createElement(te.a,{className:"dropdown",controlClassName:"controlClass",placeholderClassName:"placeClass2",onChange:function(e){return v.apply(this,arguments)},options:de,placeholder:"Saved Selections"}),r.a.createElement(te.a,{className:"dropdown",controlClassName:"controlClass",placeholderClassName:"placeClass3",onChange:function(e){return f.apply(this,arguments)},options:pe,placeholder:"Preset Filters"}),r.a.createElement("div",{className:"quickFilterDiv"},"Quick Filter",r.a.createElement("input",{type:"text",onInput:function(){i.setQuickFilter(document.getElementById("quickFilter").value)},id:"quickFilter",placeholder:"filter on all cols.."})),r.a.createElement("div",{id:"myGrid",style:{height:"100%",width:"100%"},className:"ag-theme-alpine"},r.a.createElement($.AgGridReact,{getRowNodeId:function(e){return e.id},columnDefs:X,defaultColDef:Z,rowSelection:"multiple",onGridReady:function(e){u(e.api),h(e.columnApi)},immutableData:!0,rowData:l})))}a(297),a(298);var ve=function(e){return r.a.createElement("div",{className:"csl-block-view"},r.a.createElement("h2",null," Variable Flux"),r.a.createElement("table",{className:"table100 ver1 m-b-110"},r.a.createElement("thead",null,r.a.createElement("tr",{className:"row100 head"},r.a.createElement("th",null,"Variable Code"),r.a.createElement("th",null,"Variable Value"))),r.a.createElement("tbody",null,e.stocks.map((function(e){return r.a.createElement("tr",{className:"row100"},r.a.createElement("td",null,e.stockCode),r.a.createElement("td",null,Math.round(e.stockPrice)))})))))},ge=a(33),be=a(36),Ee=(a(3),a(321)),ye=(a(299),function(e){Object(k.a)(a,e);var t=Object(w.a)(a);function a(e){var n;return Object(b.a)(this,a),(n=t.call(this,e)).state={firstRender:!0,chart:null},n.drawChart=n.drawChart.bind(Object(y.a)(n)),n}return Object(E.a)(a,[{key:"componentDidUpdate",value:function(){this.state.firstRender=!1,this.drawChart()}},{key:"drawChart",value:function(){var e=Object(ge.a)().range([0,180]).domain(this.props.stocks.map((function(e){return e.stockName}))).padding(.2),t=Object(ge.b)().range([130,0]).domain([0,100]),a=Object(Ee.a)(this.node).select("g").attr("transform","translate(60,60)");a.select("#axisLeft").call(Object(be.b)(t)),a.select("#axisBottom").attr("transform","translate(0, 130)").call(Object(be.a)(e)),a.selectAll("rect").data(this.props.stocks).enter().append("rect"),a.selectAll("rect").data(this.props.stocks).exit().remove(),a.selectAll("rect").data(this.props.stocks).attr("x",(function(t){return e(t.stockName)})).attr("y",(function(e){return t(e.stockPrice)})).attr("height",(function(e){return 130-t(e.stockPrice)})).attr("width",e.bandwidth())}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"csl-bar-view"}," ",r.a.createElement("svg",{ref:function(t){return e.node=t}},r.a.createElement("g",null,r.a.createElement("g",{id:"axisLeft"}),r.a.createElement("g",{id:"axisBottom"}))))}}]),a}(n.Component)),ke=a(81),we=(a(300),a(322)),Ne=a(325),Oe=a(324),Se=a(326),Ce=(a(301),Object(we.a)({root:{width:300}}));function je(){Ce();var e=r.a.useState(30),t=Object(K.a)(e,2),a=t[0],n=t[1];return r.a.createElement("div",{className:"flux-rate"},r.a.createElement(Oe.a,{id:"continuous-slider",gutterBottom:!0},"Flux Rate (Under work)"),r.a.createElement(Ne.a,{container:!0,spacing:2},r.a.createElement(Ne.a,{item:!0,xs:!0},r.a.createElement(Se.a,{value:a,onChange:function(e,t){n(t)},"aria-labelledby":"continuous-slider"}))),r.a.createElement("div",{className:"flux-button"},r.a.createElement("button",{onClick:function(e){console.log("called")}},"Change rate")))}var xe=function(e){Object(k.a)(a,e);var t=Object(w.a)(a);function a(e){var n;Object(b.a)(this,a),(n=t.call(this,e)).state={chart:null},n.drawChart=n.drawChart.bind(Object(y.a)(n));Date.now();return n}return Object(E.a)(a,[{key:"componentDidMount",value:function(){var e=Object(Q.a)(z.a.mark((function e(){return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.prevPrice=0,this.prevTime=0,this.initialTime=Date.now();case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){var e=Object(Q.a)(z.a.mark((function e(){return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.drawChart();case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"drawChart",value:function(){var e=10,t=40,a=40,n=500-a-t,r=150-e-20,l=document.getElementById("tracker").width.baseVal.value-a-t,s=Object(ge.c)().range([0,n]).domain([this.initialTime,this.initialTime+5e4]).nice(),o=Object(ge.b)().range([r,0]).domain([0,100]),c=Object(Ee.a)(this.node).select("g").attr("transform","translate("+a+","+e+")"),i=(c.select("#axisLeft").call(Object(be.b)(o)),c.select("#axisBottom").attr("transform","translate(0,"+r+")").call(Object(be.a)(s)),ke.b().curve(ke.a)),u=r/100,m=[[this.prevTime,r-this.prevPrice*u],[this.prevTime+n/110,r-this.props.stocks.map((function(e){return e.stockPrice}))[this.props.variable]*u]];c.append("path").attr("d",i(m)).attr("stroke","steelblue").attr("fill","none"),this.prevTime&&this.prevTime>l-75&&(this.prevTime=0,c.selectAll("path").remove(),this.initialTime=Date.now()),this.prevPrice=this.props.stocks.map((function(e){return e.stockPrice}))[this.props.variable],this.prevTime=this.prevTime+n/110,console.log(this.prevTime)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"csl-tracker-view"},r.a.createElement("div",null,r.a.createElement(je,null)),r.a.createElement("div",null,r.a.createElement("svg",{ref:function(t){return e.node=t},id:"tracker"},r.a.createElement("g",null,r.a.createElement("g",{id:"axisLeft"}),r.a.createElement("g",{id:"axisBottom"})))))}}]),a}(n.Component),Fe=new EventSource("https://www.gopaychain.in/getPrices"),Ie=function(e){Object(k.a)(a,e);var t=Object(w.a)(a);function a(e){var n;return Object(b.a)(this,a),(n=t.call(this,e)).state={stocks:[],isLoading:!1},n}return Object(E.a)(a,[{key:"componentDidMount",value:function(){var e=Object(Q.a)(z.a.mark((function e(){var t=this;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.setState({isLoading:!0}),Fe.onopen=function(e){return console.log("open",e)},Fe.onmessage=function(e){var a=JSON.parse(e.data);t.setState({stocks:a.lisStocks})},Fe.onerror=function(e){console.log("Server side shut"),Fe.close(),t.setState({eventSource:null})};case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.stocks;e.isLoading;return r.a.createElement("div",{className:"stock-group-wrapper"},r.a.createElement(ve,{stocks:t}),r.a.createElement(xe,{stocks:t,variable:1}),r.a.createElement(xe,{stocks:t,variable:0}),r.a.createElement(ye,{stocks:t}))}}]),a}(n.Component),Le=a(18),Te=Object(Le.a)(),Pe=a(35),Ae=C.a.create({baseURL:"https://www.gopaychain.in"}),Me=new(function(){function e(){Object(b.a)(this,e)}return Object(E.a)(e,[{key:"upload",value:function(e,t){var a=new FormData;return a.append("payload",e),Ae.post("/upload",a,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:t})}},{key:"getFiles",value:function(){return Ae.get("/files")}},{key:"getPublishFiles",value:function(){return Ae.get("/getPublishFiles")}},{key:"publishFile",value:function(e){return Ae.get("/publishFile?fileName="+e)}},{key:"deleteFile",value:function(e){return Ae.get("/deleteFile?fileName="+e)}}]),e}()),Re=(a(302),function(e){Object(k.a)(a,e);var t=Object(w.a)(a);function a(e){var n;return Object(b.a)(this,a),(n=t.call(this,e)).selectFile=n.selectFile.bind(Object(y.a)(n)),n.upload=n.upload.bind(Object(y.a)(n)),n.clickView=n.clickView.bind(Object(y.a)(n)),n.publish=n.publish.bind(Object(y.a)(n)),n.state={selectedFiles:void 0,currentFile:void 0,progress:0,message:"",fileInfos:[],publishInfo:[]},n}return Object(E.a)(a,[{key:"componentDidMount",value:function(){var e=this;Me.getFiles().then((function(t){e.setState({fileInfos:t.data})})),Me.getPublishFiles().then((function(t){e.setState({publishInfo:t.data})}))}},{key:"selectFile",value:function(e){this.setState({selectedFiles:e.target.files})}},{key:"upload",value:function(){var e=this,t=this.state.selectedFiles[0];this.setState({progress:0,currentFile:t}),Me.upload(t,(function(t){e.setState({progress:Math.round(100*t.loaded/t.total)})})).then((function(t){return e.setState({message:t.data.message}),Me.getFiles()})).then((function(t){e.setState({fileInfos:t.data})})).catch((function(){e.setState({progress:0,message:"Could not upload the file!",currentFile:void 0})})),this.setState({selectedFiles:void 0})}},{key:"clickView",value:function(e){var t="https://www.gopaychain.in/api/downloadView?fileName="+e.target.text;window.open(t)}},{key:"publish",value:function(){var e=Object(Q.a)(z.a.mark((function e(t){return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Me.publishFile(t);case 2:if(!e.sent.data){e.next=8;break}return e.next=6,this.setState({publishInfo:[].concat(Object(Pe.a)(this.state.publishInfo),[{url:"",name:t}])});case 6:e.next=9;break;case 8:alert("Already Published. Publish new version?");case 9:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=Object(Q.a)(z.a.mark((function e(t){var a=this;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Me.deleteFile(t).then((function(e){e.data&&Me.getFiles().then((function(e){a.setState({fileInfos:e.data})}))}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state,a=t.selectedFiles,n=t.currentFile,l=t.progress,s=t.message,o=t.fileInfos,c=t.publishInfo;return console.table(c),r.a.createElement("div",null,n&&100!=l&&r.a.createElement("div",{className:"progress"},r.a.createElement("div",{className:"progress-bar progress-bar-info progress-bar-striped",role:"progressbar","aria-valuenow":l,"aria-valuemin":"0","aria-valuemax":"100",style:{width:l+"%"}},l,"%")),r.a.createElement("div",{className:"bar-upload"},r.a.createElement("input",{type:"file",onChange:this.selectFile}),r.a.createElement("button",{className:"button3",disabled:!a,onClick:this.upload},"Upload")),r.a.createElement("div",{className:"alert alert-light",role:"alert"},s),r.a.createElement("div",{className:"card-upload"},r.a.createElement("div",{className:"card-header"},"List of Files"),r.a.createElement("ul",{className:"list-group list-group-flush"},o&&o.map((function(t,a){return r.a.createElement("div",{className:"bar-upload"},r.a.createElement("li",{className:"list-group-item",key:a},c.map((function(e){return e.name==t.name})).includes(!0)?r.a.createElement("div",{className:"led-box"}," ",r.a.createElement("div",{className:"led-green"})):r.a.createElement("div",{className:"led-box"}," ",r.a.createElement("div",{className:"led-grey"})),r.a.createElement("a",{className:"a-upload",onClick:e.clickView},t.name),r.a.createElement("a",{className:"button1",onClick:function(){return e.publish(t.name)}},"Publish "),r.a.createElement("a",{className:"button1",onClick:function(){return e.delete(t.name)}},"Delete ")))})))))}}]),a}(n.Component));a(303),a(304);function De(e){return r.a.createElement("div",{className:"example"},r.a.createElement("div",{className:"title"},e.title),r.a.createElement("div",{className:"demo"},e.children))}var Ue=a(125);function Be(e){return r.a.createElement(De,{title:"Mastercard and VISA"},r.a.createElement(Ue.a,{environment:"TEST",paymentRequest:{apiVersion:2,apiVersionMinor:0,allowedPaymentMethods:[{type:"CARD",parameters:{allowedAuthMethods:["PAN_ONLY","CRYPTOGRAM_3DS"],allowedCardNetworks:["MASTERCARD","VISA"]},tokenizationSpecification:{type:"PAYMENT_GATEWAY",parameters:{gateway:"example",gatewayMerchantId:"exampleGatewayMerchantId"}}}],merchantInfo:{merchantId:"12345678901234567890",merchantName:"Demo Merchant"},transactionInfo:{totalPriceStatus:"FINAL",totalPriceLabel:"Total",totalPrice:e.amount,currencyCode:"USD",countryCode:"US"}},onLoadPaymentData:function(e){console.log("Success",e)},existingPaymentMethodRequired:e.existingPaymentMethodRequired,buttonColor:e.buttonColor,buttonType:e.buttonType}))}var Ge=function(){var e=Object(n.useState)("100.00"),t=Object(K.a)(e,2),a=t[0],l=t[1],s=Object(n.useState)(!1),o=Object(K.a)(s,2),c=o[0],i=o[1],u=Object(n.useState)("default"),m=Object(K.a)(u,2),d=m[0],h=m[1],p=Object(n.useState)("buy"),f=Object(K.a)(p,2),v=f[0],g=f[1];var b={amount:a,existingPaymentMethodRequired:c,buttonColor:d,buttonType:v};return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"params"},r.a.createElement("label",null,r.a.createElement("span",null,"Default amount:"),r.a.createElement("input",{type:"text",defaultValue:a,onBlur:function(e){l(e.target.value)}})),r.a.createElement("label",null,r.a.createElement("span",null,"Payment method required:"),r.a.createElement("select",{onChange:function(e){i("yes"===e.target.value)},value:c?"yes":"no"},r.a.createElement("option",{value:"no"},"No"),r.a.createElement("option",{value:"yes"},"Yes"))),r.a.createElement("label",null,r.a.createElement("span",null,"Button color:"),r.a.createElement("select",{onChange:function(e){h(e.target.value)},value:d},r.a.createElement("option",{value:"default"},"default"),r.a.createElement("option",{value:"black"},"black"),r.a.createElement("option",{value:"white"},"white"))),r.a.createElement("label",null,r.a.createElement("span",null,"Button type:"),r.a.createElement("select",{onChange:function(e){g(e.target.value)},value:v},r.a.createElement("option",{value:"buy"},"buy"),r.a.createElement("option",{value:"plain"},"plain"),r.a.createElement("option",{value:"donate"},"donate"),r.a.createElement("option",{value:"long"},"long"),r.a.createElement("option",{value:"short"},"short")))),r.a.createElement(Be,b))},_e=function(e){Object(k.a)(a,e);var t=Object(w.a)(a);function a(e){var n;return Object(b.a)(this,a),(n=t.call(this,e)).logOut=n.logOut.bind(Object(y.a)(n)),n.state={showModeratorBoard:!1,showAdminBoard:!1,currentUser:void 0},Te.listen((function(t){e.dispatch({type:"CLEAR_MESSAGE"})})),n}return Object(E.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.user;e&&this.setState({currentUser:e})}},{key:"isLoggedIn",value:function(){return x.isLoggedIn()}},{key:"logOut",value:function(){this.props.dispatch((function(e){x.logout(),e({type:"LOGOUT"})}))}},{key:"render",value:function(){var e=localStorage.getItem("user");return r.a.createElement(N.c,{history:Te},r.a.createElement("div",null,r.a.createElement("nav",{className:"navbar navbar-expand navbar-dark bg-dark"},r.a.createElement(O.a,{to:"/",className:"navbar-brand"},"Sid Blog"),r.a.createElement("div",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(O.a,{to:"/home",className:"nav-link"},"Home"))),e?r.a.createElement("div",{className:"navbar-nav ml-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{href:"/home",className:"nav-link",onClick:this.logOut},"LogOut")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(O.a,{to:"/upload",className:"nav-link"},"Upload")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(O.a,{to:"/eventGrid",className:"nav-link"},"EventGrid"))):r.a.createElement("div",{className:"navbar-nav ml-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(O.a,{to:"/login",className:"nav-link"},"Login")),r.a.createElement("div",{className:"navbar-nav ml-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(O.a,{to:"/register",className:"nav-link"},"Sign Up"))))),r.a.createElement("div",{className:"container mt-3"},r.a.createElement(N.d,null,r.a.createElement(N.b,{exact:!0,path:["/","/home"],component:H}),r.a.createElement(N.b,{exact:!0,path:"/login",component:D}),r.a.createElement(N.b,{exact:!0,path:"/register",component:W}),e?r.a.createElement(N.b,{exact:!0,path:"/upload",component:Re}):r.a.createElement(N.b,{exact:!0,path:"/upload",component:D}),e?r.a.createElement(N.b,{exact:!0,path:"/eventGrid",component:fe}):r.a.createElement(N.b,{exact:!0,path:"/eventGrid",component:D}),r.a.createElement(N.b,{exact:!0,path:"/d3",component:Ie}),r.a.createElement(N.b,{exact:!0,path:"/payment",component:Ge})))))}}]),a}(n.Component);var Ve=Object(o.b)((function(e){return{user:e.auth.user}}))(_e);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(o.a,{store:g},r.a.createElement(Ve,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[168,1,2]]]);
//# sourceMappingURL=main.a4d14782.chunk.js.map