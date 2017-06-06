CREATE TABLE USUARIO_GENERAL
(
  id int IDENTITY(1,1) UNIQUE NOT NULL,
  nombre varchar(30) NOT NULL,
  apellido varchar(30),
  contraseña varchar(50) NOT NULL,
  nombreUsuario varchar(10) NOT NULL,
  diaInscripcion DATE,
  activo bit DEFAULT 1,
  CONSTRAINT GU_pk PRIMARY KEY (id),  
  CONSTRAINT GU_nombreUsuario_key UNIQUE (nombreUsuario),
 );

CREATE TABLE ROL
(
  id int IDENTITY(1,1) UNIQUE NOT NULL,
  descripcion varchar(30),
  CONSTRAINT R_pk PRIMARY KEY (id)
);

CREATE TABLE FAN_USUARIO
(
  id int IDENTITY(1,1) UNIQUE NOT NULL,
  pais varchar(30),
  ubicacion varchar(100) DEFAULT NULL,
  universidad varchar (30) DEFAULT NULL,
  celular varchar(8) NOT NULL, 
  fechaNacimiento DATE NOT NULL,
  descripcion varchar (300) DEFAULT NULL,
  foto varchar(100) DEFAULT NULL,
  email varchar(30),
  rolID int NOT NULL,
  guID int NOT NULL,
  CONSTRAINT FU_pk PRIMARY KEY (id),
  CONSTRAINT FU_email_key UNIQUE (email),
  CONSTRAINT FU_celular_key UNIQUE (celular),
  CONSTRAINT FU_rol_fkey FOREIGN KEY (rolID)
      REFERENCES ROL (id),
  CONSTRAINT FU_gu_fkey FOREIGN KEY (guID)
      REFERENCES USUARIO_GENERAL (id)
);

CREATE TABLE USUARIO_PROMOCION
(
  id int IDENTITY(1,1) NOT NULL,
  uniqueID varchar NOT NULL,
  rolID int NOT NULL,
  guID int NOT NULL,
  CONSTRAINT PU_pk PRIMARY KEY (id),
  CONSTRAINT PU_rol_fkey FOREIGN KEY (rolID)
      REFERENCES ROL (id),
  CONSTRAINT PU_gu_fkey FOREIGN KEY (guID)
      REFERENCES USUARIO_GENERAL (id)
);

CREATE TABLE GENERO 
(
	id int IDENTITY(1,1) UNIQUE NOT NULL,
	nombre varchar(15) UNIQUE NOT NULL,	
	CONSTRAINT G_pk PRIMARY KEY (id),
);


CREATE TABLE FAN_GENERO
( 
	fanID int NOT NULL,
	generoID int NOT NULL,
	CONSTRAINT FAN_GENERO_fkey FOREIGN KEY (fanID)
		REFERENCES FAN_USUARIO (id),
	CONSTRAINT GENERO_FAN_fkey FOREIGN KEY (generoID)
		REFERENCES GENERO (id),
	CONSTRAINT FG_pkey PRIMARY KEY (fanID,generoID)
);

CREATE TABLE CATALOGO
(
	id int IDENTITY(1,1) UNIQUE NOT NULL,
	CONSTRAINT Catalog_pk PRIMARY KEY (id)
);


CREATE TABLE BANDA
(
	id int IDENTITY(1,1) UNIQUE NOT NULL,
	nombre varchar(30) UNIQUE NOT NULL,
	calificacion FLOAT NOT NULL,
	activo bit DEFAULT 1,
	CONSTRAINT Banda_pk PRIMARY KEY (id)
);

CREATE TABLE ARTISTA
(
	id int IDENTITY(1,1) UNIQUE NOT NULL,
	nombre varchar(80) NOT NULL,
	bandaID int NOT NULL,
	CONSTRAINT Banda_artista_fkey FOREIGN KEY (bandaID)
		REFERENCES BANDA (id),
	CONSTRAINT artista_pkey PRIMARY KEY (id)
);

CREATE TABLE CANCION
(
	id int IDENTITY(1,1) UNIQUE NOT NULL,
	nombre varchar(30) NOT NULL,
	bandaID int NOT NULL,
	CONSTRAINT Banda_Cancion_fkey FOREIGN KEY (bandaID)
		REFERENCES BANDA (id),
	CONSTRAINT Cancion_pk PRIMARY KEY (id)
);

CREATE TABLE COMENTARIO
(
	id int IDENTITY(1,1) UNIQUE NOT NULL,
	fanID int NOT NULL,
	descripcion varchar(300) NOT NULL,
	calificacion INT NOT NULL,
	CONSTRAINT FAN_COMENTARIO_fkey FOREIGN KEY (fanID)
		REFERENCES FAN_USUARIO (id),
	CONSTRAINT Comentario_pk PRIMARY KEY (id)
);

