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
	$stateProvider.state('seeBand', {
                url:'/seeBand/:bandId',
                controller: 'SeeBandController',
                templateUrl:'html/verBanda.html'
            })
    $stateProvider.state('editBand', {
                url:'/editBand/:bandId',
                controller: 'editBandController',
                templateUrl:'html/editarBanda.html'
            })
    $stateProvider.state('addBand', {
                url:'/addBand',
                controller: 'addBandController',
                templateUrl:'html/añadirBanda.html'
            })
    
	$stateProvider.state('catalogue', {
                url:'/catalogue',
                controller: 'catalogueController',
                templateUrl:'html/catalogo.html'
            })
	$stateProvider.state('profile', {
                url:'/profile',
                controller: 'profileController',
                templateUrl:'html/perfil.html'
            })
      $urlRouterProvider.otherwise('/login');
})
   

.controller('LoginController', function($scope,$state,connectApi){
	$scope.starPage=function(){localStorage.clear();};
	
	
    $scope.checkUser =  function(loginUserName,loginPasword){	
		var method="VerificarLogeo";
		var msj={userName:loginUserName,password:loginPasword};
	
		connectApi.httpGet(method,msj).then(function(answer) {
			console.log(answer)
      		if (answer.length!=0){
				localStorage.setItem('userName', loginUserName);
				localStorage.setItem('userId', answer[0].id);
				localStorage.setItem('userRol', answer[0].rolID);
				localStorage.setItem('userState', answer[0].activo);
				$state.go('main');
		 	}
    	});
		
	};
})


.controller('profileController', function($scope, $state,$http){
            
            })

.controller('RegisterController', function($scope, $state,$http){
            
            })

.controller('SeeBandController', function($scope,$state,$stateParams,$http){
	$scope.bandToSee= $stateParams.bandId;
            
            })

.controller('editBandController', function($scope, $state,$stateParams,$http){
	$scope.bandToEdit= $stateParams.bandId;
	
            
            })

.controller('addBandController', function($scope, $state,$http){
            })


.controller('menuController', function($scope, $state,$http){
	$scope.fanaticUser=false;
    $scope.pomotionUser=false;
	$scope.userName=localStorage.getItem('userName');
	var rol = localStorage.getItem('userRol');

	if (rol===1){
		$scope.fanaticUser=true;
		$scope.pomotionUser=false;
	}
	else if (rol===3){
		$scope.pomotionUser=true;
		$scope.fanaticUser=false;
	}

	//colocar el else y algun tipo de error
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


.directive('menu', function() {
 	return {
    	templateUrl: 'html/menu.html',
      	controller:"menuController"
	};
})

.service('connectApi',function($http){
	this.httpGet= function(method,requestJson){
		var getPromise=$http.get(webSeviceIp + method+'?frase='+JSON.stringify(requestJson)).then(function (response){
	    	return angular.fromJson(response.data.substring(73, response.data.length - 9));
		});
		return getPromise;
	},
	this.httpPost= function(method,requestJson){
		var postPromise=$http.post(webSeviceIp+method, requestJson).then(function(response) {
	  		return angular.fromJson(response.data.d);
       	});
		return postPromise;
	}
})