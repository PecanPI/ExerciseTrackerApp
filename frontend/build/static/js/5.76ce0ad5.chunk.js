(this["webpackJsonpexercise-tracker"]=this["webpackJsonpexercise-tracker"]||[]).push([[5],{187:function(e,t,n){"use strict";n.r(t);var a=n(54),r=n.n(a),i=n(55),c=n(11),s=n(1),o=n(0),u=n(2),l=n(66),d=n(61),b=n(53),j=n(90),p=n.n(j),f=n(58),h=n(67),v=n(59),O=n(19),x=n(60),m=n(13);n(70),n(89);t.default=function(e){var t=Object(o.useContext)(m.a),n=Object(x.a)(),a=n.isLoading,j=n.error,y=n.sendRequest,V=n.clearError,g=Object(o.useState)(),N=Object(c.a)(g,2),C=N[0],w=N[1],E=Object(u.g)().eId,T=Object(u.f)(),I=Object(o.useState)(new Date),k=Object(c.a)(I,2),A=k[0],S=k[1],L=Object(h.a)({title:{value:"",isValid:!1},bodyLocation:{value:"",isValid:!1},reps:{value:"",isValid:!1},sets:{value:"",isValid:!1},weight:{value:"",isValid:!1}},!1),H=Object(c.a)(L,3),R=H[0],_=H[1],B=H[2];function G(){return(G=Object(i.a)(r.a.mark((function e(n){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,e.next=4,y("".concat("https://exerapp.herokuapp.com","/exercises","/exercises/").concat(E),"PATCH",JSON.stringify({title:R.inputs.title.value,bodyLocation:R.inputs.bodyLocation.value,reps:R.inputs.reps.value,sets:R.inputs.sets.value,weight:R.inputs.weight.value,date:A,userId:t.userId}),{"Content-Type":"application/json",Authorization:"Bearer "+t.token});case 4:T.push("/exercises/".concat(t.userId)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[1,7]])})))).apply(this,arguments)}return Object(o.useEffect)((function(){function e(){return(e=Object(i.a)(r.a.mark((function e(){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y("".concat("https://exerapp.herokuapp.com","/exercises/").concat(t.userId,"/").concat(E),"GET",null,{Authorization:"Bearer "+t.token});case 3:n=e.sent,w(n.exercise),B({title:{value:n.exercise.title,isValid:!0},bodyLocation:{value:n.exercise.bodyLocation,isValid:!0},reps:{value:Number(n.exercise.reps),isValid:!0},sets:{value:Number(n.exercise.sets),isValid:!0},weight:{value:Number(n.exercise.weight),isValid:!0}},!0),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[y,E,B,t]),a?Object(s.jsx)("div",{className:"center",children:Object(s.jsx)(O.a,{onOverlay:!0})}):C||j?Object(s.jsxs)("div",{children:[Object(s.jsx)(v.a,{error:j,onClear:V}),C&&Object(s.jsxs)("form",{className:"exercise-form",onSubmit:function(e){return G.apply(this,arguments)},children:[Object(s.jsx)(l.a,{id:"title",type:"text",label:"Title",element:"input",validators:[Object(f.e)()],errorText:"Please enter a valid Title",onInput:_,initialValue:C.title,initialValid:!0}),Object(s.jsx)(l.a,{id:"bodyLocation",label:"Body Location",type:"text",element:"input",validators:[Object(f.e)()],errorText:"Please enter a Body Location",onInput:_,initialValue:C.bodyLocation,initialValid:!0}),Object(s.jsx)(l.a,{id:"reps",label:"Reps",element:"input",validators:[Object(f.c)()],errorText:"Value needs to be a number",onInput:_,initialValue:C.reps,initialValid:!0}),Object(s.jsx)(l.a,{id:"sets",label:"Sets",element:"input",validators:[Object(f.c)()],errorText:"Value needs to be a number",onInput:_,initialValue:C.sets,initialValid:!0}),Object(s.jsx)(l.a,{id:"weight",label:"Weight (lbs)",element:"input",validators:[Object(f.c)()],errorText:"Value needs to be a number",onInput:_,initialValue:C.weight,initialValid:!0}),Object(s.jsx)("div",{className:"form-group",children:Object(s.jsx)(p.a,{id:"date",label:"Date",selected:A,value:A,onChange:function(e){S(e)},name:"date",onInput:_,initialValue:C.date})}),Object(s.jsx)(b.a,{type:"submit",disabled:!R.isValid,children:"UPDATE EXERCISE"})]})]}):Object(s.jsx)("div",{className:"center",children:Object(s.jsx)(d.a,{children:Object(s.jsx)("h2",{children:"Could not find Exercise with that id!"})})})}},53:function(e,t,n){"use strict";var a=n(1),r=(n(0),n(9));n(57);t.a=function(e){return e.href?Object(a.jsx)("a",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),href:e.href,children:e.children}):e.to?Object(a.jsx)(r.b,{to:e.to,exact:e.exact,className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),children:e.children}):Object(a.jsx)("button",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),type:e.type,onClick:e.onClick,disabled:e.disabled,children:e.children})}},57:function(e,t,n){},58:function(e,t,n){"use strict";n.d(t,"e",(function(){return l})),n.d(t,"b",(function(){return d})),n.d(t,"d",(function(){return b})),n.d(t,"a",(function(){return j})),n.d(t,"c",(function(){return p})),n.d(t,"f",(function(){return f}));var a=n(74),r="REQUIRE",i="MINLENGTH",c="MAXLENGTH",s="EMAIL",o="MATCH",u="NUMBER",l=function(){return{type:r}},d=function(e){return{type:i,val:e}},b=function(e){return{type:o,val:e}},j=function(){return{type:s}},p=function(){return{type:u}},f=function(e,t){var n,l=!0,d=Object(a.a)(t);try{for(d.s();!(n=d.n()).done;){var b=n.value;b.type===r&&(l=l&&e.trim().length>0),b.type===i&&(l=l&&e.trim().length>=b.val),b.type===o&&(l=l&&e.trim()===b.val.trim()),b.type===c&&(l=l&&e.trim().length<=b.val),b.type===u&&(e=Number(e),l=l&&!isNaN(e)),"MIN"===b.type&&(l=l&&+e>=b.val),"MAX"===b.type&&(l=l&&+e<=b.val),b.type===s&&(l=l&&/^\S+@\S+\.\S+$/.test(e))}}catch(j){d.e(j)}finally{d.f()}return l}},59:function(e,t,n){"use strict";var a=n(1),r=(n(0),n(63)),i=n(53);t.a=function(e){return Object(a.jsx)(r.a,{onCancel:e.onClear,header:"An Error Occurred!",show:!!e.error,footer:Object(a.jsx)(i.a,{onClick:e.onClear,children:"Okay"}),children:Object(a.jsx)("p",{children:e.error})})}},60:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(54),r=n.n(a),i=n(55),c=n(11),s=n(0);function o(){var e=Object(s.useState)(!1),t=Object(c.a)(e,2),n=t[0],a=t[1],o=Object(s.useState)(),u=Object(c.a)(o,2),l=u[0],d=u[1],b=Object(s.useRef)([]),j=Object(s.useCallback)(function(){var e=Object(i.a)(r.a.mark((function e(t){var n,i,c,s,o,u,l=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=l.length>1&&void 0!==l[1]?l[1]:"GET",i=l.length>2&&void 0!==l[2]?l[2]:null,c=l.length>3&&void 0!==l[3]?l[3]:{},a(!0),s=new AbortController,b.current.push(s),e.prev=6,e.next=9,fetch(t,{method:n,body:i,headers:c,signal:s.signal});case 9:return o=e.sent,e.next=12,o.json();case 12:if(u=e.sent,b.current=b.current.filter((function(e){return e!==s})),o.ok){e.next=16;break}throw new Error(u.message);case 16:return a(!1),e.abrupt("return",u);case 20:throw e.prev=20,e.t0=e.catch(6),d(e.t0.message||"Something went wrong, please try again"),a(!1),e.t0;case 25:case"end":return e.stop()}}),e,null,[[6,20]])})));return function(t){return e.apply(this,arguments)}}(),[]);return Object(s.useEffect)((function(){return function(){b.current.forEach((function(e){return e.abort()}))}}),[]),{isLoading:n,error:l,sendRequest:j,clearError:function(){d(null)}}}},61:function(e,t,n){"use strict";var a=n(1);n(0),n(64);t.a=function(e){return Object(a.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})}},63:function(e,t,n){"use strict";var a=n(56),r=n(1),i=n(0),c=n.n(i),s=n(7),o=n.n(s),u=n(49),l=n(20);n(65);function d(e){var t=Object(r.jsx)(c.a.Fragment,{children:Object(r.jsxs)("div",{className:"modal ".concat(e.className),style:e.style,children:[Object(r.jsx)("header",{className:"modal__header ".concat(e.headerClass),children:Object(r.jsx)("h2",{children:e.header})}),Object(r.jsxs)("form",{onSubmit:e.onSubmit?e.onSubmit:function(e){return e.preventDefault()},children:[Object(r.jsx)("div",{className:"modal__content ".concat(e.contentClass),children:e.children}),Object(r.jsx)("footer",{className:"modal__footer ".concat(e.footerClass),children:e.footer})]})]})});return o.a.createPortal(t,document.getElementById("modal-hook"))}t.a=function(e){return Object(r.jsxs)("div",{children:[e.show&&Object(r.jsx)(l.a,{onClick:e.onCancel}),Object(r.jsx)(u.a,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:200,classNames:"modal",children:Object(r.jsx)(d,Object(a.a)({},e))})]})}},64:function(e,t,n){},65:function(e,t,n){},66:function(e,t,n){"use strict";var a=n(11),r=n(56),i=n(1),c=n(0),s=n(58);n(69);function o(e,t){switch(t.type){case"CHANGE":return Object(r.a)(Object(r.a)({},e),{},{value:t.val,isValid:Object(s.f)(t.val,t.validators)});case"TOUCH":return Object(r.a)(Object(r.a)({},e),{},{isTouched:!0});default:return e}}t.a=function(e){var t=Object(c.useReducer)(o,{value:e.initialValue||"",isValid:e.initialValid||!1,isTouched:!1}),n=Object(a.a)(t,2),r=n[0],s=n[1],u=e.id,l=e.onInput,d=r.value,b=r.isValid;function j(t){s({type:"CHANGE",val:t.target.value,validators:e.validators})}function p(){s({type:"TOUCH"})}Object(c.useEffect)((function(){l(u,d,b)}),[u,d,b,l]);var f="input"===e.element?Object(i.jsx)("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:j,onBlur:p,value:r.value}):Object(i.jsx)("textarea",{id:e.id,rows:e.rows||3,onChange:j,onBlur:p,value:r.value});return Object(i.jsx)("div",{children:Object(i.jsxs)("div",{className:"form-control ".concat(!r.isValid&&r.isTouched&&"form-control--invalid"),children:[Object(i.jsxs)("label",{htmlFor:e.id,children:[e.label," "]}),f,!r.isValid&&r.isTouched&&Object(i.jsx)("p",{children:e.errorText})]})})}},67:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(11),r=n(62),i=n(56),c=n(0);function s(e,t){switch(t.type){case"INPUT_CHANGE":var n=!0;for(var a in e.inputs)e.inputs[a]&&(n=a===t.inputId?n&&t.isValid:n&&e.inputs[a].isValid);return Object(i.a)(Object(i.a)({},e),{},{inputs:Object(i.a)(Object(i.a)({},e.inputs),{},Object(r.a)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:n});case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}}function o(e,t){var n=Object(c.useReducer)(s,{inputs:e,isValid:t}),r=Object(a.a)(n,2),i=r[0],o=r[1];return[i,Object(c.useCallback)((function(e,t,n){o({type:"INPUT_CHANGE",value:t,isValid:n,inputId:e})}),[]),Object(c.useCallback)((function(e,t){o({type:"SET_DATA",inputs:e,formIsValid:t})}),[])]}},69:function(e,t,n){},70:function(e,t,n){}}]);
//# sourceMappingURL=5.76ce0ad5.chunk.js.map