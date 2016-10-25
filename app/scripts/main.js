/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

})();

  // Your custom JavaScript goes here
///////////////////////////////////////

// helpers
var timer = {};
var timeout = {};


// https://github.com/husa/timer.js
!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.Timer=b()}(this,function(){"use strict";function a(){c.call(this),this._.status="stopped",b.call(this,"onend")}function b(a){var b=this._.options[a],c=[].slice.call(arguments,1);"function"==typeof b&&b.apply(this,c)}function c(a){clearTimeout(this._.timeout),clearInterval(this._.interval),a===!0&&(this._.duration=0)}var d={tick:1,onstart:null,ontick:null,onpause:null,onstop:null,onend:null},e=function(a){if(!(this instanceof e))return new e(a);this._={id:+new Date,options:{},duration:0,status:"initialized",start:0,measures:[]};for(var b in d)this._.options[b]=d[b];this.options(a)};return e.prototype.start=function(c){return+c||this._.duration?(c&&(c*=1e3),this._.timeout&&"started"===this._.status?this:(this._.duration=c||this._.duration,this._.timeout=setTimeout(a.bind(this),this._.duration),"function"==typeof this._.options.ontick&&(this._.interval=setInterval(function(){b.call(this,"ontick",this.getDuration())}.bind(this),1e3*+this._.options.tick)),this._.start=+new Date,this._.status="started",b.call(this,"onstart",this.getDuration()),this)):this},e.prototype.pause=function(){return"started"!==this._.status?this:(this._.duration-=+new Date-this._.start,c.call(this,!1),this._.status="paused",b.call(this,"onpause"),this)},e.prototype.stop=function(){return/started|paused/.test(this._.status)?(c.call(this,!0),this._.status="stopped",b.call(this,"onstop"),this):this},e.prototype.getDuration=function(){return"started"===this._.status?this._.duration-(+new Date-this._.start):"paused"===this._.status?this._.duration:0},e.prototype.getStatus=function(){return this._.status},e.prototype.options=function(a,b){if(a&&b&&(this._.options[a]=b),!b&&"object"==typeof a)for(var c in a)this._.options.hasOwnProperty(c)&&(this._.options[c]=a[c]);return this},e.prototype.on=function(a,b){return"string"!=typeof a||"function"!=typeof b?this:(/^on/.test(a)||(a="on"+a),this._.options.hasOwnProperty(a)&&(this._.options[a]=b),this)},e.prototype.off=function(a){return"string"!=typeof a?this:(a=a.toLowerCase(),"all"===a?(this._.options=d,this):(/^on/.test(a)||(a="on"+a),this._.options.hasOwnProperty(a)&&(this._.options[a]=d[a]),this))},e.prototype.measureStart=function(a){return this._.measures[a||""]=+new Date,this},e.prototype.measureStop=function(a){return+new Date-this._.measures[a||""]},e});

var myTimer = new Timer({
  tick    : 1,
  ontick  : function(ms) { 
    $('.timer').attr('data-num','0' +  Math.round(ms/1000));
  },
  onstart : function() { /*console.log('timer started')*/ },
  onstop  : function() { /*console.log('timer stop')*/ },
  onpause : function() { /*console.log('timer set on pause')*/ },
  onend   : function() {
    // console.log('timer ended normally');
    $('.phase2').fadeOut( "400", function() {
      $(this).prev().fadeIn();
      $('.timer').attr('data-num',10);
    });
  }
});

