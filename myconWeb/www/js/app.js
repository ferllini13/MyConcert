var webSeviceIp = 'http://webservicemyconcert.azurewebsites.net/WebService1.asmx/';

angular.module('MyConcert', ['ionic'])


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
    $stateProvider.state('addBand', {
                url:'/addBand',
                controller: 'addBandController',
                templateUrl:'html/añadirBanda.html'
            })
    $stateProvider.state('addCategory', {
                url:'/addCategory',
                controller: 'addCategoryController',
                templateUrl:'html/añadirCategoria.html'
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
    
    $stateProvider.state('createBillboard', {
                url:'/createBillboard',
                controller: 'createBillboardController',
                templateUrl:'html/crearCartelera.html'
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
				console.log("rol id");
				console.log(answer[0].id);
				localStorage.setItem('userState', answer[0].activo);
				if (answer[0].activo==false){
					$state.go('profile')	
				}
				else{
					$state.go('main');
				}
			}
    	});
		
	};
})


.controller('profileController', function($scope, $state,$http,connectApi){
	document.getElementById('file').onchange=function() {previewFile()};
    $scope.userName=localStorage.getItem('userName');
	$scope.userData={};
	$scope.fanatic=false;
	var rol =localStorage.getItem('userRol');
	$scope.checked=true;
	
	if (rol==1){
		$scope.fanatic=true;	
	}else {$scope.fanatic=false;}
	
	$scope.getUserData= function(){
		var method;
		if ($scope.fanatic){
			method='ObtenerFanatico';
		}
		else{
			method='/ObtenerPromocion'
		}	
		connectApi.httpGet('ObtenerFanatico',{id:localStorage.getItem('userId')}).then(function(answer) {
			$scope.userData=answer[0];
			console.log($scope.userData);
			updateCheck();
		});
	}
	
	

	var updateCheck=function(){
		if ($scope.userData.activo===true){
			$scope.checked=true;
		}else{$scope.checked=false;}
	}
	
	$scope.updateActive=function(boolActive){
		$scope.userData.activo=boolActive;
		updateCheck();
	}
	
	
	
	$scope.updateProfile=function(){
		//meter post aqui
	}
	
	
	function previewFile() {
  		var preview = document.getElementById('pic');
  		var file    = document.getElementById('file').files[0];
		console.log(file);
  		var reader  = new FileReader();

  		reader.addEventListener("load", function () {
    		preview.src = reader.result;
		}, false);

  		if (file) {
    		reader.readAsDataURL(file);
  		}
	}
	
	
})

.controller('RegisterController', function($scope, $state,connectApi){
	document.getElementById('file').onchange=function() {previewFile()};
	$scope.genres=[]; 
	$scope.addedGenres=[];
	$scope.genresId=[];
	$scope.userData={generos:[],foto:"",fechaInscripcion:""};
	$scope.password={};
	$scope.userType=true;
	$scope.changeUserType=function(){
		$scope.userType=!$scope.userType;
		console.log($scope.userType)
	}
	$scope.fun =function(){
	console.log($scope.userData)
	}
	
	$scope.resetData=function(){
		$scope.userData={};
		$scope.password={};
		$scope.addedGenres=[];
		$scope.getGenres();
		
	}
	
	$scope.addUser=function(){
		$scope.userData.fechaNacimiento=$scope.userData.fechaNacimiento.toString().substring(0, 10);
		$scope.userData.fechaInscripcion="2017-06-09";
		$scope.userData.foto=null;
				console.log($scope.userData);
		if ($scope.userType){
			connectApi.httpPost('CrearFanatico',$scope.userData).then(function(answer) {
				console.log($scope.userData);
			updateCheck();
			});
		}
		else {
			//promocion
		}
	}
	$scope.getGenres=function(){
		connectApi.httpGet('ObtenerGeneros',"").then(function(answer) {
			$scope.genres=answer;
		});	
	}
	$scope.addGenre=function(gen){
		$scope.addedGenres.push(gen);
		$scope.genres.splice($scope.genres.indexOf(gen),1);
		$scope.userData.generos.push(gen.id);
	}
	
	$scope.removeGenre=function(gen){
		$scope.genres.push(gen);
		$scope.addedGenres.splice($scope.addedGenres.indexOf(gen),1);
		$scope.userData.generos.splice($scope.genresId.indexOf(gen.id),1);
	}
	
	function previewFile(){
  		var preview = document.getElementById('pic');
  		var file    = document.getElementById('file').files[0];
  		var reader  = new FileReader();
  		reader.addEventListener("load", function () {
    		preview.src = reader.result;
		}, false);

  		if (file) {
    		reader.readAsDataURL(file);
  		}
	}
})

