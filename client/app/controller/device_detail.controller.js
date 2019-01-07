angular.module("app").controller("devices_detailsCtrl", ["$scope", "$routeParams", "DevicesService", "SensorsService",
function($scope, $routeParams, DevicesService, SensorsService) {

    $scope.monDevice = DevicesService.get({
        "devicesId": $routeParams.deviceId
    });
    $scope.mesSensors = SensorsService.query();
    $scope.labels = [];
    $scope.data = [[]];
    $scope.options ={
        title: {
          display: true,
          text: 'Analog Value'
        },
        scales: {
        yAxes: [{
            ticks: {
                max: 2000,
                min: 0,
                stepSize: 250
            }
        }]
    }
    }
    socket.on("newSensor", function(socket) {
        // console.log(socket);
        $scope.mesSensors.unshift(socket);
        $scope.$apply();
        
        if (socket.name === "analogValue") {
            $scope.labels.push(moment(socket.published_at).format('h:mm:ss a'));
            $scope.data[0].push(socket.data);
        }

        if (socket.name === "hook-response/deviceLocator/370043001047363333343437/0") {
            var coordonnées = socket.data;
            var coordonnéesR = coordonnées.substring(0,coordonnées.length-3);
            // console.log(coordonnéesR);
            var coordSplit = coordonnéesR.split(',');
            var latR = coordSplit[0];
            var longR = coordSplit[1];
            var latRInt = parseFloat(latR);
            var longRInt = parseFloat(longR);
            // console.log(latRInt);
            // console.log(longRInt);
            var map = new google.maps.Map(document.getElementById('map_div'), {
                center: {lat: latRInt, lng: longRInt},
                zoom: 17
            });
            var marker = new google.maps.Marker({
                position: {lat: latRInt, lng: longRInt},
                map: map,
                title: 'IFA'
            });
        }
        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };
    });
}]);
