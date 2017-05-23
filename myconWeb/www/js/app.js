var web_sevice_ip = ""; 
angular.module('starter', ['ionic'])

.config( function ( $stateProvider , $urlRouterProvider ){
    
	$stateProvider.state('login', {
                url:'/login',
                controller: 'controlador_login',
                templateUrl:'html/login.html'
            })
    $stateProvider.state('inicio', {
                url:'/inicio',
                controller: 'controlador_inicio',
                templateUrl:'html/inicio.html'
            })
    
      $urlRouterProvider.otherwise('/inicio');
})
   


.controller('controladro_login', function($scope, $state, loginData,$http){
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








.controller('controlador_inicio', function($scope, $state){
})






.controller('controlador_menu', function($scope, $state,loginData){
	$scope.login = loginData.getLogin();
	$scope.usuario_fanatico=false;
    $scope.usuario_promocion=false;
	
	var tipo_usuario=loginData.getLogin().rol;
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
	
	
	
	$scope.logout = function(){        
        $state.go('login');
        window.location.reload()    
    ;
    };
	
})





//hay que modificar lo de abajo en nombres segun fotmato y lo que se va a guardar XD


.service('login_datos', function() {
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
      controller:"controlador_menu"
  };});