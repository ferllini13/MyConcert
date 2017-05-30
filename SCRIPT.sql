CREATE TABLE USUARIO_GENERAL
(
  id varchar(10) UNIQUE NOT NULL,
  nombre varchar(30) NOT NULL,
  apellido varchar(30),
  contraseña varchar(15) NOT NULL,
  nombreUsuario varchar(10) NOT NULL,
  diaInscripcion DATE,
  activo bit,
  CONSTRAINT GU_pk PRIMARY KEY (id),  
  CONSTRAINT GU_nombreUsuario_key UNIQUE (nombreUsuario),
 );

CREATE TABLE ROL
(
  id varchar(10) UNIQUE NOT NULL,
  descripcion varchar(30),
  CONSTRAINT R_pk PRIMARY KEY (id)
);

CREATE TABLE FAN_USUARIO
(
  id varchar(10) UNIQUE NOT NULL,
  pais varchar(30),
  ubicacion varchar(100) DEFAULT NULL,
  universidad varchar (30) DEFAULT NULL,
  celular varchar(8) NOT NULL, 
  fechaNacimiento DATE NOT NULL,
  descripcion varchar (300) DEFAULT NULL,
  foto varchar(100) DEFAULT NULL,
  email varchar(30),
  rolID varchar(10) NOT NULL,
  guID varchar(10) NOT NULL,
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
  id varchar(10) UNIQUE NOT NULL,
  uniqueID varchar NOT NULL,
  rolID varchar(10) NOT NULL,
  guID varchar(10) NOT NULL,
  CONSTRAINT PU_pk PRIMARY KEY (id),
  CONSTRAINT PU_rol_fkey FOREIGN KEY (rolID)
      REFERENCES ROL (id),
  CONSTRAINT PU_gu_fkey FOREIGN KEY (guID)
      REFERENCES USUARIO_GENERAL (id)
);

CREATE TABLE GENERO 
(
	id varchar(10) UNIQUE NOT NULL,
	nombre varchar(15) UNIQUE NOT NULL,	
	CONSTRAINT G_pk PRIMARY KEY (id),
);


CREATE TABLE FAN_GENERO
( 
	fanID varchar(10) NOT NULL,
	generoID varchar(10) NOT NULL,
	CONSTRAINT FAN_GENERO_fkey FOREIGN KEY (fanID)
		REFERENCES FAN_USUARIO (id),
	CONSTRAINT GENERO_FAN_fkey FOREIGN KEY (generoID)
		REFERENCES GENERO (id),
	CONSTRAINT FG_pkey PRIMARY KEY (fanID,generoID)
);

CREATE TABLE CATALOGO
(
	id varchar(10) UNIQUE NOT NULL,
	CONSTRAINT Catalog_pk PRIMARY KEY (id)
);


CREATE TABLE BANDA
(
	id varchar(10) UNIQUE NOT NULL,
	nombre varchar(30) UNIQUE NOT NULL,
	calificacion FLOAT NOT NULL,
	activo bit DEFAULT 1,
	CONSTRAINT Banda_pk PRIMARY KEY (id)
);

CREATE TABLE CANCION
(
	id varchar(10) UNIQUE NOT NULL,
	nombre varchar(30) NOT NULL,
	CONSTRAINT Cancion_pk PRIMARY KEY (id)
);

CREATE TABLE COMENTARIO
(
	id varchar(10) UNIQUE NOT NULL,
	fanID varchar(10) NOT NULL,
	descripcion varchar(300) NOT NULL,
	calificacion INT NOT NULL,
	CONSTRAINT FAN_COMENTARIO_fkey FOREIGN KEY (fanID)
		REFERENCES FAN_USUARIO (id),
	CONSTRAINT Comentario_pk PRIMARY KEY (id)
);

CREATE TABLE CATALOGO_BANDA
(
	bandaID varchar(10) NOT NULL,
	catalogoID varchar(10) NOT NULL,
	CONSTRAINT Catalogo_Banda_fkey FOREIGN KEY (catalogoID)
		REFERENCES CATALOGO (id),
	CONSTRAINT Banda_Catalogo_fkey FOREIGN KEY (bandaID)
		REFERENCES BANDA (id),
	CONSTRAINT CatalogoBanda_pkey PRIMARY KEY (catalogoID,bandaID)	
);