.controller('SeeBandController', function($scope,$state,$stateParams,connectApi){
	var bandToSee= $stateParams.bandId;
    $scope.nameband="";
    $scope.bandquali="";
    $scope.unaBanda = [];
    $scope.bandArtist=[];
    $scope.bandSongs=[];
    $scope.bandCom=[];
    $scope.getBand =  function(){	
	
	connectApi.httpGet('ObtenerUnaBanda',{id:bandToSee}).then(function(answer) {
		console.log(answer);
        $scope.unaBanda=answer;
        $scope.nameband=answer[0].nombre;
        $scope.bandquali=answer[0].calificacion;
        console.log(answer[0].calificacion);
	});
    connectApi.httpGet('ObtenerMiembros',{id:bandToSee}).then(function(answer) {
		console.log(answer);
        $scope.bandArtist=answer;
	});
	connectApi.httpGet('ObtenerCanciones',{id:bandToSee}).then(function(answer) {
		console.log(answer);
        $scope.bandSongs=answer;
	});	        
	connectApi.httpGet('ObtenerComentarios',{id:bandToSee}).then(function(answer) {
		console.log(answer);
        $scope.bandCom=answer;
	});        
	};
    
    $scope.comment =  function(Comment){
        console.log({mensaje:Comment,comentadorId:localStorage.getItem('userId'),bandaId:bandToSee,calificacion:document.getElementById('input-5').value});
        connectApi.httpPost('InsertarComentarios',{mensaje:Comment,comentadorId:localStorage.getItem('userId'),bandaId:bandToSee,calificacion:document.getElementById('input-5').value}).then(function(answer){
                            console.log(answer);
                                                           });
    }
    
    })


.controller('addBandController', function($scope, $state,connectApi){
	$scope.genres=[];
	$scope.addedGenres=[];
	$scope.bandData={artistas:[],canciones:[],generos:[],nombre:""};
	
	$scope.addMember=function(){
		var menberName= document.getElementById('member').value;
		if (menberName||menberName!=""){
			$scope.bandData.artistas.push(menberName);
			document.getElementById('member').value="";
			console.log($scope.bandData.artistas);
		}
	};
	$scope.addSong=function(){
		var songName=document.getElementById('song').value;
		if (songName||songName!=""){
			$scope.bandData.canciones.push(songName);
			document.getElementById('song').value="";
			console.log($scope.bandData.canciones);
		}
	};
	$scope.removeMember=function(menberName){
		console.log(menberName);
		$scope.bandData.artistas.splice($scope.bandData.artistas.indexOf(menberName),1);
	};
	$scope.removeSong=function(songName){
		$scope.bandData.canciones.splice($scope.bandData.canciones.indexOf(songName),1);
	};
	
	
	$scope.addBand=function(){
		connectApi.httpPost('AgregarBanda',$scope.bandData).then(function(answer) {
			console.log(answer);
	});
		
	};
	$scope.getGenres=function(){
		connectApi.httpGet('ObtenerGeneros',"").then(function(answer) {
			$scope.genres=answer;
		});	
	}
	$scope.addGenre=function(gen){
		$scope.addedGenres.push(gen);
		$scope.genres.splice($scope.genres.indexOf(gen),1);
		$scope.bandData.generos.push(gen.id);
	}
	
	$scope.removeGenre=function(gen){
		$scope.genres.push(gen);
		$scope.addedGenres.splice($scope.addedGenres.indexOf(gen),1);
		$scope.bandData.generos.splice($scope.bandData.generos.indexOf(gen.id),1);
	}
	
	
	$scope.addBand=function(){
		
		
		console.log($scope.bandData);
		/*
		connectApi.httpPost('AgregarBanda',$scope.bandData).then(function(answer) {
				console.log($scope.userData);
		});
		*/
		
		
	}
})




.controller('addCategoryController', function($scope, $state,connectApi,$http){
        $scope.sendCategory =  function(NameCategory,description){
                var msj = {nombre:NameCategory,descripcion:description}
                 console.log(msj);
                connectApi.httpPost('InsertarCategoria',{nombre:NameCategory,descripcion:description}).then(function(answer) {
                console.log(answer);
                });
        }
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
	else if (rol===2){
		$scope.pomotionUser=true;
		$scope.fanaticUser=false;
	}

	//colocar el else y algun tipo de error
	
	
	$scope.logOut=function(){
		localStorage.clear();
		$state.go('login');
	};
})


.controller('catalogueController', function($scope, $state,connectApi){
	$scope.isEmpty;
	$scope.catalogue=[];
	
	
	$scope.getBands =  function(){	
	
	connectApi.httpGet('ObtenerTodasBandas',"").then(function(answer) {
		console.log(answer);
		$scope.catalogue=answer;
		
		if ($scope.catalogue.length!=0){
		$scope.isEmpty=false;
		}
		else{$scope.isEmpty=true;}
 
	});
	
	
	};
})


.controller('mainController', function($scope, $state){
	$scope.imageArray =["https://www.googleplaymusicdesktopplayer.com/img/par1.jpg","http://www.desicomments.com/wp-content/uploads/2017/04/Music-image.jpg","http://az616578.vo.msecnd.net/files/2015/12/19/6358614596527738711752945771_music.jpg","http://az616578.vo.msecnd.net/files/2017/03/05/636243282134517774-314545726_music9.jpg"];
	
	$scope.imageArray2 =["http://darbaculture.com/wp-content/uploads/2014/10/sonar-festival-1.jpg","http://estaticos.codigonuevo.com/wp-content/uploads/2015/05/Festivales.jpg","https://www.parkapp.com/blog/wp-content/uploads/2016/05/Festivales-mayo-festify.jpg","http://static.t13.cl/images/sizes/1200x675/mgr_bild-berlin-1.jpg","https://upload.wikimedia.org/wikipedia/commons/0/0b/Electrobeach_Music_Festival_2013.jpg"];
})



