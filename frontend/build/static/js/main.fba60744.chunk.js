(this["webpackJsonpexercise-tracker"]=this["webpackJsonpexercise-tracker"]||[]).push([[2],{13:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var c=n(0),i=Object(c.createContext)({isLoggedIn:!1,userId:null,token:null,login:function(){},logout:function(){}})},19:function(e,t,n){"use strict";var c=n(1);n(0),n(45);t.a=function(e){return Object(c.jsx)("div",{className:"".concat(e.asOverlay&&"loading-spinner__overlay"),children:Object(c.jsx)("div",{className:"lds-dual-ring"})})}},20:function(e,t,n){"use strict";var c=n(1),i=(n(0),n(7)),s=n.n(i);n(43);t.a=function(e){return s.a.createPortal(Object(c.jsx)("div",{className:"backdrop",onClick:e.onClick}),document.getElementById("backdrop-hook"))}},32:function(e,t,n){},33:function(e,t,n){},38:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var c,i=n(1),s=n(0),a=n.n(s),r=n(7),l=n.n(r),o=n(2),j=n(9),u=n(13),d=n(11);var b=function(){var e=Object(s.useState)(),t=Object(d.a)(e,2),n=t[0],i=t[1],a=Object(s.useState)(),r=Object(d.a)(a,2),l=r[0],o=r[1],j=Object(s.useState)(),u=Object(d.a)(j,2),b=u[0],x=u[1],O=Object(s.useCallback)((function(e,t,n){o(e),i(t);var c=n||new Date((new Date).getTime()+36e5);x(c),localStorage.setItem("userData",JSON.stringify({userId:e,token:t,expiration:c.toISOString()}))}),[]),h=Object(s.useCallback)((function(){i(null),o(null),x(null),localStorage.removeItem("userData")}),[]);return Object(s.useEffect)((function(){if(n&&b){var e=b.getTime()-(new Date).getTime();c=setTimeout(h,e)}else clearTimeout(c)}),[n,h,b]),Object(s.useEffect)((function(){var e=JSON.parse(localStorage.getItem("userData"));e&&e.token&&new Date(e.expiration)>new Date&&O(e.userId,e.token,new Date(e.expiration))}),[O]),{token:n,login:O,logout:h,userId:l}};n(32);var x=function(e){return Object(i.jsx)("div",{children:Object(i.jsx)("header",{className:"main-header",children:e.children})})};n(33);var O=function(e){var t=Object(s.useContext)(u.a);return Object(i.jsx)("div",{children:Object(i.jsxs)("ul",{className:"nav-links",children:[t.isLoggedIn&&Object(i.jsx)("li",{children:Object(i.jsxs)(j.c,{to:"/exercises/".concat(t.userId),exact:!0,children:[" ","My Exercises"]})}),t.isLoggedIn&&Object(i.jsx)("li",{children:Object(i.jsxs)(j.c,{to:"/exercises/create",exact:!0,children:[" ","Create Exercise"]})}),!t.isLoggedIn&&Object(i.jsx)("li",{children:Object(i.jsx)(j.c,{to:"/users/login",children:"Login"})}),!t.isLoggedIn&&Object(i.jsx)("li",{children:Object(i.jsx)(j.c,{to:"/users/signup",children:"Sign Up"})}),t.isLoggedIn&&Object(i.jsx)("li",{children:Object(i.jsx)("button",{onClick:t.logout,children:" Logout "})})]})})},h=n(49);n(38);var g=function(e){var t=Object(i.jsx)("div",{children:Object(i.jsx)(h.a,{in:e.show,timeout:200,classNames:"slide-in-left",mountOnEnter:!0,unmountOnExit:!0,children:Object(i.jsx)("aside",{className:"side-drawer",onClick:e.onClick,children:e.children})})});return l.a.createPortal(t,document.getElementById("drawer-hook"))},m=n(20);n(44);var f=function(e){var t=Object(s.useState)(!1),n=Object(d.a)(t,2),c=n[0],a=n[1];function r(){a(!1)}return Object(i.jsxs)("div",{children:[c&&Object(i.jsx)(m.a,{onClick:r}),Object(i.jsx)(g,{show:c,onClick:r,children:Object(i.jsx)("nav",{className:"main-navigation__drawer-nav",children:Object(i.jsx)(O,{})})}),Object(i.jsxs)(x,{children:[Object(i.jsxs)("button",{className:"main-navigation__menu-btn",onClick:function(){a(!0)},children:[Object(i.jsx)("span",{}),Object(i.jsx)("span",{}),Object(i.jsx)("span",{})]}),Object(i.jsx)("h1",{className:"main-navigation__title center",children:Object(i.jsx)(j.b,{to:"/",children:"ExerApp"})}),Object(i.jsx)("nav",{className:"main-navigation__header-nav",children:Object(i.jsx)(O,{})})]})]})},v=n(19),p=(n(46),a.a.lazy((function(){return n.e(9).then(n.bind(null,183))}))),k=a.a.lazy((function(){return Promise.all([n.e(1),n.e(11)]).then(n.bind(null,184))})),I=a.a.lazy((function(){return Promise.all([n.e(1),n.e(10)]).then(n.bind(null,185))})),N=a.a.lazy((function(){return Promise.all([n.e(0),n.e(6)]).then(n.bind(null,186))})),w=a.a.lazy((function(){return Promise.all([n.e(8),n.e(7)]).then(n.bind(null,188))})),S=a.a.lazy((function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,187))}));var y=function(){var e,t=b(),n=t.token,c=t.login,a=t.logout,r=t.userId;return e=n?Object(i.jsxs)(o.c,{children:[Object(i.jsx)(o.a,{path:"/exercises/create",exact:!0,children:Object(i.jsx)(N,{})}),Object(i.jsx)(o.a,{path:"/exercises/update/:eId",exact:!0,children:Object(i.jsx)(S,{})}),Object(i.jsx)(o.a,{path:"/exercises/:userId",children:Object(i.jsx)(w,{})}),Object(i.jsx)(o.a,{component:w})]}):Object(i.jsxs)(o.c,{children:[Object(i.jsx)(o.a,{path:"/",exact:!0,children:Object(i.jsx)(p,{})}),Object(i.jsx)(o.a,{path:"/users/signup",exact:!0,children:Object(i.jsx)(k,{})}),Object(i.jsx)(o.a,{path:"/users/login",exact:!0,children:Object(i.jsx)(I,{})}),Object(i.jsx)(o.a,{component:p})]}),Object(i.jsx)(u.a.Provider,{value:{isLoggedIn:!!n,token:n,userId:r,login:c,logout:a},children:Object(i.jsx)(j.a,{children:Object(i.jsx)("div",{className:"container d-flex flex-column min-vh-100",children:Object(i.jsxs)("div",{className:"wrapper flex-grow-1",children:[Object(i.jsx)(f,{}),Object(i.jsx)(o.c,{children:Object(i.jsx)(s.Suspense,{fallback:Object(i.jsx)("div",{className:"center",children:Object(i.jsx)(v.a,{})}),children:e})})]})})})})};l.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(y,{})}),document.getElementById("root"))}},[[47,3,4]]]);
//# sourceMappingURL=main.fba60744.chunk.js.map