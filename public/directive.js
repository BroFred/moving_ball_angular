angular.module('App').directive('member',function memberDirective(){
    return{
        restrict:'E',
        link:function (scope, element, attrs) {
            element.addClass('circle');
            element.css('backgroundColor','blue');
            scope.$watch(attrs.x, function (x) {
                element.css('left', x + 'px');
            });
            scope.$watch(attrs.y, function (y) {
                element.css('top', y + 'px');
            });
        }
    };
});