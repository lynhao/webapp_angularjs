"use strict";angular.module("app",["ui.router","ngCookies","validation","ngAnimate"]),angular.module("app").value("dict",{}).run(["dict","$http",function(t,e){e.get("/data/city.json").success(function(e){t.city=e}),e.get("/data/salary.json").success(function(e){t.salary=e}),e.get("/data/scale.json").success(function(e){t.scale=e})}]),angular.module("app").config(["$provide",function(t){t.decorator("$http",["$delegate","$q",function(t,e){return t.post=function(n,i,o){var a=e.defer();return t.get(n).success(function(t){a.resolve(t)}).error(function(t){a.reject(t)}),{success:function(t){a.promise.then(t)},error:function(t){a.promise.then(null,t)}}},t}])}]),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/company.html",controller:"companyCtrl"}).state("search",{url:"/search",templateUrl:"view/search.html",controller:"searchCtrl"}).state("login",{url:"/login",templateUrl:"view/login.html",controller:"loginCtrl"}).state("register",{url:"/register",templateUrl:"view/register.html",controller:"registerCtrl"}).state("me",{url:"/me",templateUrl:"view/me.html",controller:"meCtrl"}).state("post",{url:"/post",templateUrl:"view/post.html",controller:"postCtrl"}).state("favorite",{url:"/favorite",templateUrl:"view/favorite.html",controller:"favoriteCtrl"}),e.otherwise("main")}]),angular.module("app").config(["$validationProvider",function(t){var e={phone:/^1[\d]{10}$/,password:function(t){var e=t+"";return e.length>5},required:function(t){return!!t}},n={phone:{success:"",error:"必须是十一位手机号"},password:{success:"",error:"长度至少6位"},required:{success:"",error:"不能为空"}};t.setExpression(e).setDefaultMsg(n)}]),angular.module("app").controller("companyCtrl",["$scope","$http","$state",function(t,e,n){e.get("/data/company.json?id="+n.params.id).success(function(e){t.company=e})}]),angular.module("app").controller("favoriteCtrl",["$scope","$http",function(t,e){e.get("data/myFavorite.json").success(function(e){t.list=e})}]),angular.module("app").controller("loginCtrl",["$scope","$http","$state","cache",function(t,e,n,i){t.submit=function(){e.post("data/login.json",t.user).success(function(t){i.put("id",t.id),i.put("name",t.name),i.put("image",t.image),n.go("main")})}}]),angular.module("app").controller("mainCtrl",["$scope","$http",function(t,e){e.get("/data/positionList.json").success(function(e){t.list=e})}]),angular.module("app").controller("meCtrl",["cache","$scope","$http","$state",function(t,e,n,i){t.get("name")&&(e.name=t.get("name"),e.image=t.get("image")),e.logout=function(){t.remove("id"),t.remove("name"),t.remove("image"),i.go("main")}}]),angular.module("app").controller("positionCtrl",["$q","$scope","$http","$state","cache","$log",function(t,e,n,i,o,a){function r(){var o=t.defer();return n.get("/data/position.json?id="+i.params.id).success(function(t){e.position=t,t.posted&&(e.message="已投递"),o.resolve(t)}).error(function(t){o.reject(t)}),o.promise}function s(t){n.get("/data/company.json?id="+t).success(function(t){e.company=t})}e.isLogin=!!o.get("name"),e.message=e.isLogin?"投个简历":"去登陆",r().then(function(t){s(t.companyId)}),e.go=function(){"已投递"!==e.message&&(e.isLogin?n.post("data/handle.json",{id:e.position.id}).success(function(t){a.info(t),e.message="已投递"}):i.go("login"))}}]),angular.module("app").controller("postCtrl",["$scope","$http",function(t,e){t.tabList=[{id:"all",name:"全部"},{id:"pass",name:"面试邀请"},{id:"fail",name:"不合适"}],e.get("data/myPost.json").success(function(e){t.positionList=e}),t.filterObj={},t.tClick=function(e,n){switch(e){case"all":delete t.filterObj.state;break;case"pass":t.filterObj.state="1";break;case"fail":t.filterObj.state="-1"}}}]),angular.module("app").controller("registerCtrl",["$scope","$http","$interval","$state",function(t,e,n,i){t.submit=function(){e.post("data/regist.json",t.user).success(function(t){i.go("login")})};var o=60;t.send=function(){e.get("data/code.json").success(function(e){if(1===e.state){o=60,t.time="60s";var i=n(function(){return o<=0?(n.cancel(i),void(t.time="")):(o--,void(t.time=o+"s"))},1e3)}})}}]),angular.module("app").controller("searchCtrl",["dict","$http","$scope",function(t,e,n){n.name="",n.search=function(){e.get("data/positionList.json?name="+n.name).success(function(t){n.positionList=t})},n.search(),n.sheet={},n.tabList=[{id:"city",name:"城市"},{id:"salary",name:"薪水"},{id:"scale",name:"公司规模"}],n.filterObj={};var i="";n.tClick=function(e,o){i=e,n.sheet.list=t[e],n.sheet.visible=!0},n.sClick=function(t,e){t?(angular.forEach(n.tabList,function(t){t.id===i&&(t.name=e)}),n.filterObj[i+"Id"]=t):(delete n.filterObj[i+"Id"],angular.forEach(n.tabList,function(t){if(t.id===i)switch(t.id){case"city":t.name="城市";break;case"salary":t.name="薪水";break;case"scale":t.name="公司规模"}}))}}]),angular.module("app").directive("appCompany",[function(){return{restrict:"A",replace:!0,scope:{com:"="},templateUrl:"view/template/company.html"}}]),angular.module("app").directive("appFoot",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/foot.html"}}]),angular.module("app").directive("appHead",["cache",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/head.html",link:function(e){e.name=t.get("name")||""}}}]),angular.module("app").directive("appHeadBar",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/headBar.html",scope:{text:"@"},link:function(t,e,n){t.back=function(){window.history.back()}}}}]),angular.module("app").directive("appPositionClass",[function(){return{restrict:"A",replace:!0,scope:{com:"="},templateUrl:"view/template/positionClass.html",link:function(t){t.showPositionList=function(e){t.positionList=t.com.positionClass[e].positionList,t.isActive=e},t.$watch("com",function(e){e&&t.showPositionList(0)})}}}]),angular.module("app").directive("appPositionInfo",["$http",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/positionInfo.html",scope:{isActive:"=",isLogin:"=",pos:"="},link:function(e){e.$watch("pos",function(t){t&&(e.pos.select=e.pos.select||!1,e.imagePath=e.pos.select?"image/star-active.png":"image/star.png")}),e.favorite=function(){t.post("data/favorite.json",{id:e.pos.id,select:!e.pos.select}).success(function(t){e.pos.select=!e.pos.select,e.imagePath=e.pos.select?"image/star-active.png":"image/star.png"})}}}}]),angular.module("app").directive("appPositionList",["$http",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/positionList.html",scope:{data:"=",filterObj:"=",isFavorite:"="},link:function(e){e.select=function(e){t.post("data/favorite.json",{id:e.id,select:!e.select}).success(function(t){e.select=!e.select})}}}}]),angular.module("app").directive("appSheet",[function(){return{restrict:"A",replace:!0,scope:{list:"=",visible:"=",select:"&"},templateUrl:"view/template/sheet.html"}}]),angular.module("app").directive("appTab",[function(){return{restrict:"A",replace:!0,scope:{list:"=",tabClick:"&"},templateUrl:"view/template/tab.html",link:function(t){t.click=function(e){t.selectId=e.id,t.tabClick(e)}}}}]),angular.module("app").filter("filterByObj",[function(){return function(t,e){var n=[];return angular.forEach(t,function(t){var i=!0;for(var o in e)t[o]!==e[o]&&(i=!1);i&&n.push(t)}),n}}]),angular.module("app").service("cache",["$cookies",function(t){this.put=function(e,n){t.put(e,n)},this.get=function(e){return t.get(e)},this.remove=function(e){return t.remove(e)}}]);