CREATE TABLE BANDA_CANCION
(
	bandaID varchar(10) NOT NULL,
	cancionID varchar(10) NOT NULL,
	CONSTRAINT Cancion_Banda_fkey FOREIGN KEY (cancionID)
		REFERENCES CANCION (id),
	CONSTRAINT Banda_Cancion_fkey FOREIGN KEY (bandaID)
		REFERENCES BANDA (id),
	CONSTRAINT BandaCancion_pkey PRIMARY KEY (cancionID,bandaID)
);

CREATE TABLE BANDA_COMENTARIO
(
	bandaID varchar(10) NOT NULL,
	comentarioID varchar(10) NOT NULL,
	CONSTRAINT comentario_Banda_fkey FOREIGN KEY (comentarioID)
		REFERENCES COMENTARIO (id),
	CONSTRAINT Banda_comentario_fkey FOREIGN KEY (bandaID)
		REFERENCES BANDA (id),
	CONSTRAINT BandaComentario_pkey PRIMARY KEY (comentarioID,bandaID)
);

CREATE TABLE CATEGORIA
(
	id varchar(10) UNIQUE NOT NULL,
	nombre varchar(15) UNIQUE NOT NULL,
	descripcion varchar(100) DEFAULT NULL,
	CONSTRAINT categoria_pk PRIMARY KEY (id),
);

CREATE TABLE CARTELERA 
(
	id varchar(10) UNIQUE NOT NULL,
	nombre varchar(15) UNIQUE NOT NULL,
	pais varchar(30) NOT NULL,
	ubicacion varchar(100) NOT NULL,
	diaFinalVotaciones date NOT NULL,
	diaDeInicio date NOT NULL,
	diaFinal date NOT NULL,
	CONSTRAINT Cartelera_pk PRIMARY KEY (id),
);

CREATE TABLE HORARIO
(
	id varchar(10) UNIQUE NOT NULL,
	dia date NOT NULL,
	tiempo time NOT NULL,
	CONSTRAINT Horario_pk PRIMARY KEY (id)
);

CREATE TABLE CARTELERA_CATEGORIA
(
	categoriaID varchar(10) NOT NULL,
	carteleraID varchar(10) NOT NULL,
	CONSTRAINT Categoria_Cartelera_fkey FOREIGN KEY (categoriaID)
		REFERENCES CATEGORIA (id),
	CONSTRAINT Cartelera_Categora_fkey FOREIGN KEY (carteleraID)
		REFERENCES CARTELERA (id),
	CONSTRAINT CarteleraCategoria_pkey PRIMARY KEY (carteleraID,categoriaID)
);

CREATE TABLE CARTELERA_CATEGORIA_BANDA
(
	bandaID varchar(10) NOT NULL,
	categoriaID varchar(10) NOT NULL,
	carteleraID varchar(10) NOT NULL,
	vote int DEFAULT 0,
	CONSTRAINT BCB1_fkey FOREIGN KEY (categoriaID)
		REFERENCES CATEGORIA (id),
	CONSTRAINT BCB2_fkey FOREIGN KEY (bandaID)
		REFERENCES BANDA (id),
	CONSTRAINT BCB3_fkey FOREIGN KEY (carteleraID)
		REFERENCES CARTELERA (id),
	CONSTRAINT BCB_pkey PRIMARY KEY (carteleraID,categoriaID,bandaID)
);



CREATE TABLE CARTELERA_HORARIO
(
	horarioID varchar(10) NOT NULL,
	carteleraID varchar(10) NOT NULL,
	CONSTRAINT BS1_fkey FOREIGN KEY (horarioID)
		REFERENCES HORARIO (id),
	CONSTRAINT BS2_fkey FOREIGN KEY (carteleraID)
		REFERENCES CARTELERA (id),
	CONSTRAINT BSchedule_pkey PRIMARY KEY (carteleraID,horarioID)
);