CREATE TABLE CATALOGO_BANDA
(
	bandaID int NOT NULL,
	catalogoID int NOT NULL,
	CONSTRAINT Catalogo_Banda_fkey FOREIGN KEY (catalogoID)
		REFERENCES CATALOGO (id),
	CONSTRAINT Banda_Catalogo_fkey FOREIGN KEY (bandaID)
		REFERENCES BANDA (id),
	CONSTRAINT CatalogoBanda_pkey PRIMARY KEY (catalogoID,bandaID)	
);

CREATE TABLE BANDA_COMENTARIO
(
	bandaID int NOT NULL,
	comentarioID int NOT NULL,
	CONSTRAINT comentario_Banda_fkey FOREIGN KEY (comentarioID)
		REFERENCES COMENTARIO (id),
	CONSTRAINT Banda_comentario_fkey FOREIGN KEY (bandaID)
		REFERENCES BANDA (id),
	CONSTRAINT BandaComentario_pkey PRIMARY KEY (comentarioID,bandaID)
);

CREATE TABLE CATEGORIA
(
	id int IDENTITY(1,1) UNIQUE NOT NULL,
	nombre varchar(15) UNIQUE NOT NULL,
	descripcion varchar(100) DEFAULT NULL,
	CONSTRAINT categoria_pk PRIMARY KEY (id),
);

CREATE TABLE CARTELERA 
(
	id int UNIQUE NOT NULL,
	nombre varchar(15) UNIQUE NOT NULL,
	pais varchar(30) NOT NULL,
	ubicacion varchar(100) NOT NULL,
	diaFinalVotaciones date NOT NULL,
	diaDeInicio date NOT NULL,
	diaFinal date NOT NULL,
	CONSTRAINT Cartelera_pk PRIMARY KEY (id)
);

CREATE TABLE HORARIO
(
	id int IDENTITY(1,1) UNIQUE NOT NULL,
	dia date NOT NULL,
	horaInicio varchar(10),
	horaFinal varchar(10),
	carteleraID int NOT NULL,
	CONSTRAINT Cartelera_horario_fkey FOREIGN KEY (carteleraID)
		REFERENCES CARTELERA (id),
	CONSTRAINT Horario_pk PRIMARY KEY (id)
);


CREATE TABLE CARTELERA_CATEGORIA_BANDA
(
	bandaID int NOT NULL,
	categoriaID int NOT NULL,
	carteleraID int NOT NULL,
	vote int DEFAULT 0,
	CONSTRAINT BCB1_fkey FOREIGN KEY (categoriaID)
		REFERENCES CATEGORIA (id),
	CONSTRAINT BCB2_fkey FOREIGN KEY (bandaID)
		REFERENCES BANDA (id),
	CONSTRAINT BCB3_fkey FOREIGN KEY (carteleraID)
		REFERENCES CARTELERA (id),
	CONSTRAINT BCB_pkey PRIMARY KEY (carteleraID,categoriaID,bandaID)
);

CREATE TABLE VOTO
(
	bandaID int NOT NULL,
	categoriaID int NOT NULL,
	carteleraID int NOT NULL,
	fanID int NOT NULL,
	vote int,
	CONSTRAINT V0_fkey FOREIGN KEY (fanID)
		REFERENCES FAN_USUARIO (id),
	CONSTRAINT V1_fkey FOREIGN KEY (categoriaID)
		REFERENCES CATEGORIA (id),
	CONSTRAINT V2_fkey FOREIGN KEY (bandaID)
		REFERENCES BANDA (id),
	CONSTRAINT V3_fkey FOREIGN KEY (carteleraID)
		REFERENCES CARTELERA (id),
	CONSTRAINT Voto_pkey PRIMARY KEY (carteleraID,categoriaID,bandaID, fanID)
);

CREATE TABLE FESTIVAL
(
	id int UNIQUE NOT NULL,
	nombre varchar(15) UNIQUE NOT NULL,
	pais varchar(30) NOT NULL,
	ubicacion varchar(100) NOT NULL,
	diaFinalVotaciones date NOT NULL,
	diaDeInicio date NOT NULL,
	diaFinal date NOT NULL,
	servicios varchar(300) NOT NULL,
	transporte varchar(300) NOT NULL,
	comida varchar(300) NOT NULL,
	bandaID int NOT NULL,
	CONSTRAINT BF2_fkey FOREIGN KEY (bandaID)
		REFERENCES BANDA (id),
	CONSTRAINT festival_pk PRIMARY KEY (id)
);

CREATE TABLE FESTIVAL_CATEGORIA_BANDA
(
	bandaID int NOT NULL,
	categoriaID int NOT NULL,
	festivalID int NOT NULL,
	CONSTRAINT BCF1_fkey FOREIGN KEY (categoriaID)
		REFERENCES CATEGORIA (id),
	CONSTRAINT BCF2_fkey FOREIGN KEY (bandaID)
		REFERENCES BANDA (id),
	CONSTRAINT BCF3_fkey FOREIGN KEY (festivalID)
		REFERENCES FESTIVAL (id),
	CONSTRAINT BCF_pkey PRIMARY KEY (festivalID,categoriaID,bandaID)
);