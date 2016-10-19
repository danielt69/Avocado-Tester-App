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


function tictac(){
  timer = setInterval(function(){
    $('.timer').attr('data-num','0' + ($('.timer').attr('data-num')-1))
  }, 1000);
  timeout = setTimeout(function(){
    clearInterval(timer);
    $('.phase2').fadeOut( "400", function() {
      $(this).prev().fadeIn();
    });
    $('.timer').attr('data-num',10);
  }, 10000); 
}
var in_phase3 = false;
function go_to_phase3() {
  in_phase3 = true;
  clearTimeout(timeout);
  clearInterval(timer);
  $('.phase2').fadeOut( "400", function() {
    $(this).next().fadeIn( "400", function() {
      var rand = random_num(0, 180);
      $('.tester-indicator').css('transform','rotate(' + rand + 'deg)');
      // $('#percent').html(Math.round(rand/1.8));
      var max = Math.round(rand/1.8);
      var numnum = new CountUp("percent", 0, max, 0, 2.5, options);
      numnum.start();
    });
  });
}
function random_num(min, max) {                     // Returns a random number between min (inclusive) and max (exclusive) // 69 , 26 , 180
  return Math.floor(Math.random() * (max - min)) + min;
}

/////////////////////////////////////////////
$( document ).ready(function(){
  //plugin function, place inside DOM ready function
    outdatedBrowser({
        bgColor: '#f25648',
        color: '#ffffff',
        lowerThan: 'transform',
        languagePath: ''
    });

    // phases
    $('.phase1').on('click',function(event){
      event.preventDefault();
      $(this).closest('.phase').fadeOut( "400", function() {
        $(this).next().fadeIn();
        tictac();
      });
    })

    var delta = 0;

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", function(event) {
        // $("#y").val("scaleY("+(Math.round(event.beta))+")");
        // $("#delta").val("Delta("+(Math.round(event.beta - delta))+")");
        // $('#data').append('<br>beta: ' + Math.round(event.beta) + ', delta: ' + Math.round(event.beta - delta) + ', T: ' + (new Date).toISOString() + '');
        if ($('.phase1').css('display') == "none"  && $('.phase3').css('display') == "none") {
          if ((Math.round(event.beta - delta)) < -28 && delta != 0) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICpcbiAqICBXZWIgU3RhcnRlciBLaXRcbiAqICBDb3B5cmlnaHQgMjAxNSBHb29nbGUgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICBodHRwczovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlXG4gKlxuICovXG4vKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIENoZWNrIHRvIG1ha2Ugc3VyZSBzZXJ2aWNlIHdvcmtlcnMgYXJlIHN1cHBvcnRlZCBpbiB0aGUgY3VycmVudCBicm93c2VyLFxuICAvLyBhbmQgdGhhdCB0aGUgY3VycmVudCBwYWdlIGlzIGFjY2Vzc2VkIGZyb20gYSBzZWN1cmUgb3JpZ2luLiBVc2luZyBhXG4gIC8vIHNlcnZpY2Ugd29ya2VyIGZyb20gYW4gaW5zZWN1cmUgb3JpZ2luIHdpbGwgdHJpZ2dlciBKUyBjb25zb2xlIGVycm9ycy4gU2VlXG4gIC8vIGh0dHA6Ly93d3cuY2hyb21pdW0ub3JnL0hvbWUvY2hyb21pdW0tc2VjdXJpdHkvcHJlZmVyLXNlY3VyZS1vcmlnaW5zLWZvci1wb3dlcmZ1bC1uZXctZmVhdHVyZXNcbiAgdmFyIGlzTG9jYWxob3N0ID0gQm9vbGVhbih3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnIHx8XG4gICAgICAvLyBbOjoxXSBpcyB0aGUgSVB2NiBsb2NhbGhvc3QgYWRkcmVzcy5cbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ1s6OjFdJyB8fFxuICAgICAgLy8gMTI3LjAuMC4xLzggaXMgY29uc2lkZXJlZCBsb2NhbGhvc3QgZm9yIElQdjQuXG4gICAgICB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUubWF0Y2goXG4gICAgICAgIC9eMTI3KD86XFwuKD86MjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KSl7M30kL1xuICAgICAgKVxuICAgICk7XG5cbiAgaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IgJiZcbiAgICAgICh3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonIHx8IGlzTG9jYWxob3N0KSkge1xuICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCdzZXJ2aWNlLXdvcmtlci5qcycpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVnaXN0cmF0aW9uKSB7XG4gICAgICAvLyB1cGRhdGVmb3VuZCBpcyBmaXJlZCBpZiBzZXJ2aWNlLXdvcmtlci5qcyBjaGFuZ2VzLlxuICAgICAgcmVnaXN0cmF0aW9uLm9udXBkYXRlZm91bmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gdXBkYXRlZm91bmQgaXMgYWxzbyBmaXJlZCB0aGUgdmVyeSBmaXJzdCB0aW1lIHRoZSBTVyBpcyBpbnN0YWxsZWQsXG4gICAgICAgIC8vIGFuZCB0aGVyZSdzIG5vIG5lZWQgdG8gcHJvbXB0IGZvciBhIHJlbG9hZCBhdCB0aGF0IHBvaW50LlxuICAgICAgICAvLyBTbyBjaGVjayBoZXJlIHRvIHNlZSBpZiB0aGUgcGFnZSBpcyBhbHJlYWR5IGNvbnRyb2xsZWQsXG4gICAgICAgIC8vIGkuZS4gd2hldGhlciB0aGVyZSdzIGFuIGV4aXN0aW5nIHNlcnZpY2Ugd29ya2VyLlxuICAgICAgICBpZiAobmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuY29udHJvbGxlcikge1xuICAgICAgICAgIC8vIFRoZSB1cGRhdGVmb3VuZCBldmVudCBpbXBsaWVzIHRoYXQgcmVnaXN0cmF0aW9uLmluc3RhbGxpbmcgaXMgc2V0OlxuICAgICAgICAgIC8vIGh0dHBzOi8vc2xpZ2h0bHlvZmYuZ2l0aHViLmlvL1NlcnZpY2VXb3JrZXIvc3BlYy9zZXJ2aWNlX3dvcmtlci9pbmRleC5odG1sI3NlcnZpY2Utd29ya2VyLWNvbnRhaW5lci11cGRhdGVmb3VuZC1ldmVudFxuICAgICAgICAgIHZhciBpbnN0YWxsaW5nV29ya2VyID0gcmVnaXN0cmF0aW9uLmluc3RhbGxpbmc7XG5cbiAgICAgICAgICBpbnN0YWxsaW5nV29ya2VyLm9uc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoaW5zdGFsbGluZ1dvcmtlci5zdGF0ZSkge1xuICAgICAgICAgICAgICBjYXNlICdpbnN0YWxsZWQnOlxuICAgICAgICAgICAgICAgIC8vIEF0IHRoaXMgcG9pbnQsIHRoZSBvbGQgY29udGVudCB3aWxsIGhhdmUgYmVlbiBwdXJnZWQgYW5kIHRoZVxuICAgICAgICAgICAgICAgIC8vIGZyZXNoIGNvbnRlbnQgd2lsbCBoYXZlIGJlZW4gYWRkZWQgdG8gdGhlIGNhY2hlLlxuICAgICAgICAgICAgICAgIC8vIEl0J3MgdGhlIHBlcmZlY3QgdGltZSB0byBkaXNwbGF5IGEgXCJOZXcgY29udGVudCBpc1xuICAgICAgICAgICAgICAgIC8vIGF2YWlsYWJsZTsgcGxlYXNlIHJlZnJlc2guXCIgbWVzc2FnZSBpbiB0aGUgcGFnZSdzIGludGVyZmFjZS5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlICdyZWR1bmRhbnQnOlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGluc3RhbGxpbmcgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZXJ2aWNlIHdvcmtlciBiZWNhbWUgcmVkdW5kYW50LicpO1xuXG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gSWdub3JlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbihlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkdXJpbmcgc2VydmljZSB3b3JrZXIgcmVnaXN0cmF0aW9uOicsIGUpO1xuICAgIH0pO1xuICB9XG5cbn0pKCk7XG5cbiAgLy8gWW91ciBjdXN0b20gSmF2YVNjcmlwdCBnb2VzIGhlcmVcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBoZWxwZXJzXG52YXIgdGltZXIgPSB7fTtcbnZhciB0aW1lb3V0ID0ge307XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9pbm9yZ2FuaWsvY291bnRVcC5qcy9ibG9iL21hc3Rlci9kaXN0L2NvdW50VXAubWluLmpzXG4hZnVuY3Rpb24oYSx0KXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPXQocmVxdWlyZSxleHBvcnRzLG1vZHVsZSk6YS5Db3VudFVwPXQoKX0odGhpcyxmdW5jdGlvbihhLHQsbil7dmFyIGU9ZnVuY3Rpb24oYSx0LG4sZSxpLHIpe2Zvcih2YXIgbz0wLHM9W1wid2Via2l0XCIsXCJtb3pcIixcIm1zXCIsXCJvXCJdLG09MDttPHMubGVuZ3RoJiYhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsrK20pd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZT13aW5kb3dbc1ttXStcIlJlcXVlc3RBbmltYXRpb25GcmFtZVwiXSx3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWU9d2luZG93W3NbbV0rXCJDYW5jZWxBbmltYXRpb25GcmFtZVwiXXx8d2luZG93W3NbbV0rXCJDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl07d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8KHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU9ZnVuY3Rpb24oYSx0KXt2YXIgbj0obmV3IERhdGUpLmdldFRpbWUoKSxlPU1hdGgubWF4KDAsMTYtKG4tbykpLGk9d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXthKG4rZSl9LGUpO3JldHVybiBvPW4rZSxpfSksd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lfHwod2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lPWZ1bmN0aW9uKGEpe2NsZWFyVGltZW91dChhKX0pO3ZhciB1PXRoaXM7dS5vcHRpb25zPXt1c2VFYXNpbmc6ITAsdXNlR3JvdXBpbmc6ITAsc2VwYXJhdG9yOlwiLFwiLGRlY2ltYWw6XCIuXCIsZWFzaW5nRm46bnVsbCxmb3JtYXR0aW5nRm46bnVsbH07Zm9yKHZhciBsIGluIHIpci5oYXNPd25Qcm9wZXJ0eShsKSYmKHUub3B0aW9uc1tsXT1yW2xdKTtcIlwiPT09dS5vcHRpb25zLnNlcGFyYXRvciYmKHUub3B0aW9ucy51c2VHcm91cGluZz0hMSksdS5vcHRpb25zLnByZWZpeHx8KHUub3B0aW9ucy5wcmVmaXg9XCJcIiksdS5vcHRpb25zLnN1ZmZpeHx8KHUub3B0aW9ucy5zdWZmaXg9XCJcIiksdS5kPVwic3RyaW5nXCI9PXR5cGVvZiBhP2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKGEpOmEsdS5zdGFydFZhbD1OdW1iZXIodCksdS5lbmRWYWw9TnVtYmVyKG4pLHUuY291bnREb3duPXUuc3RhcnRWYWw+dS5lbmRWYWwsdS5mcmFtZVZhbD11LnN0YXJ0VmFsLHUuZGVjaW1hbHM9TWF0aC5tYXgoMCxlfHwwKSx1LmRlYz1NYXRoLnBvdygxMCx1LmRlY2ltYWxzKSx1LmR1cmF0aW9uPTFlMypOdW1iZXIoaSl8fDJlMyx1LmZvcm1hdE51bWJlcj1mdW5jdGlvbihhKXthPWEudG9GaXhlZCh1LmRlY2ltYWxzKSxhKz1cIlwiO3ZhciB0LG4sZSxpO2lmKHQ9YS5zcGxpdChcIi5cIiksbj10WzBdLGU9dC5sZW5ndGg+MT91Lm9wdGlvbnMuZGVjaW1hbCt0WzFdOlwiXCIsaT0vKFxcZCspKFxcZHszfSkvLHUub3B0aW9ucy51c2VHcm91cGluZylmb3IoO2kudGVzdChuKTspbj1uLnJlcGxhY2UoaSxcIiQxXCIrdS5vcHRpb25zLnNlcGFyYXRvcitcIiQyXCIpO3JldHVybiB1Lm9wdGlvbnMucHJlZml4K24rZSt1Lm9wdGlvbnMuc3VmZml4fSx1LmVhc2VPdXRFeHBvPWZ1bmN0aW9uKGEsdCxuLGUpe3JldHVybiBuKigtTWF0aC5wb3coMiwtMTAqYS9lKSsxKSoxMDI0LzEwMjMrdH0sdS5lYXNpbmdGbj11Lm9wdGlvbnMuZWFzaW5nRm4/dS5vcHRpb25zLmVhc2luZ0ZuOnUuZWFzZU91dEV4cG8sdS5mb3JtYXR0aW5nRm49dS5vcHRpb25zLmZvcm1hdHRpbmdGbj91Lm9wdGlvbnMuZm9ybWF0dGluZ0ZuOnUuZm9ybWF0TnVtYmVyLHUudmVyc2lvbj1mdW5jdGlvbigpe3JldHVyblwiMS43LjFcIn0sdS5wcmludFZhbHVlPWZ1bmN0aW9uKGEpe3ZhciB0PXUuZm9ybWF0dGluZ0ZuKGEpO1wiSU5QVVRcIj09PXUuZC50YWdOYW1lP3RoaXMuZC52YWx1ZT10OlwidGV4dFwiPT09dS5kLnRhZ05hbWV8fFwidHNwYW5cIj09PXUuZC50YWdOYW1lP3RoaXMuZC50ZXh0Q29udGVudD10OnRoaXMuZC5pbm5lckhUTUw9dH0sdS5jb3VudD1mdW5jdGlvbihhKXt1LnN0YXJ0VGltZXx8KHUuc3RhcnRUaW1lPWEpLHUudGltZXN0YW1wPWE7dmFyIHQ9YS11LnN0YXJ0VGltZTt1LnJlbWFpbmluZz11LmR1cmF0aW9uLXQsdS5vcHRpb25zLnVzZUVhc2luZz91LmNvdW50RG93bj91LmZyYW1lVmFsPXUuc3RhcnRWYWwtdS5lYXNpbmdGbih0LDAsdS5zdGFydFZhbC11LmVuZFZhbCx1LmR1cmF0aW9uKTp1LmZyYW1lVmFsPXUuZWFzaW5nRm4odCx1LnN0YXJ0VmFsLHUuZW5kVmFsLXUuc3RhcnRWYWwsdS5kdXJhdGlvbik6dS5jb3VudERvd24/dS5mcmFtZVZhbD11LnN0YXJ0VmFsLSh1LnN0YXJ0VmFsLXUuZW5kVmFsKSoodC91LmR1cmF0aW9uKTp1LmZyYW1lVmFsPXUuc3RhcnRWYWwrKHUuZW5kVmFsLXUuc3RhcnRWYWwpKih0L3UuZHVyYXRpb24pLHUuY291bnREb3duP3UuZnJhbWVWYWw9dS5mcmFtZVZhbDx1LmVuZFZhbD91LmVuZFZhbDp1LmZyYW1lVmFsOnUuZnJhbWVWYWw9dS5mcmFtZVZhbD51LmVuZFZhbD91LmVuZFZhbDp1LmZyYW1lVmFsLHUuZnJhbWVWYWw9TWF0aC5yb3VuZCh1LmZyYW1lVmFsKnUuZGVjKS91LmRlYyx1LnByaW50VmFsdWUodS5mcmFtZVZhbCksdDx1LmR1cmF0aW9uP3UuckFGPXJlcXVlc3RBbmltYXRpb25GcmFtZSh1LmNvdW50KTp1LmNhbGxiYWNrJiZ1LmNhbGxiYWNrKCl9LHUuc3RhcnQ9ZnVuY3Rpb24oYSl7cmV0dXJuIHUuY2FsbGJhY2s9YSx1LnJBRj1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodS5jb3VudCksITF9LHUucGF1c2VSZXN1bWU9ZnVuY3Rpb24oKXt1LnBhdXNlZD8odS5wYXVzZWQ9ITEsZGVsZXRlIHUuc3RhcnRUaW1lLHUuZHVyYXRpb249dS5yZW1haW5pbmcsdS5zdGFydFZhbD11LmZyYW1lVmFsLHJlcXVlc3RBbmltYXRpb25GcmFtZSh1LmNvdW50KSk6KHUucGF1c2VkPSEwLGNhbmNlbEFuaW1hdGlvbkZyYW1lKHUuckFGKSl9LHUucmVzZXQ9ZnVuY3Rpb24oKXt1LnBhdXNlZD0hMSxkZWxldGUgdS5zdGFydFRpbWUsdS5zdGFydFZhbD10LGNhbmNlbEFuaW1hdGlvbkZyYW1lKHUuckFGKSx1LnByaW50VmFsdWUodS5zdGFydFZhbCl9LHUudXBkYXRlPWZ1bmN0aW9uKGEpe2NhbmNlbEFuaW1hdGlvbkZyYW1lKHUuckFGKSx1LnBhdXNlZD0hMSxkZWxldGUgdS5zdGFydFRpbWUsdS5zdGFydFZhbD11LmZyYW1lVmFsLHUuZW5kVmFsPU51bWJlcihhKSx1LmNvdW50RG93bj11LnN0YXJ0VmFsPnUuZW5kVmFsLHUuckFGPXJlcXVlc3RBbmltYXRpb25GcmFtZSh1LmNvdW50KX0sdS5wcmludFZhbHVlKHUuc3RhcnRWYWwpfTtyZXR1cm4gZX0pO1xudmFyIG9wdGlvbnMgPSB7XG7igIPigIN1c2VFYXNpbmcgOiB0cnVlLCBcbuKAg+KAg3VzZUdyb3VwaW5nIDogdHJ1ZSwgXG7igIPigINzZXBhcmF0b3IgOiAnLCcsIFxu4oCD4oCDZGVjaW1hbCA6ICcuJywgXG7igIPigINwcmVmaXggOiAnJywgXG7igIPigINzdWZmaXggOiAnJyBcbn07XG5cblxuZnVuY3Rpb24gdGljdGFjKCl7XG4gIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICAkKCcudGltZXInKS5hdHRyKCdkYXRhLW51bScsJzAnICsgKCQoJy50aW1lcicpLmF0dHIoJ2RhdGEtbnVtJyktMSkpXG4gIH0sIDEwMDApO1xuICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICQoJy5waGFzZTInKS5mYWRlT3V0KCBcIjQwMFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykucHJldigpLmZhZGVJbigpO1xuICAgIH0pO1xuICAgICQoJy50aW1lcicpLmF0dHIoJ2RhdGEtbnVtJywxMCk7XG4gIH0sIDEwMDAwKTsgXG59XG52YXIgaW5fcGhhc2UzID0gZmFsc2U7XG5mdW5jdGlvbiBnb190b19waGFzZTMoKSB7XG4gIGluX3BoYXNlMyA9IHRydWU7XG4gIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICQoJy5waGFzZTInKS5mYWRlT3V0KCBcIjQwMFwiLCBmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLm5leHQoKS5mYWRlSW4oIFwiNDAwXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJhbmQgPSByYW5kb21fbnVtKDAsIDE4MCk7XG4gICAgICAkKCcudGVzdGVyLWluZGljYXRvcicpLmNzcygndHJhbnNmb3JtJywncm90YXRlKCcgKyByYW5kICsgJ2RlZyknKTtcbiAgICAgIC8vICQoJyNwZXJjZW50JykuaHRtbChNYXRoLnJvdW5kKHJhbmQvMS44KSk7XG4gICAgICB2YXIgbWF4ID0gTWF0aC5yb3VuZChyYW5kLzEuOCk7XG4gICAgICB2YXIgbnVtbnVtID0gbmV3IENvdW50VXAoXCJwZXJjZW50XCIsIDAsIG1heCwgMCwgMi41LCBvcHRpb25zKTtcbiAgICAgIG51bW51bS5zdGFydCgpO1xuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJhbmRvbV9udW0obWluLCBtYXgpIHsgICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm5zIGEgcmFuZG9tIG51bWJlciBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChleGNsdXNpdmUpIC8vIDY5ICwgMjYgLCAxODBcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKCBkb2N1bWVudCApLnJlYWR5KGZ1bmN0aW9uKCl7XG4gIC8vcGx1Z2luIGZ1bmN0aW9uLCBwbGFjZSBpbnNpZGUgRE9NIHJlYWR5IGZ1bmN0aW9uXG4gICAgb3V0ZGF0ZWRCcm93c2VyKHtcbiAgICAgICAgYmdDb2xvcjogJyNmMjU2NDgnLFxuICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICBsb3dlclRoYW46ICd0cmFuc2Zvcm0nLFxuICAgICAgICBsYW5ndWFnZVBhdGg6ICcnXG4gICAgfSk7XG5cbiAgICAvLyBwaGFzZXNcbiAgICAkKCcucGhhc2UxJykub24oJ2NsaWNrJyxmdW5jdGlvbihldmVudCl7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJCh0aGlzKS5jbG9zZXN0KCcucGhhc2UnKS5mYWRlT3V0KCBcIjQwMFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5uZXh0KCkuZmFkZUluKCk7XG4gICAgICAgIHRpY3RhYygpO1xuICAgICAgfSk7XG4gICAgfSlcblxuICAgIHZhciBkZWx0YSA9IDA7XG5cbiAgICBpZiAod2luZG93LkRldmljZU9yaWVudGF0aW9uRXZlbnQpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlb3JpZW50YXRpb25cIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gJChcIiN5XCIpLnZhbChcInNjYWxlWShcIisoTWF0aC5yb3VuZChldmVudC5iZXRhKSkrXCIpXCIpO1xuICAgICAgICAvLyAkKFwiI2RlbHRhXCIpLnZhbChcIkRlbHRhKFwiKyhNYXRoLnJvdW5kKGV2ZW50LmJldGEgLSBkZWx0YSkpK1wiKVwiKTtcbiAgICAgICAgLy8gJCgnI2RhdGEnKS5hcHBlbmQoJzxicj5iZXRhOiAnICsgTWF0aC5yb3VuZChldmVudC5iZXRhKSArICcsIGRlbHRhOiAnICsgTWF0aC5yb3VuZChldmVudC5iZXRhIC0gZGVsdGEpICsgJywgVDogJyArIChuZXcgRGF0ZSkudG9JU09TdHJpbmcoKSArICcnKTtcbiAgICAgICAgaWYgKCQoJy5waGFzZTEnKS5jc3MoJ2Rpc3BsYXknKSA9PSBcIm5vbmVcIiAgJiYgJCgnLnBoYXNlMycpLmNzcygnZGlzcGxheScpID09IFwibm9uZVwiKSB7XG4gICAgICAgICAgaWYgKChNYXRoLnJvdW5kKGV2ZW50LmJldGEgLSBkZWx0YSkpIDwgLTI4ICYmIGRlbHRhICE9IDApIHtcbiAgICAgICAgICAgIGdvX3RvX3BoYXNlMygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBkZWx0YSA9IE1hdGgucm91bmQoZXZlbnQuYmV0YSk7XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwiU29ycnksIHlvdXIgRGV2aWNlIGlzbid0IHN1cHBvcnRlZCBCeSBUaGlzIEFQUCApLTpcIik7XG4gICAgfSBcblxuXG59KTtcbiJdLCJmaWxlIjoibWFpbi5qcyJ9
