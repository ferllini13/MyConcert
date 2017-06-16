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
    
    $stateProvider.state('seeBillboard', {
                url:'/seeBillboard',
                controller: 'seeBillboardController',
                templateUrl:'html/verCartelera.html'
            })
    
    
      $urlRouterProvider.otherwise('/login');
})
   

.controller('LoginController', function($scope,$state,connectApi){
	$scope.starPage=function(){
        localStorage.clear();
        document.getElementById('myForm').clear;                        
                              };
	
	
    $scope.checkUser =  function(loginUserName,loginPasword){	
		var method="VerificarLogeo";
		var msj={userName:loginUserName,password:loginPasword};
	
		connectApi.httpGet(method,msj).then(function(answer) {
			console.log(answer)
      		if (answer.length!=0){
                localStorage.clear();
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
	$scope.date={};
	$scope.genres=[];
	$scope.addedGenres=[];
	$scope.genresId=[];
	$scope.userData={generos:[],foto:"",fechaInscripcion:""};
	$scope.password={};
	$scope.userType=true;
	$scope.changeUserType=function(){
		$scope.userType=!$scope.userType;
	}
	
	$scope.fun =function(){
	console.log($scope.userData)
	}
	
	$scope.resetData=function(){
		$scope.userData={generos:[],foto:"",fechaInscripcion:""};
		$scope.password={};
		$scope.addedGenres=[];
		$scope.getGenres();
	}

	$scope.addUser=function(){
		var today= new Date();
<<<<<<< HEAD
		$scope.userData.fechaInscripcion=new Date().toJSON().slice(0,10);
		console.log($scope.userData.fechaInscripcion);
        console.log($scope.userData);
=======
		$scope.userData.fechaInscripcion=today.toJSON().slice(0,10);
>>>>>>> 54cab63a563b480508c6277aa72110f62e9a2ace
		$scope.userData.foto='https://s-media-cache-ak0.pinimg.com/originals/76/11/73/761173b79751f1f8a87681e676af7348.jpg';
		if ($scope.userType){
			$scope.userData.fechaNacimiento= new Date($scope.date.date).toJSON().slice(0,10);
			connectApi.httpPost('CrearFanatico',$scope.userData).then(function(answer) {
				console.log(answer);
			});
		}
		else {
			$scope.userData['identificador']= today.getTime().toString().slice(4,14);
			connectApi.httpPost('CrearUsuarioPromocion',$scope.userData).then(function(answer) {
				console.log(answer);
			});
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

.controller('SeeBandController', function($scope,$state,$stateParams,$sce,connectApi){
	var bandToSee= $stateParams.bandId;
    $scope.nameband="";
    $scope.bandquali="";
    $scope.unaBanda = [];
    $scope.bandArtist=[];
    $scope.bandSongs=[];
    $scope.bandCom=[];
    $scope.userComment={comment:""};
    $scope.userType=true;
    $scope.getBand =  function(){
        
    var rol = localStorage.getItem('userRol');
	if (rol==1){
		$scope.userType=true;
	}
	else if (rol==2){
		$scope.userType=false;
	}
    
	
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
    
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
    
    $scope.comment =  function(){
        console.log($scope.userComment.comment);       
        connectApi.httpPost('InsertarComentarios',{mensaje:$scope.userComment.comment,comentadorId:localStorage.getItem('userId'),bandaId:bandToSee,calificacion:document.getElementById('input-5').value}).then(function(answer){
                            console.log(answer);
        });
    }
    
    })


.controller('addBandController', function($scope, $state,connectApi){
	$scope.genres=[];
	$scope.addedGenres=[];
	$scope.bandData={miembros:[],cancionesPrincipales:[],generos:[],nombre:""};
	
	$scope.addMember=function(){
		var menberName= document.getElementById('member').value;
		if (menberName||menberName!=""){
			$scope.bandData.miembros.push(menberName);
			document.getElementById('member').value="";
			console.log($scope.bandData.miembros);
		}
	};
	$scope.addSong=function(){
		var songName=document.getElementById('song').value;
		if (songName||songName!=""){
			$scope.bandData.cancionesPrincipales.push(songName);
			document.getElementById('song').value="";
			console.log($scope.bandData.cancionesPrincipales);
		}
	};
	$scope.removeMember=function(menberName){
		console.log(menberName);
		$scope.bandData.miembros.splice($scope.bandData.miembros.indexOf(menberName),1);
	};
	$scope.removeSong=function(songName){
		$scope.bandData.cancionesPrincipales.splice($scope.bandData.cancionesPrincipales.indexOf(songName),1);
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
		connectApi.httpPost('InsertarBanda',$scope.bandData).then(function(answer) {
			console.log(answer);
		});
	};
})




.controller('addCategoryController', function($scope, $state,connectApi){
		var form=document.getElementById('myForm');
	    $scope.categoryData = {};
        $scope.sendCategory =  function(NameCategory,description){

                connectApi.httpPost('InsertarCategoria',$scope.categoryData).then(function(answer) {
                	console.log(answer);
					form.reset();
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



.controller('pbandController', function($scope, $state,connectApi){
document.getElementById('file').onchange=function() {previewFile()};
	

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

.controller('createBillboardController', function($scope, $state,connectApi){
    document.getElementById('file').onchange=function() {previewFile()};
	$scope.categories=[];
	$scope.bands=[];
	$scope.addedBands=[];
	$scope.activeCategory;
	$scope.addedCategories=[];
	var addedBandsIds=[];
	
	$scope.getCategories=function(){
		connectApi.httpGet('ObtenerCategorias',"").then(function(answer) {
			$scope.categories=answer;
		});
		$scope.getBands();
	}
	
	$scope.getBands=function(){
		connectApi.httpGet('ObtenerTodasBandas',"").then(function(answer) {
			$scope.bands=answer;
		});
	}
	
	$scope.activateCategorie=function(category){
		if ($scope.activeCategory===category){
			$scope.activeCategory=null;
			addedBandsIds=[];
			for (i = 0; i < $scope.addedBands.length; i++) { 
    			$scope.bands.push($scope.addedBands[i]);
			}
			$scope.addedBands=[];
			
		}
		else{
			$scope.activeCategory=category;
			addedBandsIds=[];
			for (i = 0; i < $scope.addedBands.length; i++) {
    			$scope.bands.push($scope.addedBands[i]);
			}
			$scope.addedBands=[];
		}	
	}
	
	$scope.addBands= function(band){
		$scope.addedBands.push(band);
		$scope.bands.splice($scope.bands.indexOf(band),1);
		addedBandsIds.push(band.id);
		
	}
	
	$scope.confirmCategories=function(){
		$scope.addedCategories.push({id:$scope.activeCategory.id,bandas:addedBandsIds})
		addedBandsIds=[];
		$scope.addedBands=[];
		$scope.categories.splice($scope.categories.indexOf($scope.activeCategory),1);
		$scope.activeCategory=null;
		
	}
	
	$scope.addbandToCategory=function(){}
	
	    
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


.controller('seeBillboardController', function($scope, $state,$http,connectApi){
    $scope.unaCartelera = [];
    $scope.listCategory= [];
    $scope.categorybands=[];
    $scope.categoryAct=[];
    $scope.datosEnviar={};
    $scope.getBillboard = function(){
        
        connectApi.httpGet('ObtenerUnaCartelera',{id:"1"}).then(function(answer) {
		console.log(answer);
        $scope.unaCartelera=answer;
	});
        
        
        connectApi.httpGet('ObtenerCategoriasPorCartelera',{id:"1"}).then(function(answer) {
		console.log(answer);
        $scope.listCategory=answer;
	});       
    }
    
    $scope.categorieBands=function(category){
        connectApi.httpGet('ObtenerBandasPorCategoria',{id:"1",popularidad:category.id}).then(function(answer) {
		console.log(answer);
        $scope.categorybands=answer;
        $scope.categoryAct=category;
	}); 
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
		var postPromise=$http.post(webSeviceIp+method, {frase:JSON.stringify(requestJson)}).then(function(response) {
	  		return angular.fromJson(response.data.d);
       	});
		return postPromise;
	}
})