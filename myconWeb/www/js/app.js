var webSeviceIp = 'http://webservicemyconcert.azurewebsites.net/WebService1.asmx/';

angular.module('MyConcert', ['ionic'])

//Definicion general de las vistas, con su respectiva url y html
.config( function ( $stateProvider , $urlRouterProvider ){
    
	$stateProvider.state('login', {//vista de login
                url:'/login',
                controller: 'LoginController',
                templateUrl:'html/login.html'
            })
    $stateProvider.state('register', {//vista de registro
                url:'/register',
                controller: 'RegisterController',
                templateUrl:'html/registro.html'
            })
    $stateProvider.state('main', {//vista pagina principal
                url:'/main',
                controller: 'mainController',
                templateUrl:'html/inicio.html'
            })
	$stateProvider.state('seeBand', {//vista para ver una banda, url resive el id de la banda
                url:'/seeBand/:bandId',
                controller: 'SeeBandController',
                templateUrl:'html/verBanda.html'
            })
    $stateProvider.state('addBand', {//vista para añadir una banda
                url:'/addBand',
                controller: 'addBandController',
                templateUrl:'html/añadirBanda.html'
            })
    $stateProvider.state('addCategory', {//vista para añadir una categoria
                url:'/addCategory',
                controller: 'addCategoryController',
                templateUrl:'html/añadirCategoria.html'
            })
    
	$stateProvider.state('catalogue', {//vista para ver todo el catalogo de bandas
                url:'/catalogue',
                controller: 'catalogueController',
                templateUrl:'html/catalogo.html'
            })
	$stateProvider.state('profile', {//vista de perfil
                url:'/profile',
                controller: 'profileController',
                templateUrl:'html/perfil.html'
            })
    
    $stateProvider.state('createBillboard', {//vista para crear una cartelera
                url:'/createBillboard',
                controller: 'createBillboardController',
                templateUrl:'html/crearCartelera.html'
            })
    
    $stateProvider.state('seeBillboard', {//vista para ver una cartelera ya creada
                url:'/seeBillboard/:billboardId',
                controller: 'seeBillboardController',
                templateUrl:'html/verCartelera.html'
            })
    
    $stateProvider.state('seeFestival', {//vista para ver un festival ya creado
                url:'/seeFestival/:festivalid',
                controller: 'seeFestivalController',
                templateUrl:'html/verFestival.html'
            })
    
    $stateProvider.state('createFestival', {//vista para crear un festival
                url:'/createFestival/:billboardId',
                controller: 'createFestivalController',
                templateUrl:'html/crearFestival.html'
            })
    
    
      $urlRouterProvider.otherwise('/login');//si no se seleeciona una url permitida, el defecto es el login
})
   
//controlador de la vista login
.controller('LoginController', function($scope,$state,connectApi){
	$scope.starPage=function(){//condiciones iniciales
        localStorage.clear();
		localStorage= null;
        document.getElementById('myForm').clear;                        
       };
	
	
    $scope.checkUser =  function(loginUserName,loginPasword){//verificacion de la existencia de un usuario	
		var method="VerificarLogeo";
		var msj={userName:loginUserName,password:loginPasword};
	
		//metod de http angular
		connectApi.httpGet(method,msj).then(function(answer) {
			console.log(answer)
      		if (answer.length!=0){
				//se llena el cache con los datos del usuario retornados por la base.
                localStorage.clear();
				localStorage= null;
				localStorage.setItem('userName', loginUserName);
				localStorage.setItem('userId', answer[0].id);
				localStorage.setItem('userRol', answer[0].rolID);
				console.log("rol id");
				console.log(answer[0].id);
				localStorage.setItem('userState', answer[0].activo);
				if (answer[0].activo==false){//condiciones de verificacion de estado, activo, inactivo
					$state.go('profile')	
				}
				else{
					$state.go('main');
				}
			}
			else if(answer.length==0){//no hubo coincidencia con la base de datos
				alert("Usuario no registrado: revise su nombre de usuario y contraseña");
			}
    	});
		
	};
})

