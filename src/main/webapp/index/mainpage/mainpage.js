"use strict";!function(n){n.controller("MainCtr",["$scope","$timeout",function(n,e){n.thinLeftNav=Boolean(Number(localStorage.getItem("thinLeftNav"))),n.switchThinNav=function(){n.thinLeftNav=!n.thinLeftNav,localStorage.setItem("thinLeftNav",String(Number(n.thinLeftNav)))};var t=function(){n.lowResolution=document.body.clientWidth<1135};t(),window.addEventListener("resize",function(){e(t)})}]),n.component("memoryDatabaseWarning",{template:'\n      <div class="page-prompt" ng-if="$ctrl.isInMemoryDatabase && !$ctrl.userHide">\n        <div class="page-prompt-text">为了方便试用DOME，目前正在使用内存数据库。数据库数据会在 DomeOS 服务器重启时丢失。您可以配置 MySQL 作为持久化数据库。配置 MySQL 数据库的方法详见<a href="{{ $ctrl.documentUrl }}" target="_blank">使用文档</a>。</div>\n        <icon-close class="page-prompt-close" ng-click="$ctrl.hideWarning()"></icon-close>\n      </div>\n    ',bindings:{},controller:["api","dialog","documentUrl",function(n,e,t){var o=this;o.documentUrl=t,o.isInMemoryDatabase=null,o.userHide=!1,n.global.isInMemoryDatabase().then(function(n){o.isInMemoryDatabase=n}),o.hideWarning=function(){o.userHide=!0}}]}),n.component("headerAction",{template:'\n      <ul class="header-action-container" ng-show="$ctrl.user.name">\n        <li class="header-action-item header-action-document">\n          <a href="{{ $ctrl.documentUrl }}"><icon-document></icon-document>文档</a>\n        </li>\n        <li id="header-action-user" class="header-action-item header-action-user">\n          <a href="javascript:;">\n            <icon-user></icon-user>\n            <span ng-bind="$ctrl.user.name"></span>\n          </a>\n          <ul class="header-action-user-drop-down" ng-show="$ctrl.showUserMenu">\n            <li class="header-action-user-drop-down-item"><a href="javascript:;" ng-click="$ctrl.editMyInfo()">修改资料</a></li>\n            <li class="header-action-user-drop-down-item"><a href="javascript:;" ng-if="$ctrl.mayEditMyPassword" ng-click="$ctrl.editMyPassword()">修改密码</a></li>\n            <li class="header-action-user-drop-down-item"><a href="javascript:;" ng-click="$ctrl.logout()">退出登录</a></li>\n          </ul>\n          <div class="header-action-user-drop-down-triangle" ng-show="$ctrl.showUserMenu"></div>\n        </li>\n      </ul>\n    ',bindings:{},controller:["api","dialog","userDialog","documentUrl","logoutUrl","$timeout",function(n,e,t,o,a,i){var c=this;c.documentUrl=o,c.mayEditMyPassword=!1,n.user.whoami().then(function(n){var e=n.name,t=n.loginType,o=n.isAdmin;c.user={name:e,loginType:t,isAdmin:o},"USER"===t&&(c.mayEditMyPassword=!0)}),angular.element("#header-action-user").on("focusin",function(){c.showUserMenu=!0,i(function(){})}),angular.element("#header-action-user").on("focusout",function(){c.showUserMenu=!1,i(function(){})}),c.editMyInfo=function(){n.user.whoami().then(function(e){t.editInfo(e),n.user.whoami(!0)})},c.editMyPassword=function(){t.editPassword(c.user.name)},c.logout=function(){location.href=a+"?from="+encodeURIComponent(location.protocol+"//"+location.host)}}]}),n.component("leftNav",{template:'\n      <div id="left-nav" class="left-nav-container" role="navigation">\n        <ul class="left-nav-list">\n          <li class="left-nav-item {{ group.classname }}" ng-repeat="group in menu track by $index" ng-class="{ \'left-nav-unfold\': group.unfold, \'left-nav-active\': group.active }">\n            <a class="left-nav-item-link" href="javascript:;" ng-click="click(group)">\n              <span class="left-nav-icon"><nav-icon type="{{ group.icon }}"></nav-icon></span>\n              <span class="left-nav-text" ng-bind="group.text"></span>\n              <span class="left-nav-fold" ng-if="group.children && group.children.length">\n                <icon-right-arrow ng-show="!group.unfold"></icon-right-arrow>\n                <icon-down-arrow ng-show="group.unfold"></icon-down-arrow>\n              </span>\n            </a>\n            <ul class="left-nav-sub-menu" ng-if="group.children && group.children.length" ng-style="{ \'max-height\': group.children.length * 47 - 2 }">\n              <li class="left-nav-item" ng-repeat="item in group.children" ng-class="{ \'left-nav-active-item\': item.active }">\n                <a class="left-nav-item-link" href="javascript:;" ng-click="click(item)">\n                  <span class="left-nav-text" ng-bind="item.text"></span>\n                </a>\n              </li>\n            </ul>\n          </li>\n        </ul>\n      </div>\n    ',bindings:{},controller:["$state","$scope","$rootScope","api",function(n,e,t,o){e.menu=[];var a=function(){for(var t=[],o=n.current;o;){t.push(o.name);var a=o.ncyBreadcrumb&&o.ncyBreadcrumb.parent;if("function"==typeof a&&(a=a({})),a&&(a=a.replace(/\(.*$/g,"")),!a)break;o=n.get(a)}!function n(e){return e.map(function(e){return e.active=n(e.children||[])||t.indexOf(e.page)!==-1}).reduce(function(n,e){return n||e},!1)}(e.menu),e.menu.forEach(function(n){n.unfold=n.active})},i=function(n){e.menu=[{classname:"logo-container",icon:"domeos",text:"DomeOS",page:"overview"},{icon:"development",text:"开发集成",children:[{text:"项目",page:"projectCollectionManage"},{text:"镜像",page:"imageCollectionManage"}]},{icon:"operation",text:"运维管理",children:[{text:"服务",page:"deployCollectionManage"},{text:"集群",page:"clusterManage"},{text:"负载均衡",page:"loadBalanceCollection"},{text:"配置集合",page:"configMapCollection"},{text:"应用商店",page:"appStore"}]},{icon:"monitor",text:"监控报警",children:[{text:"监控",page:"monitor"},{text:"报警",page:"alarm"}]}].concat(n?[{icon:"setting",text:"全局设置",page:"globalSetting"}]:[]),a()};o.user.whoami().then(function(n){var e=n.isAdmin;i(e)}),e.click=function(t){t.page?n.go(t.page):(t.unfold=!t.unfold,t.unfold&&e.menu.forEach(function(n){n.unfold=n===t}))},t.$on("$stateChangeSuccess",function(){a()}),setTimeout(function(){yaSimpleScrollbar.attach(document.getElementById("left-nav"))},0)}]}),n.component("navIcon",{template:'\n      <i class="icon icon-nav {{ $ctrl.classname() }}"></i>\n    ',bindings:{type:"@"},controller:[function(){var n=this;n.classname=function(){return{domeos:"domeos-logo",development:"fa fa-th-large",operation:"glyphicon glyphicon-stats",monitor:"fa fa-bell-o",setting:"fa fa-cog"}[n.type]}}]})}(angular.module("domeApp"));