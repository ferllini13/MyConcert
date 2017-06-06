var webSeviceIp = 'http://webservicemyconcert.azurewebsites.net/MyConcert.asmx/';

angular.module('MyConcert', ['ionic','spotify'])

.config(function (SpotifyProvider) {
	    SpotifyProvider.setClientId('4ea812437f8242599ceefeddacb80df0') ;
        SpotifyProvider.setRedirectUri('http://localhost:8100/callback.html');
        SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
		SpotifyProvider.setAuthToken(localStorage.getItem('spotify-token'));
})


.config( function ( $stateProvider , $urlRouterProvider ){
    
	$stateProvider.state('login', {
                url:'/login',
                controller: 'LoginController',
                templateUrl:'html/login.html'
            })
    $stateProvider.state('register', {
                url:'/register',
                controller: 'RegisterController',
                templateUrl:'html/registro.html'
            })
    
    $stateProvider.state('main', {
                url:'/main',
                controller: 'mainController',
                templateUrl:'html/inicio.html'
            })
	$stateProvider.state('pband', {
                url:'/pband',
                controller: 'pbandController',
                templateUrl:'html/banda.html'
            })
	$stateProvider.state('band', {
                url:'/band',
                controller: 'bandController',
                templateUrl:'html/verBanda.html'
            })
    $stateProvider.state('editband', {
                url:'/editband',
                controller: 'editBandController',
                templateUrl:'html/editarBanda.html'
            })
    $stateProvider.state('addband', {
                url:'/addband',
                controller: 'addBandController',
                templateUrl:'html/añadirBanda.html'
            })
    
	$stateProvider.state('catalogue', {
                url:'/catalogue',
                controller: 'catalogueController',
                templateUrl:'html/catalogo.html'
            })
	
      $urlRouterProvider.otherwise('/login');
})
   

.controller('LoginController', function($scope,$http,$state,connectApi){
		$scope.starPage=function(){
		localStorage.clear();
	};
	
	
	
    //$scope.login = {username:'', password:'',name:'',id:'', rol:'' };
        //var form = document.getElementById("myForm");  
        //form.onsubmit = function(){
        //form.reset();
      //}
		
		
		
    $scope.checkUser =  function(loginUserName,loginPasword){
		
		
		var method="VerificarLogeo";
		var msj={'userName':loginUserName,'password':loginPasword};

		
		 var answer = connectApi.httpGet($http,method,msj)
		
        //$state.go('main');
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




.controller('RegisterController', function($scope, $state,$http){
            
            })

.controller('bandController', function($scope, $state,$http){
            
            })

.controller('editBandaController', function($scope, $state,$http){
            
            })

.controller('addBandaController', function($scope, $state,$http){
            
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
     var msj = { 
         frase:"Mauricio el chunche montero:PRESENTE"
     };
     $http.post(webSeviceIp+'Publicar', msj).then(function(response) {
		 console.log("respuesta");
		  var answer= angular.fromJson(response.data.d);
         console.log(answer);
       
       });
};
	
	
	$scope.tryg =  function(login){
		console.log("entramos g");
       $http.get(webSeviceIp +'Publicar?frase=holaMau')
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

.controller('catalogueController', function($scope, $state){
	$scope.isEmpty=true;
	$scope.catalogue=[];
	
	if ($scope.catalogue.length!=0){
		$scope.isEmpty=false;
	}
	else{$scope.isEmpty=true;}
})

.controller('mainController', function($scope, $state){
	$scope.imageArray =["https://www.googleplaymusicdesktopplayer.com/img/par1.jpg","http://www.desicomments.com/wp-content/uploads/2017/04/Music-image.jpg","http://az616578.vo.msecnd.net/files/2015/12/19/6358614596527738711752945771_music.jpg","http://az616578.vo.msecnd.net/files/2017/03/05/636243282134517774-314545726_music9.jpg"];
	
	$scope.imageArray2 =["http://darbaculture.com/wp-content/uploads/2014/10/sonar-festival-1.jpg","http://estaticos.codigonuevo.com/wp-content/uploads/2015/05/Festivales.jpg","https://www.parkapp.com/blog/wp-content/uploads/2016/05/Festivales-mayo-festify.jpg","http://static.t13.cl/images/sizes/1200x675/mgr_bild-berlin-1.jpg","https://upload.wikimedia.org/wikipedia/commons/0/0b/Electrobeach_Music_Festival_2013.jpg"];
	
	
})



.controller('pbandController', function($scope, $state,Spotify,$http){
	var clientId ="4ea812437f8242599ceefeddacb80df0";
	var clientSecret ="13c8e7890bc34b34b1bfd3784e5de0fd";
	$scope.tracks = [];
	$scope.audio=new Audio();
	
	$scope.spotifyLogin=function(){	Spotify.login();}
	
	console.log(localStorage.getItem('spotify-token'));
	
	$scope.fun =  function(){
		
		var req = {method: 'GET', url: 'https://api.spotify.com/v1/tracks/5XcZRgJv3zMhTqCyESjQrF',headers: {'Authorization': 'Bearer ' + localStorage.getItem('spotify-token')}};
		
		$http(req).then(function(response){
			$scope.tracks=response.items; 
			console.log(response)
		});
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
}}})

.directive('menu', function() {
  return {
     templateUrl: 'html/menu.html',
      controller:"menuController"
  };})


.service('connectApi',function(){
	return {
		httpGet: function($http,method,requestJson){
			$http.get(webSeviceIp + method+'?frase='+JSON.stringify(requestJson))
          		.then(function (response) {
					
					console.log(response.data.substring(73, response.data.length - 9));
		    		var answer= angular.fromJson(response.data.substring(73, response.data.length - 9));
					return this.answer;
                    });
			
			
		},
		httpPost: function($http,method,requestJson){
			$http.post(webSeviceIp+method, requestJson).then(function(response) {
		 		console.log("respuesta");
		  		var answer= angular.fromJson(response.data.d);
         		console.log(answer);
				return this.answer;
       
       		});
		}
		
		
	};
})