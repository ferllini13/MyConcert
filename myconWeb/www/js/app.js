var web_sevice_ip = ""; 
angular.module('starter', ['ionic'])

.config( function ( $stateProvider , $urlRouterProvider ){
    
	$stateProvider.state('login', {
                url:'/login',
                controller: 'loginControlker',
                templateUrl:'html/login.html'
            })
    $stateProvider.state('main', {
                url:'/main',
                controller: 'mainController',
                templateUrl:'html/inicio.html'
            })
    
      $urlRouterProvider.otherwise('/main');
})
   


.controller('LoginController', function($scope, $state, loginData,$http){
    $scope.login = {username:'', password:'',name:'',id:'', rol:'' };
        //var form = document.getElementById("myForm");  
        //form.onsubmit = function(){
        //form.reset();
      //}
		
		
		
    $scope.verificar =  function(login){
		
		//lo comentado son las llamadas que vamos a combiar del WS
					/*
                                $http.get(request)
                        .then(function (response) {
                        var data = response.data;
                        var result = data.substring(76, data.length - 9);
    					//si el mae si exite, se procede...
                    
                            var result2 = angular.fromJson(result);
                            updateRoles(login,result2[0]._id,result2[0]._name,result2[0]._office,loginData)

                        }

                    });  */ 
    };
    
    function updateRoles(login,id,name,office,loginData){
      /*  
		var request="";
    	$http.post(request)
            .then(function (response) {
            var data = response.data;
            var result = data.substring(76, data.length - 9);
            var result4 = angular.fromJson(result);
		
            rol=result4.rol_id);
                                    }
			//acomodar roles
            if (rol==0){  
            loginData.updateLogin(login,id,name,office,rol);
                
            $state.go('inicio');
            }
         }); */

};
})








.controller('mainController', function($scope, $state){
})






.controller('menuController', function($scope, $state,$http){
	//$scope.login = loginData.getLogin();
	//$scope.usuario_fanatico=false;
    //$scope.usuario_promocion=false;
	
	/*var tipo_usuario=loginData.getLogin().rol;
	if (tipo_usuario==0){
		$scope.usuario_fanatico=true;
	}
	else if (tipo_usuario==1){
		$scope.usuario_promocion=true;
	}
	else if (tipo_usuario==2){//usuario dios
		$scope.usuario_promocion=true;
		$scope.usuario_fanatico=true;
	}
	//colocar el else y algun tipo de error
	*/
	
	
	$scope.tryp = function () {
		console.log("entramos p");
     var url = 'http://webserviceepatec.azurewebsites.net/MyConcert.asmx/Parsear'; 
     var roleObj = { 
         frase:"JASON MAMAPICHAS"
     };
     $http.post(url, roleObj).then(function(response) {
		 console.log("respuesta");
		  var answer= angular.fromJson(response.data.d);
         console.log(answer);
       
       });
};
	
	
	$scope.tryg =  function(login){
		console.log("entramos g");
		var url2='http://webserviceepatec.azurewebsites.net/MyConcert.asmx/Parsear?frase={%22frase%22:%22jason%20es%20playo%22}';
       $http.get(url2)
          .then(function (response) {
            console.log("respuesta");
		    var answer= angular.fromJson(response.data.substring(73, response.data.length - 9));
         	console.log(answer);

                  

                        

                    });
    };
	
	$scope.logOut = function(){        
        $state.go('login');
        window.location.reload()    
    ;
    };
	
})





//hay que modificar lo de abajo en nombres segun fotmato y lo que se va a guardar XD


.service('loginData', function() {
return {
login: {},
getLogin: function() {// para recuperar los datos 
 	return this.login;
},
	
updateLogin: function(login,id,name,rol) {// para actualizar los datos del login, y definir el tipo de menu segun tipo de usuario
   	this.login = login;// username, password
   	this.login.id=id;
   	this.login.name=name;
	this.login.rol=rol;
}
}
})

.directive('menu', function() {
  return {
     templateUrl: 'html/menu.html',
      controller:"menuController"
  };});