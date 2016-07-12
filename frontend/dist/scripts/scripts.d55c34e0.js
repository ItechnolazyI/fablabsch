"use strict";angular.module("frontendApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngMaterial","uiGmapgoogle-maps","wu.masonry","linkify"]).config(["$routeProvider",function(a){a.when("/news",{templateUrl:"views/news.html",controller:"NewsCtrl",controllerAs:"news"}).when("/events",{templateUrl:"views/events.html",controller:"EventsCtrl",controllerAs:"events"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/space/:slug",{templateUrl:"views/space.html",controller:"SpaceCtrl",controllerAs:"space",resolve:{space:["api","$route",function(a,b){return a.getSpacePromiseBySlug(b.current.params.slug)}]}}).when("/map",{templateUrl:"views/map.html",controller:"MapCtrl",controllerAs:"map"}).when("/machine",{templateUrl:"views/machine.html",controller:"MachineCtrl",controllerAs:"machine"}).otherwise({redirectTo:"/news"})}]).config(["uiGmapGoogleMapApiProvider",function(a){a.configure({})}]).config(["$mdThemingProvider",function(a){a.definePalette("amazingPaletteName",{50:"e10707",100:"e10707",200:"e10707",300:"e10707",400:"e10707",500:"e10707",600:"e10707",700:"e10707",800:"e10707",900:"e10707",A100:"e10707",A200:"e10707",A400:"e10707",A700:"e10707",contrastDefaultColor:"light",contrastDarkColors:["50","100","200","300","400","A100"],contrastLightColors:void 0}),a.theme("default").primaryPalette("amazingPaletteName").accentPalette("amazingPaletteName")}]),angular.module("frontendApp").controller("NewsCtrl",["$scope","$http","api","API_ENDPOINT",function(a,b,c,d){function e(){!f.disabled&&$(".main").scrollTop()+$(".main").height()>$(".news").height()-200&&f.loadMore()}var f=this;f.posts=[],f.next=d+"api/posts?limit=10&offset=0",f.disabled=!0,f.loadMore=function(){f.disabled=!0,f.next&&b.get(f.next).then(function(a){f.posts=f.posts.concat(a.data.results),f.next=a.data.next,f.disabled=!1})},f.loadMore(),this.inFilter=function(a){return c.isSpaceVisible(a.space)},this.format=function(a){var b=a.split("\n\n");return 1===b.length?a:b.slice(1).join("<br/>")},a.$on("$destroy",function(){$(".main").unbind("scroll",e)}),$(".main").scroll(e)}]),angular.module("frontendApp").controller("AboutCtrl",function(){}),angular.module("frontendApp").controller("SpaceCtrl",["space",function(a){angular.extend(this,a),this.map={center:{latitude:a.latitude,longitude:a.longitude},zoom:9,options:{disableDefaultUI:!0}},this.marker={id:a.id,coords:{latitude:a.latitude,longitude:a.longitude},options:{icon:{url:a.marker,scaledSize:{width:64,height:64}},title:a.name}}}]),angular.module("frontendApp").controller("MapCtrl",["$http","$location","api",function(a,b,c){var d=this;a.get("styles/gmap.style.json").then(function(a){d.map={center:{latitude:46.84257184670688,longitude:7.5476379394531445},zoom:9,options:{styles:a.data,disableDefaultUI:!0}}}),c.ready.then(function(){d.spaces=c.spaces,d.markers=c.spaces.map(function(a){return{id:a.id,coords:{latitude:a.latitude,longitude:a.longitude},options:{icon:{url:a.marker,scaledSize:{width:64,height:64}},title:a.name},events:{click:function(){b.path("/space/"+a.slug)}}}})})}]),angular.module("frontendApp").controller("EventsCtrl",["$scope","$http","api","API_ENDPOINT",function(a,b,c,d){function e(a){for(var b=0;b<a.length;b++){var c=a[b];if(c.startdate=new Date(c.startdate),c.enddate=new Date(c.enddate),c.modified=new Date(c.modified),c.hasStartDateTime=!(0===c.startdate.getHours()&&0===c.startdate.getMinutes()),c.hasEndDateDifferent=!(c.enddate.getDate()===c.startdate.getDate()&&c.enddate.getMonth()===c.startdate.getMonth()&&c.enddate.getYear()===c.startdate.getYear()),c.hasEndDateTime=!(0===c.enddate.getHours()&&0===c.enddate.getMinutes()),c.description){var d=c.description.match(/(?:https?\:\/\/|www\.)+(?![^\s]*?")([\w.,@?!^=%&amp;:\/~+#-]*[\w@?!^=%&amp;\/~+#-])?/i);d&&(c.link=d[0])}var e=c.description.match(/#[a-z]+/gi)||[];c.tags=[],e.forEach(function(a){-1===c.tags.indexOf(a)&&c.tags.push(a)}),c.tags.sort()}return a}function f(){!g.disabled&&$(".main").scrollTop()+$(".main").height()>$(".news").height()-200&&g.loadMore()}var g=this;g.mode=1,g.events=[],a.$watch("events.mode",function(){g.next=d+"api/events?direction="+g.mode+"&limit=10&offset=0",g.events=[],g.loadMore()}),g.loadMore=function(){g.disabled=!0,g.next&&b.get(g.next).then(function(a){var b=e(a.data.results);g.events=g.events.concat(b),g.next=a.data.next,g.disabled=!1})},g.inFilter=function(a){return c.isSpaceVisible(a.space)},a.$on("$destroy",function(){$(".main").unbind("scroll",f)}),$(".main").scroll(f)}]),angular.module("frontendApp").controller("AppCtrl",["$mdSidenav","$location",function(a,b){this.toggleSidenav=function(){a("left").toggle()},this.isPath=function(a){return b.path().indexOf(a)>-1}}]),angular.module("frontendApp").controller("MachineCtrl",["api",function(a){function b(a){e.hasOwnProperty(a.type)||(e[a.type]=[]);for(var b=0;b<e[a.type].length;b++)if(e[a.type][b].id===a.id)return e[a.type][b];return a.spaces=[],e[a.type].push(a),a}function c(a,b){for(var c=0;c<a.spaces.length;c++)if(a.spaces[c]===b.id)return;a.spaces.push(b)}var d=this;d.categories=[{name:"3D Printing",type:"3d_printing"},{name:"Laser",type:"laser"},{name:"Vinyl Cutting",type:"vinyl_cutting"},{name:"CNC Miling",type:"cnc_miling"}];var e={};d.collectAttribute=function(a,b){return b.filter(function(b){return b.custom_data&&b.custom_data.hasOwnProperty(a)}).map(function(b){return b.custom_data[a]})},a.ready.then(function(){d.spaces=a.spaces.map(function(a){return a.machines={},a.resources.forEach(function(d){a.machines.hasOwnProperty(d.resource.type)||(a.machines[d.resource.type]=[]);var e=b(d.resource);c(e,a),a.machines[d.resource.type].push(d)}),0===Object.keys(a.machines).length&&(a.noinfo=!0),a}),d.machines=e})}]),angular.module("frontendApp").service("api",["$http","$q","API_ENDPOINT",function(a,b,c){var d="filter_space",e=this,f=b.defer();e.ready=f.promise,a.get(c+"api/spaces").then(function(a){e.spaces=a.data;var b=localStorage.getItem(d);b?e.filterSpace=JSON.parse(b):e.filterSpace={};var c=[];e.spaces.forEach(function(a){c.push(a.slug),e.filterSpace.hasOwnProperty(a.slug)?a.visible=e.isSpaceVisible(a):(a.visible=!0,e.filterSpace[a.slug]=!0,e.saveFilter())}),Object.keys(e.filterSpace).forEach(function(a){c.indexOf(a)<=0&&(delete e.filterSpace[a],e.saveFilter())}),f.resolve()}),e.getSpacePromiseBySlug=function(a){var c=b.defer();return e.ready.then(function(){for(var b=0;b<e.spaces.length;b++)if(e.spaces[b].slug===a)return void c.resolve(e.spaces[b]);c.reject("NOT_FOUND")}),c.promise},e.isSpaceVisible=function(a){return e.filterSpace&&e.filterSpace.hasOwnProperty(a.slug)&&e.filterSpace[a.slug]},e.allSpaceVisible=function(){return Object.keys(e.filterSpace).every(function(a){return e.filterSpace[a]})},e.noSpaceVisible=function(){return Object.keys(e.filterSpace).every(function(a){return!e.filterSpace[a]})},e.toggleSpaceFilterAll=function(a){e.spaces.forEach(function(b){b.visible=a,e.filterSpace[b.slug]=a}),e.saveFilter()},e.toggleSpaceFilter=function(a){var b=e.isSpaceVisible(a);e.allSpaceVisible()&&(e.toggleSpaceFilterAll(!1),b=!b),e.filterSpace[a.slug]=!b,a.visible=!b,e.noSpaceVisible()&&e.toggleSpaceFilterAll(!0),e.saveFilter()},e.saveFilter=function(){localStorage.setItem(d,JSON.stringify(e.filterSpace))}}]),angular.module("frontendApp").filter("nl2br",["$sanitize",function(a){var b=/xhtml/i.test(document.doctype)?"<br />":"<br>";return function(c){return c=(c+"").replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g,b+"$1"),a(c)}}]),angular.module("frontendApp").filter("formatKey",function(){return function(a){return a.charAt(0).toUpperCase()+a.slice(1).replace("_"," ")}}),angular.module("frontendApp").constant("API_ENDPOINT","https://fablabs.ch/"),function(){function a(a){var b=this;b.api=a,a.ready.then(function(){b.spaces=a.spaces.slice(0).reverse()})}a.$inject=["api"],angular.module("frontendApp").component("spaceFilter",{templateUrl:"views/space_filter.html",controller:a})}(),angular.module("frontendApp").run(["$templateCache",function(a){a.put("views/about.html",'<section layout-padding class="margin-bottom"> <h2>About</h2> <div class="md-whiteframe-1dp margin-bottom" layout-padding> <p>Fablabs.ch is promoting the MIT concept of Fab Labs in the geographical territory of Switzerland.</p> <p>It provides a central location to see activities of swiss fab labs by aggregating their public social network feeds.</p> <p> <md-button class="md-primary md-raised" href="https://docs.google.com/forms/d/1tPK7CAc_udVFaZOikjJVoXztbVOJ_-vZfB-Ymq2u8qw/viewform" target="_blank">Contact Swiss Fablabs.ch</md-button> <md-button class="md-primary md-raised" href="https://fablabs-ch.slack.com">Slack fablabs-ch</md-button> <md-button class="md-primary md-raised" href="https://github.com/orgs/fablabs-ch/">Github fablabs-ch</md-button> </p> <p>The FabLab concept is described in the <a href="http://fab.cba.mit.edu/about/charter/">Fab Charter</a>, copied below:</p> </div> <h2>The Fab Charter</h2> <div class="md-whiteframe-1dp" layout-padding> <dl> <dt>What is a fab lab?</dt> <dd>Fab labs are a global network of local labs, enabling invention by providing access to tools for digital fabrication</dd> <dt>What’s in a fab lab?</dt> <dd>Fab labs share an evolving inventory of core capabilities to make (almost) anything, allowing people and projects to be shared</dd> <dt>What does the fab lab network provide?</dt> <dd>Operational, educational, technical, financial, and logistical assistance beyond what’s available within one lab <dt>Who can use a fab lab?</dt> </dd><dd>Fab labs are available as a community resource, offering open access for individuals as well as scheduled access for programs</dd> <dt>What are your responsibilities?</dt> <dd>safety: not hurting people or machines<br> operations: assisting with cleaning, maintaining, and improving the lab<br> knowledge: contributing to documentation and instruction</dd> <dt>Who owns fab lab inventions?</dt> <dd>Designs and processes developed in fab labs can be protected and sold however an inventor chooses, but should remain available for individuals to use and learn from</dd> <dt>How can businesses use a fab lab?</dt> <dd>Commercial activities can be prototyped and incubated in a fab lab, but they must not conflict with other uses, they should grow beyond rather than within the lab, and they are expected to benefit the inventors, labs, and networks that contribute to their success</dd></dl> </div> </section>'),a.put("views/events.html",'<space-filter></space-filter> <div layout-padding> <section> <md-tabs md-stretch-tabs="always" md-selected="events.mode"> <md-tab>Past</md-tab> <md-tab>Future</md-tab> </md-tabs> </section> <section masonry preserve-order reload-on-resize layout="row" class="news" layout-align="center start" layout-wrap> <md-card class="masonry-brick news-card" ng-repeat="e in events.events| filter: events.inFilter  track by e.uid "> <md-card-header> <md-card-avatar> <a href="#/space/{{e.space.slug}}"><img class="md-user-avatar" ng-src="{{e.space.logo}}"></a> </md-card-avatar> <md-card-header-text> <span class="md-title">{{e.space.name}}</span> <span class="md-subhead"> <span>{{e.startdate|date:\'d MMM\'}}</span> <span ng-if="e.hasStartDateTime">{{e.startdate|date:\'HH:mm\'}}</span> <span ng-if="e.hasEndDateDifferent || e.hasEndDateTime">-</span> <span ng-if="e.hasEndDateDifferent">{{e.enddate|date:\'d MMM\'}}</span> <span ng-if="e.hasEndDateTime">{{e.enddate|date:\'HH:mm\'}}</span> </span></md-card-header-text> </md-card-header> <a ng-href="{{e.link}}"> <img ng-src="{{e.image_src || e.image}}" class="md-card-image" alt=""> </a> <md-card-title> <md-card-title-text> <span class="md-headline"><a ng-href="{{e.link}}">{{e.summary}}</a></span> </md-card-title-text> </md-card-title> <md-card-content> <md-content ng-bind-html="e.description" linkify></md-content> </md-card-content> <md-card-actions layout="row" layout-align="end center"> <div layout="row" layout-wrap><span ng-repeat="tag in e.tags" class="tag">{{tag}}</span></div> <span flex></span> <md-button ng-if="e.link" class="md-primary" target="_blank" ng-href="{{e.link}}">Info</md-button> </md-card-actions> </md-card></section></div>'),a.put("views/machine.html",'<div layout-padding> <section> <h2>Capabilities</h2> <div class="md-whiteframe-2dp" layout-padding> <table class="md-table"> <thead> <tr> <th>FabLab</th> <th ng-repeat="cat in machine.categories">{{cat.name}}</th> </tr> </thead> <tbody> <tr ng-repeat="space in machine.spaces"> <td> <a class="space-logo" ng-href="#/space/{{space.slug}}"><img alt="logo" ng-src="{{space.logo}}"> {{space.name}}</a> </td> <td ng-repeat="cat in machine.categories" class="{{space.machines[cat.type].length && \'yes\' || \'no\'}}"> {{space.noinfo && \'???\' || space.machines[cat.type].length && \'Yes\' || \'No\'}} <span ng-if="cat.type == \'laser\' && space.machines[cat.type].length"> ({{machine.collectAttribute(\'power\', space.machines[cat.type]).join(\',\')}}) </span> </td> </tr> </tbody> </table> <small>* Based on machines listed on this page</small> </div> </section> <section ng-repeat="cat in machine.categories"> <h2>{{cat.name}}</h2> <div layout-align="start start" layout-wrap layout="row"> <md-card class="machine-card" ng-repeat="r in machine.machines[cat.type]"> <md-card-header> <md-card-header-text> <span class="md-title">{{r.model}}</span> <span class="md-subhead">{{r.vendor.name}}</span> </md-card-header-text> </md-card-header> <img ng-src="{{r.picture}}" class="md-card-image" alt="{{r.model}}"> <md-card-content> <small> <ul class="custom_data"> <li ng-repeat="(k, v) in r.custom_data"><b>{{k|formatKey}}:</b> {{v}}</li> </ul> </small> <p>Available at:</p> <a class="space-logo" ng-repeat="space in r.spaces" ng-href="#/space/{{space.slug}}"><img alt="logo" ng-src="{{space.logo}}" title="{{space.name}}"></a> </md-card-content> </md-card> </div> </section> </div>'),a.put("views/map.html",'<ui-gmap-google-map center="map.map.center" zoom="map.map.zoom" options="map.map.options"> <ui-gmap-markers models="map.markers" coords="\'coords\'" options="\'options\'">  </ui-gmap-markers></ui-gmap-google-map> <md-content class="map-legend md-whiteframe-z2" layout-padding> <a ng-repeat="space in map.spaces" layout="row" layout-align="start center" ng-href="#/space/{{space.slug}}"> <img ng-src="{{space.logo}}"> <span>{{space.name}}</span> </a> </md-content>'),a.put("views/news.html",'<space-filter></space-filter> <div layout-padding> <section masonry reload-on-resize layout="row" class="news" layout-align="center start" layout-wrap> <!-- photo, video, status, link--> <md-card class="masonry-brick news-card" ng-repeat="p in news.posts| filter: news.inFilter track by p.id"> <md-card-header> <md-card-avatar> <a href="#/space/{{p.space.slug}}"><img class="md-user-avatar" ng-src="{{p.space.logo}}"></a> </md-card-avatar> <md-card-header-text> <span class="md-title">{{p.space.name}} {{p.type}}</span> <span class="md-subhead">{{p.created_at|date}}</span> <div class="source"> <a ng-show="p.source_type == \'FACEBOOK\'" href="https://www.facebook.com/{{p.source_id.split(\'_\')[0]}}/posts/{{p.source_id.split(\'_\')[1]}}"><md-icon md-svg-src="images/facebook.df9e860e.svg"></md-icon></a> <a ng-show="p.source_type == \'TWITTER\'" href="https://www.twitter.com/{{p.space.twitter}}/status/{{p.source_id}}"><md-icon md-svg-src="images/twitter.a59e6b76.svg"></md-icon></a> </div> </md-card-header-text> </md-card-header> <a ng-href="{{p.link}}"> <img ng-src="{{p.images[0].src}}" class="md-card-image" alt=""> </a> <md-card-title ng-if="p.message.split(\'\\n\\n\').length > 1"> <md-card-title-text> <span class="md-headline"><a ng-href="{{p.link}}">{{p.message.split(\'\\n\\n\')[0]}}</a></span> </md-card-title-text> </md-card-title> <md-card-content> <md-content ng-bind-html="news.format(p.message)"></md-content> <div layout="row" class="thumbs"> <a ng-repeat="i in p.images.slice(1)" href="{{i.link}}" title="{{i.title}}"><img ng-src="{{i.src}}"></a> </div> </md-card-content> </md-card> </section> </div> <md-progress-linear md-mode="indeterminate"></md-progress-linear>'),a.put("views/space.html",'<div class="space-background" style="background-image: url(\'{{space.background}}\')"> <div class="space-background-fill" ng-hide="space.background"></div> <section class="space margin-bottom"> <div id="logo" style="position:relative"> <img class="md-whiteframe-3dp" alt="logo" ng-src="{{space.logo}}"> </div> <md-content layout-padding class="md-whiteframe-2dp"> <h1>{{space.name}}</h1> <div layout-gt-sm="row" layout="column"> <div flex-gt-sm="40" layout="column" class="space-info"> <p ng-show="space.website"> <md-icon md-svg-src="images/web.819273d7.svg"></md-icon> <a ng-href="{{space.website}}">{{space.website}}</a> </p> <p ng-show="space.facebook"> <md-icon md-svg-src="images/facebook.df9e860e.svg"></md-icon> <a href="https://facebook.com/{{space.facebook}}">{{space.facebook}}</a> </p> <p ng-show="space.twitter"> <md-icon md-svg-src="images/twitter.a59e6b76.svg"></md-icon> <a href="https://twitter.com/{{space.twitter}}">@{{space.twitter}}</a> </p> <p ng-show="space.email"> <md-icon md-svg-src="images/email.b7d1a1f0.svg"></md-icon> <a href="mailto:{{space.email}}">{{space.email}}</a> </p> <p><b>Founded:</b> {{space.founded|date:\'longDate\' || \'?\'}}</p> <p><b>Members:</b> ~{{space.custom_data.members || \'?\'}}</p> <p> <b>Seen on Fablabs.io:</b> <a href="http://fablabs.io/{{space.custom_data.fablabsio}}">{{space.custom_data.fablabsio && \'yes\' || \'no\'}}</a> </p> <p> <b>Seen on Fablab.is:</b> <a href="http://wiki.fablab.is/wiki/Portal:Labs">{{space.custom_data.fablabis && \'yes\' || \'no\'}}</a> </p> <p><b>Data last confirmed:</b> {{space.last_confirmed|date:\'longDate\' || \'n/a\'}}</p> <md-button href="https://docs.google.com/forms/d/1tPK7CAc_udVFaZOikjJVoXztbVOJ_-vZfB-Ymq2u8qw/viewform" target="_blank">Report/claim</md-button> </div> <div flex></div> <div flex-gt-sm="50"> <p ng-bind-html="space.description|nl2br"></p> <h3>Adresse</h3> <ui-gmap-google-map class="space-map" center="space.map.center" zoom="space.map.zoom" options="space.map.options"> <ui-gmap-marker coords="space.marker.coords" options="space.marker.options" idkey="space.marker.id"> </ui-gmap-marker> </ui-gmap-google-map> <p><small>{{space.street}}<br> {{space.zip}} {{space.city}}</small></p> </div> </div> <h3>Machines</h3> <div layout="row" layout-align="start start" layout-wrap> <md-card class="machine-card" ng-repeat="rs in space.resources | orderBy: [\'resource.type\',\'resource.model\']"> <md-card-header> <md-card-header-text> <span class="md-title">{{rs.resource.model}}</span> <span class="md-subhead">{{rs.resource.vendor.name}}</span> </md-card-header-text> </md-card-header> <img ng-src="{{rs.resource.picture}}" class="md-card-image" alt="{{rs.resource.model}}"> <md-card-content> <small> <ul class="custom_data"> <li ng-repeat="(k, v) in rs.resource.custom_data"><b>{{k|formatKey}}:</b> {{v}}</li> <li ng-repeat="(k, v) in rs.custom_data"><b>{{k|formatKey}}:</b> {{v}}</li> </ul> </small> </md-card-content> </md-card> </div> </md-content> </section> </div>'),a.put("views/space_filter.html",'<md-fab-toolbar md-direction="left"> <md-fab-trigger class="align-with-text"> <md-button aria-label="menu" class="md-fab md-primary"> <md-icon md-svg-src="images/filter-outline.be7f9504.svg">filter</md-icon> </md-button> </md-fab-trigger> <md-toolbar> <md-fab-actions class="md-toolbar-tools"> <div class="filter-space" title="" ng-class="{\'filter-on\': space.visible}" ng-repeat="space in $ctrl.spaces" ng-click="$event.stopPropagation();$ctrl.api.toggleSpaceFilter(space)"> <img ng-src="{{space.logo}}" title="{{space.name}}"> </div> <div class="filter-space" ng-click="$event.stopPropagation();$ctrl.api.toggleSpaceFilterAll(true)">ALL</div> </md-fab-actions> </md-toolbar> </md-fab-toolbar>')}]);