//controladro de la vista de perfil
.controller('profileController', function($scope, $state,$http,connectApi){
	document.getElementById('file').onchange=function() {previewFile()};//conrolador de la preview de la imagen de perfil
    $scope.userName=localStorage.getItem('userName');//carga datos del cache
	//se  definen variables de importancia para el manejo de los datos
	$scope.userData={};
	$scope.date={};
	$scope.fanatic=false;//tipo de usuario fanitico=true
	var rol =localStorage.getItem('userRol');
	$scope.checked=true;
	
	if (rol==1){//verificacion de permisiso
		$scope.fanatic=true;	
	}else {$scope.fanatic=false;}
	
	
	$scope.getUserData= function(){//solicitud datos del usuario al servidor 
		var method;
		if ($scope.fanatic){
			method='ObtenerFanatico';
		}
		else{
			method='/ObtenerPromocion'
		}
		//http.get de los datos
		connectApi.httpGet(method,{id:localStorage.getItem('userId')}).then(function(answer) {
			$scope.userData=answer[0];//almacenamiento de datos recibidos para su uso
			updateCheck();
		});
	}
	
	
	//actualiza el estado del usuario
	var updateCheck=function(){
		if ($scope.userData.activo===true){
			$scope.checked=true;
		}else{$scope.checked=false;}
	}
	//actualiza el estado del usuario en caso de desactivarse
	$scope.updateActive=function(boolActive){
		$scope.userData.activo=boolActive;
		updateCheck();
	}
	
	
	//actualiza los datos de la base de datos
	$scope.updateProfile=function(){
		var method;
		if ($scope.fanatic){
			method='ActualizarFanatico';
			if ($scope.date.date){
				$scope.userData.fechaNacimiento= new Date($scope.date.date).toJSON().slice(0,10);
			}
		}
		else{
			method='/ActualizarPromocion'
		}
		
		$scope.userData.foto="no foto";
		console.log($scope.userData);
		//http post para setear datos nuevos modificados 
		connectApi.httpPost(method,$scope.userData).then(function(answer) {
				console.log(answer);
			});
	}
	
	//actualiza el preview de la foto
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

//controlador de la vista de registro
.controller('RegisterController', function($scope, $state,connectApi){
	document.getElementById('file').onchange=function() {previewFile()};//para actualizar preview de la vista
	//seteo de variables para almacenamiento y manejo de datos
	$scope.date={};
	$scope.genres=[];
	$scope.addedGenres=[];
	$scope.genresId=[];
	$scope.userData={generos:[],foto:"",fechaInscripcion:"",password:""};
	$scope.password={};
	$scope.userType=true;
	
	$scope.changeUserType=function(){
	$scope.userType=!$scope.userType;
	}
	
	$scope.resetData=function(){
		$scope.userData={generos:[],foto:"",fechaInscripcion:""};
		$scope.password={};
		$scope.addedGenres=[];
		$scope.getGenres();
	}

	$scope.addUser=function(){
		
		if ($scope.password.contrasena1==$scope.password.contrasena2){
			$scope.userData.password=$scope.password.contrasena1;
			var today= new Date();
			$scope.userData.fechaInscripcion=today.toJSON().slice(0,10);
			$scope.userData.foto='https://s-media-cache-ak0.pinimg.com/originals/76/11/73/761173b79751f1f8a87681e676af7348.jpg';
			if ($scope.userType){
				$scope.userData.fechaNacimiento= new Date($scope.date.date).toJSON().slice(0,10);
				connectApi.httpPost('CrearFanatico',$scope.userData).then(function(answer) {
					if (answer.length==0){
						document.getElementById("registro").reset();
						$state.go('login');
					}
					else{alert("No se pudo Registar");}
				});
			}
			else {
				$scope.userData['identificador']= today.getTime().toString().slice(4,14);
				connectApi.httpPost('CrearUsuarioPromocion',$scope.userData).then(function(answer) {
					if (answer.length==0){
						document.getElementById("registro").reset();
						$state.go('login');
					}
					else{alert("No se pudo Registar");}
				});
			}
		}
		else{alert("contraseñas no concuerdan");}
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


//controlador de la vista de ver banda
.controller('SeeBandController', function($scope,$state,$stateParams,$sce,connectApi){
	var bandToSee= $stateParams.bandId;//if a visualizar pasado por parametro
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


//controlador de la vista de anañdir banda
.controller('addBandController', function($scope, $state,connectApi){
	$scope.genres=[];document.getElementById('myFrom').clear;
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
			if (answer.length==0){
				document.getElementById('myFrom').clear;
				alert("banda Añadidad Correctamente")
			}
			else{alert("No se puede Agregar banda");}
			
		});
	};
})



//controlador de la vista de añadir catagoria
.controller('addCategoryController', function($scope, $state,connectApi){
	    $scope.categoryData = {};
        $scope.sendCategory =  function(NameCategory,description){

                connectApi.httpPost('InsertarCategoria',$scope.categoryData).then(function(answer) {
                	if (answer.length==0){
						alert("Categoria Agregada Correctamente");
						document.getElementById('myForm').reset();
					}
					else{alert("No se puede agregar Catagoria");}
                });
        }
            })

//controlador del .service de menu
.controller('menuController', function($scope, $state,$http){
	//carga los datos en cache del usuario logueado
	$scope.userName=localStorage.getItem('userName');
	var rol = localStorage.getItem('userRol');
	$scope.fanaticUser=false;
    $scope.pomotionUser=false;

	
	if (rol==1){//verifica seguridad y setea las variables de restriccion, usuario fanatico
			$scope.fanaticUser=true;
			$scope.pomotionUser=false;
	}
	else if (rol==2){//verifica seguridad y setea las variables de restriccion, usuario promocion
			$scope.pomotionUser=true;
			$scope.fanaticUser=false;
	}
	
	$scope.logOut=function(){//cierra sesion y se hacegura de borrar el cache de los datos del usuario
		localStorage.clear();
		localStorage= null;
		$state.go('login');
		location.reload();
	};
})


//controlador de la vista de catalogo
.controller('catalogueController', function($scope, $state,connectApi){
	$scope.isEmpty;
	$scope.catalogue=[];
	$scope.getBands =  function(){	
	//carga todas las bandas
	connectApi.httpGet('ObtenerTodasBandas',"").then(function(answer) {
		console.log(answer);
		$scope.catalogue=answer;
		
		if ($scope.catalogue.length!=0){
		$scope.isEmpty=false;//describe us es vacio
		}
		else{$scope.isEmpty=true;}
 
	});
	
	};
})

//controlor de la pantalla de inicio
.controller('mainController', function($scope, $state,connectApi){
	$scope.billboards=[];
	$scope.festivals=[];
	//se cargan los datos de festivales y carteleras
	$scope.getAllData = function(){
		connectApi.httpGet('ObtenerTodosFestivales',"").then(function(answer) {//get festivales
			$scope.festivals=answer;
		});
		connectApi.httpGet('ObtenerTodasCarteleras',"").then(function(answer) {//get carteleras
			$scope.billboards=answer;
		});
		
		
		
	}
})

//controlador de la vista de crear cartelera
.controller('createBillboardController', function($scope, $state,connectApi){
    document.getElementById('file').onchange=function() {previewFile()};
    $scope.date={};
    $scope.userData={nombre:"",ubicacion:"",diaInicio:"",diaFinal:"",fechaFinal:"",foto:"",promocionId:localStorage.getItem('userId'),pais:"",categorias:[]};
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
        $scope.userData.categorias=$scope.addedCategories;
        
        console.log($scope.addedCategories);
        console.log($scope.userData);
		
	}
	
    $scope.create=function(){
        $scope.userData.diaInicio= new Date($scope.date.dateIF).toJSON().slice(0,10);
        $scope.userData.diaFinal= new Date($scope.date.dateFF).toJSON().slice(0,10);
        $scope.userData.fechaFinal= new Date($scope.date.dateFV).toJSON().slice(0,10);
        console.log($scope.userData);
        connectApi.httpPost('CrearCartelera',$scope.userData).then(function(answer) {
                	console.log(answer);
                });   
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

//controlador de la vista de ver cartelera
.controller('seeBillboardController', function($scope, $state,$stateParams,connectApi){
	var billboardToSee= $stateParams.billboardId;
	document.getElementById('file').onchange=function() {previewFile()};
    $scope.Billboard = {};
    $scope.BillboardData={idCartelera:billboardToSee,usuarioId:localStorage.getItem('userId'),categorias:[]};
    $scope.categories= [];
 	$scope.selectedCategory;
    $scope.bands = [];
	$scope.bandsId=[];
	$scope.votes = [];
	$scope.total=100;
	
    
    $scope.getBillboard = function(){    
        connectApi.httpGet('ObtenerUnaCartelera',{id:billboardToSee}).then(function(answer) {
          $scope.Billboard=answer[0];
		});
        connectApi.httpGet('ObtenerCategoriasPorCartelera',{id:billboardToSee}).then(function(answer) {
			console.log(answer);
        	$scope.categories=answer;
			$scope.categorieBands($scope.categories[0]);
		});
		 
    }
    
    $scope.categorieBands=function(category){
		if (category==$scope.selectedCategory&&$scope.total==100){
				$scope.selectedCategory=null;
			}	
		else if($scope.total!=0&&$scope.total!=100){
			alert("debe terminar de botar en esta categoria");
		}
		else{
			$scope.total=100;
			$scope.votes = [];
			$scope.bandsId = [];
			$scope.selectedCategory=category;
			connectApi.httpGet('ObtenerBandasPorCategoria',{id:billboardToSee,popularidad:category.id}).then(function(answer) {
					console.log(answer);
					$scope.bands=[];
					$scope.bands=answer;
					for(var i=0;i < $scope.bands.length;i++){
            			$scope.bandsId.push($scope.bands[i].id);
						$scope.votes.push(0);
        			}
				});
		}
	}
	
	$scope.clickVote =function(band){
		if ($scope.total==0){
			alert("Ya gasto sus 100$");
			finishVote();
		}
		else{
			var index=$scope.bandsId.indexOf(band.id);
			$scope.votes[index]=$scope.votes[index]+10;
			$scope.total=$scope.total-10;
			finishVote();
		}
	}
	
	$scope.sendVotes=function(){
		if ($scope.categories.length===0){
			 connectApi.httpPost('RealizarVotacion',$scope.BillboardData).then(function(answer) {
                	console.log(answer);
                });
		}
		else{alert("Debe finalizar la votación en todas las categorias primero");}
	}
	
	function finishVote(){
		if ($scope.total==0){
		$scope.BillboardData.categorias.push({bandas:$scope.bandsId,votos:$scope.votes});

		
		for (i=0;i<$scope.categories.length;i++){
			console.log($scope.categories[i].id);
			if ($scope.categories[i].id===$scope.selectedCategory.id){
				$scope.categories.splice(i,1);
				$scope.selectedCategory=null
				$scope.votes = [];
				$scope.bands=[];
				$scope.bandsId=[];;
				$scope.total=100;
				alert("votacion de esta categoria lista");	
			}
		}
	}
	}
	
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


//controlador de la vista de ver festival
.controller('seeFestivalController', function($scope, $state, $stateParams, $http,connectApi){
    var festToSee= $stateParams.festivalid;//id pasado por parametro
    $scope.oneFestival=[];
    $scope.categoriesFes=[];
    $scope.bandFest=[];
	//se cargan los datos del fesival
    $scope.getFestival =function(){
        connectApi.httpGet('ObtenerDatosFestival',{id:festToSee}).then(function(answer) {
        $scope.oneFestival=answer[0];
        console.log($scope.oneFestival);
	});  
	//se cargan los datos del festival	
        connectApi.httpGet('ObtenerCategoriasFestival',{id:festToSee}).then(function(answer) {
        $scope.categoriesFes=answer;
        console.log($scope.categoriesFes);
	});  
        
    }
    
    $scope.BandsCatFes= function(category){
        connectApi.httpGet('ObtenerBandasCayegoriasFestival',{rol:category.id,id:festToSee}).then(function(answer) {
        $scope.bandFest=answer;
        console.log($scope.bandFest);
	});    
    }
})

//controlador de la vista de de crear festival
.controller('createFestivalController', function($scope, $state, $stateParams,connectApi){
    var billboardBef= $stateParams.billboardId;
    $scope.oneFestival=[];
    $scope.userData={nombre:"",ubicacion:"",fechaInicio:"",fechaFinal:"",foto:"",promotorId:localStorage.getItem('userId'),pais:"",servicio:"",transporte:"",comida:"",categorias:[]};
    $scope.categories=[];
    $scope.bands=[];
    $scope.addedBands=[];
    $scope.activeCategory;
    $scope.oneBillboard={};
    $scope.addedCategories=[];
    var addedBandsIds=[];
    
    
    $scope.getBillboardInfo =function(){
        connectApi.httpGet('ObtenerUnaCartelera',{id:billboardBef}).then(function(answer) {
        $scope.oneBillboard=answer[0];
        console.log($scope.oneBillboard);
	});
        connectApi.httpGet('ObtenerCategoriasPorCartelera',{id:billboardBef}).then(function(answer) {
			$scope.categories=answer;
            console.log($scope.categories);
		});
        
    }
    
    $scope.activateCategorie=function(category){
        connectApi.httpGet('ObtenerBandasPorCategoria',{id:billboardBef,popularidad:category.id}).then(function(answer) {
			$scope.bands=answer;
		});
        
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
        $scope.userData.categorias=$scope.addedCategories;
        
        console.log($scope.addedCategories);
        console.log($scope.userData);
		
	}
    
    $scope.create=function(){
        $scope.userData.nombre=$scope.oneBillboard.nombre;
        $scope.userData.ubicacion=$scope.oneBillboard.ubicacion;
        $scope.userData.fechaInicio=$scope.oneBillboard.diaDeInicio;
        $scope.userData.fechaFinal=$scope.oneBillboard.diaFinal;
        $scope.userData.pais=$scope.oneBillboard.nombre1;
        console.log($scope.userData);
      connectApi.httpPost('CrearFestival',$scope.userData).then(function(answer) {
                	console.log(answer);
                });
    }
})


//directive que permite la funcionalidad del menu
.directive('menu', function() {
 	return {
    	templateUrl: 'html/menu.html',
      	controller:"menuController"
	};
})


//sevice que sobrecarga http con el fin de hacerlo accesible desde todos los comtroladores
.service('connectApi',function($http){
	//implementacion del gttp.get
	this.httpGet= function(method,requestJson){
		var getPromise=$http.get(webSeviceIp + method+'?frase='+JSON.stringify(requestJson)).then(function (response){
	    	return angular.fromJson(response.data.substring(73, response.data.length - 9));
		});
		return getPromise;
	},
	//implementacion del http.post
	this.httpPost= function(method,requestJson){
		var postPromise=$http.post(webSeviceIp+method, {frase:JSON.stringify(requestJson)}).then(function(response) {
            console.log(response);
	  		return angular.fromJson(response.data.d);
       	});
		return postPromise;
	}
})