.controller('pbandController', function($scope, $state,$http,connectApi){
	document.getElementById('file').onchange=function() {previewFile()};
	$scope.try={
  "album" : {
    "album_type" : "album",
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d"
      },
      "href" : "https://api.spotify.com/v1/artists/1dfeR4HaWDbWqFHLkxsg1d",
      "id" : "1dfeR4HaWDbWqFHLkxsg1d",
      "name" : "Queen",
      "type" : "artist",
      "uri" : "spotify:artist:1dfeR4HaWDbWqFHLkxsg1d"
    } ],
    "external_urls" : {
      "spotify" : "https://open.spotify.com/album/7oHaj9jkWHByziQsqGAb8V"
    },
    "href" : "https://api.spotify.com/v1/albums/7oHaj9jkWHByziQsqGAb8V",
    "id" : "7oHaj9jkWHByziQsqGAb8V",
    "images" : [ {
      "height" : 640,
      "url" : "https://i.scdn.co/image/6bd26952895dacf25b7529e58b2f118e61d42226",
      "width" : 640
    }, {
      "height" : 300,
      "url" : "https://i.scdn.co/image/be6434a26cf7984b47979f89d26c54dc4796a0a0",
      "width" : 300
    }, {
      "height" : 64,
      "url" : "https://i.scdn.co/image/45e552a7b9f774015de2abe8b4b877bd34ec2727",
      "width" : 64
    } ],
    "name" : "The Works (Deluxe Remastered Version)",
    "type" : "album",
    "uri" : "spotify:album:7oHaj9jkWHByziQsqGAb8V"
  },
  "artists" : [ {
    "external_urls" : {
      "spotify" : "https://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d"
    },
    "href" : "https://api.spotify.com/v1/artists/1dfeR4HaWDbWqFHLkxsg1d",
    "id" : "1dfeR4HaWDbWqFHLkxsg1d",
    "name" : "Queen",
    "type" : "artist",
    "uri" : "spotify:artist:1dfeR4HaWDbWqFHLkxsg1d"
  } ],
  "disc_number" : 2,
  "duration_ms" : 258013,
  "explicit" : false,
  "external_ids" : {
    "isrc" : "GBUM71029625"
  },
  "external_urls" : {
    "spotify" : "https://open.spotify.com/track/3Au6174rC3JSzZN5BhCl3D"
  },
  "href" : "https://api.spotify.com/v1/tracks/3Au6174rC3JSzZN5BhCl3D",
  "id" : "3Au6174rC3JSzZN5BhCl3D",
  "is_playable" : true,
  "linked_from" : {
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/7h2yhVxcZOGyQdOwD4Hu8J"
    },
    "href" : "https://api.spotify.com/v1/tracks/7h2yhVxcZOGyQdOwD4Hu8J",
    "id" : "7h2yhVxcZOGyQdOwD4Hu8J",
    "type" : "track",
    "uri" : "spotify:track:7h2yhVxcZOGyQdOwD4Hu8J"
  },
  "name" : "I Want To Break Free - Single Remix",
  "popularity" : 64,
  "preview_url" : "https://p.scdn.co/mp3-preview/5d44e5dc88e511bf7270cd254ca8ae586b5c9b49?cid=8897482848704f2a8f8d7c79726a70d4",
  "track_number" : 2,
  "type" : "track",
  "uri" : "spotify:track:3Au6174rC3JSzZN5BhCl3D"
};
	

function saveBase64AsFile(blob, fileName) {

        var reader = new FileReader();
	    reader.readAsDataURL(blob);

    	reader.onloadend = function () {    
        	var base64 = reader.result ;
        	var link = document.createElement("a");

			link.setAttribute("href", base64);
        	link.setAttribute("download", fileName);
        	link.click();
    };
}
	
	
	
$scope.up=function(){
	var file    = document.getElementById('file').files[0];

	
	if(file){
		var name= file.name;
		saveBase64AsFile(file,name);
	}
}
	
function previewFile() {
  	var preview = document.getElementById('pic');
  	var file    = document.getElementById('file').files[0];
	console.log(file);
  	var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}	

})




.controller('createBillboardController', function($scope, $state,$http){
    document.getElementById('file').onchange=function() {previewFile()};
    
	function previewFile() {
  		var preview = document.getElementById('pic');
  		var file    = document.getElementById('file').files[0];
  		var reader  = new FileReader();
  		reader.addEventListener("load", function () {
    		preview.src = reader.result;
		}, false);

  		if (file) {
    		reader.readAsDataURL(file);
  		}
	}
    
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
		var postPromise=$http.post(webSeviceIp+method,requestJson).then(function(response) {
	  		return angular.fromJson(response.data.d);
       	});
		return postPromise;
	}
})