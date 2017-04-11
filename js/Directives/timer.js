/*app.directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
              
              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
         };
     }]);*/

app.directive('countingtime', ['Util', '$interval', function (Util, $interval){ 
  return{ 
    restrict: 'A',
    scope:{
      value: '@',
    },
    link: function(scope, element){     
      future =   new Date();
      future.setHours(0);
      future.setMinutes(0);
      future.setSeconds(0);
      $interval(function(){          
          future.setSeconds(future.getSeconds()+1);  
          diff = Math.floor (future) / 1000;          
          return element.text(Util.dhms(diff));                 
       } , 1000);
      }
    };
}]);

app.factory('Util', [function()
  {
    return { 
    dhms: function(t){
      days = Math.floor(t / 86400);
      t -= days * 86400;
      hours = Math.floor(t / 3600) % 24;
      t -= hours * 3600;
      minutes = Math.floor(t / 60) % 60;
      t -= minutes * 60;
      seconds = Math.floor(t) % 60;
        return [
            //days + 'd',
            //hours + 'h',
            minutes + 'm',
            seconds + 's'
        ].join(' ');
      }
    };
  }
]);

app.directive('secondstimer', ['Seconds', 'Observer','$interval', function (Seconds, Observer, $interval){ 
  return{ 
    restrict: 'A',
    scope:{
      value: '@',
    },
    link: function(scope, element){
      future =   new Date().getTime();     
      var promise = $interval(function(){
          present =   new Date().getTime();
          diff = Math.floor (future - present)/1000;
          seconds = parseInt(scope.value)+parseInt(1);
          //console.log('diff: '+diff);
          //console.log('seconds: '+seconds);
          seconds =  parseFloat(seconds)+parseInt(diff);
          if(seconds == 0)
          {
            //console.log('llegue al 0');
            Observer.notify();
             $interval.cancel(promise);
          }  
          //console.log('segundos '+seconds);
          return element.text(Seconds.dhms(seconds));                 
       } , 1000);
      }
    };
}]);



app.factory('Seconds', [function()
  {
    return { 
    dhms: function(t){  
      seconds = Math.floor(t) % 60;
        return [
            seconds + 's'
        ].join(' ');
      }
    };
  }
]);

app.factory('Observer',[function()
  {
    return { 
    notify: function(){  
        console.log('Voy a notificar');
        angular.element(document.getElementById('Challen_con')).scope().timer_send();//linea sagrada
      }
    };
  }
]);



/*(function () {
    angular.module('app', []).directive('countdown', [
        'Util',
        '$interval',
        function (Util, $interval) {
            return {
                restrict: 'A',
                scope: { date: '@' },
                link: function (scope, element) {
                    var future;
                    future = new Date(scope.date);
                    $interval(function () {
                        var diff;
                        diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                        return element.text(Util.dhms(diff));
                    }, 1000);
                }
            };
        }
    ]).factory('Util', [function () {
            return {
                dhms: function (t) {
                    var days, hours, minutes, seconds;
                    days = Math.floor(t / 86400);
                    t -= days * 86400;
                    hours = Math.floor(t / 3600) % 24;
                    t -= hours * 3600;
                    minutes = Math.floor(t / 60) % 60;
                    t -= minutes * 60;
                    seconds = t % 60;
                    return [
                        days + 'd',
                        hours + 'h',
                        minutes + 'm',
                        seconds + 's'
                    ].join(' ');
                }
            };
        }]);
}.call(this));*/