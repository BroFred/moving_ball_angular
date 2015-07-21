angular.module('App')
.directive('member',function memberDirective(){
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
})
.directive('mapedit', function($document) {
        return {
            scope:{
                x:"=x",
                y:"=y"
            },
            link:function(scope, element, attr) {
            var startX = 0,startY = 0;
                element.css({
                    position: 'absolute',
                    border: '1px solid red',
                    backgroundColor: 'blue',
                    cursor: 'pointer',
                    display: 'block',
                    color: 'white',
                    width: '65px',
                    top: scope.y+ 'px',
                    left: scope.x + 'px'
                });
                element.on('mousedown', function(event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.screenX - scope.x;
                    startY = event.screenY - scope.y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });
                function mousemove(event) {
                    scope.x = event.screenX- startX;
                    scope.y = event.screenY- startY;
                    element.css({
                        top: scope.y+ 'px',
                        left: scope.x + 'px'
                    });
                }

                function mouseup() {
                    $document.off('mousemove', mousemove);
                    $document.off('mouseup', mouseup);
                }
            }};
        });
