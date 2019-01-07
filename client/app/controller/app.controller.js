/**
 * Contrôleur de l'application "Todo List" décrite dans le chapitre "La logique d'AngularJS".
 */
angular.module('app').controller('testCtrl', ['$scope', '$http',
    function($scope, $http) {

        $scope.test2 = "tred";
        // Pour manipuler plus simplement les todos au sein du contrôleur
        // On initialise les todos avec un tableau vide : []
        $scope.myFunc = function() {
            console.log('je clique');
            console.log($scope.ordre.valeur);

            $http({
                method: 'POST',
                url: 'https://api.particle.io/v1/devices/370043001047363333343437/led?access_token=586f8c720c0802acaea41176e236f6ce02d94a37',
                data: {"arg" : $scope.ordre.valeur}             
            }).then(function successCallback(response) {
                console.log(response);
                if(response.data.return_value==1){
                	alert("lumière correctement allumée");
                	
                }
                else if(response.data.return_value==0){
                	alert("lumière correctement eteinte");
                	
                }
                else if(response.data.return_value==-1){
                	alert("problème");
                	
                }
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                console.log(response);
                alert("lumière éteinte");
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };

    }
]);