// https://github.com/inorganik/countUp.js/blob/master/dist/countUp.min.js
!function(a,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t(require,exports,module):a.CountUp=t()}(this,function(a,t,n){var e=function(a,t,n,e,i,r){for(var o=0,s=["webkit","moz","ms","o"],m=0;m<s.length&&!window.requestAnimationFrame;++m)window.requestAnimationFrame=window[s[m]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[s[m]+"CancelAnimationFrame"]||window[s[m]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a,t){var n=(new Date).getTime(),e=Math.max(0,16-(n-o)),i=window.setTimeout(function(){a(n+e)},e);return o=n+e,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)});var u=this;u.options={useEasing:!0,useGrouping:!0,separator:",",decimal:".",easingFn:null,formattingFn:null};for(var l in r)r.hasOwnProperty(l)&&(u.options[l]=r[l]);""===u.options.separator&&(u.options.useGrouping=!1),u.options.prefix||(u.options.prefix=""),u.options.suffix||(u.options.suffix=""),u.d="string"==typeof a?document.getElementById(a):a,u.startVal=Number(t),u.endVal=Number(n),u.countDown=u.startVal>u.endVal,u.frameVal=u.startVal,u.decimals=Math.max(0,e||0),u.dec=Math.pow(10,u.decimals),u.duration=1e3*Number(i)||2e3,u.formatNumber=function(a){a=a.toFixed(u.decimals),a+="";var t,n,e,i;if(t=a.split("."),n=t[0],e=t.length>1?u.options.decimal+t[1]:"",i=/(\d+)(\d{3})/,u.options.useGrouping)for(;i.test(n);)n=n.replace(i,"$1"+u.options.separator+"$2");return u.options.prefix+n+e+u.options.suffix},u.easeOutExpo=function(a,t,n,e){return n*(-Math.pow(2,-10*a/e)+1)*1024/1023+t},u.easingFn=u.options.easingFn?u.options.easingFn:u.easeOutExpo,u.formattingFn=u.options.formattingFn?u.options.formattingFn:u.formatNumber,u.version=function(){return"1.7.1"},u.printValue=function(a){var t=u.formattingFn(a);"INPUT"===u.d.tagName?this.d.value=t:"text"===u.d.tagName||"tspan"===u.d.tagName?this.d.textContent=t:this.d.innerHTML=t},u.count=function(a){u.startTime||(u.startTime=a),u.timestamp=a;var t=a-u.startTime;u.remaining=u.duration-t,u.options.useEasing?u.countDown?u.frameVal=u.startVal-u.easingFn(t,0,u.startVal-u.endVal,u.duration):u.frameVal=u.easingFn(t,u.startVal,u.endVal-u.startVal,u.duration):u.countDown?u.frameVal=u.startVal-(u.startVal-u.endVal)*(t/u.duration):u.frameVal=u.startVal+(u.endVal-u.startVal)*(t/u.duration),u.countDown?u.frameVal=u.frameVal<u.endVal?u.endVal:u.frameVal:u.frameVal=u.frameVal>u.endVal?u.endVal:u.frameVal,u.frameVal=Math.round(u.frameVal*u.dec)/u.dec,u.printValue(u.frameVal),t<u.duration?u.rAF=requestAnimationFrame(u.count):u.callback&&u.callback()},u.start=function(a){return u.callback=a,u.rAF=requestAnimationFrame(u.count),!1},u.pauseResume=function(){u.paused?(u.paused=!1,delete u.startTime,u.duration=u.remaining,u.startVal=u.frameVal,requestAnimationFrame(u.count)):(u.paused=!0,cancelAnimationFrame(u.rAF))},u.reset=function(){u.paused=!1,delete u.startTime,u.startVal=t,cancelAnimationFrame(u.rAF),u.printValue(u.startVal)},u.update=function(a){cancelAnimationFrame(u.rAF),u.paused=!1,delete u.startTime,u.startVal=u.frameVal,u.endVal=Number(a),u.countDown=u.startVal>u.endVal,u.rAF=requestAnimationFrame(u.count)},u.printValue(u.startVal)};return e});
var options = {
  useEasing : true, 
  useGrouping : true, 
  separator : ',', 
  decimal : '.', 
  prefix : '', 
  suffix : '' 
};

// Returns a random number between min (inclusive) and max (exclusive) // 69 , 26 , 180
function random_num(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function tictac(){
  // timer = setInterval(function(){
  //   $('.timer').attr('data-num','0' + ($('.timer').attr('data-num')-1));
  // }, 1000);
  myTimer.start(10)
  // timeout = setTimeout(function(){
  //   clearInterval(timer);
  //   $('.phase2').fadeOut( "400", function() {
  //     $(this).prev().fadeIn();
  //   });
  //   $('.timer').attr('data-num',10);
  // }, 10000); 
}
var in_phase3 = false;
function go_to_phase3() {
  in_phase3 = true;
  // clearTimeout(timeout);
  // clearInterval(timer);
  myTimer.stop();
  $('.phase2').fadeOut( "400", function() {
    $('.timer').attr('data-num',10);
    $(this).next().fadeIn( "400", function() {
      var rand = random_num(0, 180);
      var status_msg = '';
      // console.log(rand);
      if (rand < 36) {status_msg = 'Unripe';} 
      else if (rand >= 36 && rand < 72) {status_msg = 'Almost Ripe';} 
      else if (rand >= 72 && rand < 108) {status_msg = 'Ripe';} 
      else if (rand >= 108 && rand < 144) {status_msg = 'Almost Rotten';} 
      else {status_msg = 'Rotten';}
      
      $('.tester-indicator').css('transform','rotate(' + rand + 'deg)');
      // $('#percent').html(Math.round(rand/1.8));
      var max = Math.round(rand/1.8);
      var numnum = new CountUp("percent", 0, max, 0, 2.5, options);
      numnum.start();
      $('#status').fadeOut( "400", function() {
        $(this).html(status_msg);
        setTimeout(function() { $('#status').fadeIn(); }, 750);
      });
    });
  });
}


/////////////////////////////////////////////
$( document ).ready(function(){

  // Hides mobile browser's address bar when page is done loading.
  window.addEventListener('load', function(e) {
    setTimeout(function() { window.scrollTo(0, 1); }, 1);
  }, false);


  //plugin function, place inside DOM ready function
    outdatedBrowser({
        bgColor: '#f25648',
        color: '#ffffff',
        lowerThan: 'transform',
        languagePath: ''
    });

    /////////////////////////////////////   My Code   /////////////////////////////////////
    // phases
    $('.phase1 .btn, .phase3 .go_back').on('click',function(event){
      event.preventDefault();
      myTimer.stop();
      $(this).closest('.phase').fadeOut( "400", function() {
        $('.phase2').fadeIn();
        tictac();
      });
    });

    var delta = 0;

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", function(event) {
        // $("#y").val("scaleY("+(Math.round(event.beta))+")");
        // $("#delta").val("Delta("+(Math.round(event.beta - delta))+")");
        // $('#data').append('<br>beta: ' + Math.round(event.beta) + ', delta: ' + Math.round(event.beta - delta) + ', T: ' + (new Date).toISOString() + '');
        if ($('.phase1').css('display') == "none"  && $('.phase3').css('display') == "none") {
          if ((Math.round(event.beta - delta)) < -18 && delta != 0) {
            go_to_phase3();
          }
          setTimeout(function(){
            delta = Math.round(event.beta);
          }, 100);
        }
      }, true);
    } else {
      alert("Sorry, your Device isn't supported By This APP )-:");
    }


});
