CREATE TABLE GENERAL_USER
(
  id varchar(10) UNIQUE NOT NULL,
  name varchar(30) NOT NULL,
  lastName varchar(30),
  password varchar(15) NOT NULL,
  username varchar(10) NOT NULL,
  inscriptionDate DATE,
  active bit,
  CONSTRAINT GU_pk PRIMARY KEY (id),  
  CONSTRAINT GU_username_key UNIQUE (username),
 );

CREATE TABLE ROL
(
  id varchar(10) UNIQUE NOT NULL,
  description varchar(30),
  CONSTRAINT R_pk PRIMARY KEY (id)
);

CREATE TABLE FAN_USER
(
  id varchar(10) UNIQUE NOT NULL,
  country varchar(30),
  location varchar(100) DEFAULT NULL,
  university varchar (30) DEFAULT NULL,
  cellPhone varchar(8) NOT NULL, 
  birthDate DATE NOT NULL,
  description varchar (300) DEFAULT NULL,
  photo varchar(100) DEFAULT NULL,
  email varchar(30),
  rolID varchar(10) NOT NULL,
  guID varchar(10) NOT NULL,
  CONSTRAINT FU_pk PRIMARY KEY (id),
  CONSTRAINT FU_email_key UNIQUE (email),
  CONSTRAINT FU_cell_phone_number_key UNIQUE (cellPhone),
  CONSTRAINT FU_rol_fkey FOREIGN KEY (rolID)
      REFERENCES ROL (id),
  CONSTRAINT FU_gu_fkey FOREIGN KEY (guID)
      REFERENCES GENERAL_USER (id)
);

CREATE TABLE PROMOTION_USER
(
  id varchar(10) UNIQUE NOT NULL,
  uniqueID varchar NOT NULL,
  rolID varchar(10) NOT NULL,
  generalUserID varchar(10) NOT NULL,
  CONSTRAINT PU_pk PRIMARY KEY (id),
  CONSTRAINT PU_rol_fkey FOREIGN KEY (rolID)
      REFERENCES ROL (id),
  CONSTRAINT PU_gu_fkey FOREIGN KEY (generalUserID)
      REFERENCES GENERAL_USER (id)
);

CREATE TABLE GENRE 
(
	id varchar(10) UNIQUE NOT NULL,
	name varchar(15) UNIQUE NOT NULL,	
	CONSTRAINT G_pk PRIMARY KEY (id),
);


CREATE TABLE FAN_GENRE
( 
	fanID varchar(10) NOT NULL,
	genreID varchar(10) NOT NULL,
	CONSTRAINT FAN_GENRE_fkey FOREIGN KEY (fanID)
		REFERENCES FAN_USER (id),
	CONSTRAINT GENRE_FAN_fkey FOREIGN KEY (genreID)
		REFERENCES GENRE (id),
	CONSTRAINT FG_pkey PRIMARY KEY (fanID,genreID)
);

CREATE TABLE CATALOG
(
	id varchar(10) UNIQUE NOT NULL,
	CONSTRAINT Catalog_pk PRIMARY KEY (id)
);


CREATE TABLE BAND
(
	id varchar(10) UNIQUE NOT NULL,
	name varchar(30) UNIQUE NOT NULL,
	calification INT NOT NULL,
	active bit DEFAULT 1,
	CONSTRAINT Band_pk PRIMARY KEY (id)
);

CREATE TABLE SONG
(
	id varchar(10) UNIQUE NOT NULL,
	name varchar(30) NOT NULL,
	CONSTRAINT Song_pk PRIMARY KEY (id)
);

CREATE TABLE COMMENT
(
	id varchar(10) UNIQUE NOT NULL,
	description varchar(300) NOT NULL,
	calification INT NOT NULL,
	CONSTRAINT Comment_pk PRIMARY KEY (id)
);

CREATE TABLE CATALOG_BAND
(
	bandID varchar(10) NOT NULL,
	catalogID varchar(10) NOT NULL,
	CONSTRAINT Catalog_Band_fkey FOREIGN KEY (catalogID)
		REFERENCES CATALOG (id),
	CONSTRAINT Band_Catalog_fkey FOREIGN KEY (bandID)
		REFERENCES BAND (id),
	CONSTRAINT CB_pkey PRIMARY KEY (catalogID,bandID)	
);

CREATE TABLE BAND_SONG
(
	bandID varchar(10) NOT NULL,
	songID varchar(10) NOT NULL,
	CONSTRAINT Song_Band_fkey FOREIGN KEY (songID)
		REFERENCES SONG (id),
	CONSTRAINT Band_Song_fkey FOREIGN KEY (bandID)
		REFERENCES BAND (id),
	CONSTRAINT BS_pkey PRIMARY KEY (songID,bandID)
);

CREATE TABLE BAND_COMMENT
(
	bandID varchar(10) NOT NULL,
	commentID varchar(10) NOT NULL,
	CONSTRAINT comment_Band_fkey FOREIGN KEY (commentID)
		REFERENCES COMMENT (id),
	CONSTRAINT Band_comment_fkey FOREIGN KEY (bandID)
		REFERENCES BAND (id),
	CONSTRAINT BC_pkey PRIMARY KEY (commentID,bandID)
);

CREATE TABLE CATEGORY 
(
	id varchar(10) UNIQUE NOT NULL,
	name varchar(15) UNIQUE NOT NULL,
	description varchar(100) DEFAULT NULL,
	CONSTRAINT category_pk PRIMARY KEY (id),
);

CREATE TABLE BILLBOARD 
(
	id varchar(10) UNIQUE NOT NULL,
	name varchar(15) UNIQUE NOT NULL,
	country varchar(30) NOT NULL,
	location varchar(100) NOT NULL,
	votationFinish date NOT NULL,
	initDay date NOT NULL,
	finishDay date NOT NULL,
	CONSTRAINT Billboard_pk PRIMARY KEY (id),
);

CREATE TABLE SCHEDULE
(
	id varchar(10) UNIQUE NOT NULL,
	dia date NOT NULL,
	tiempo time NOT NULL,
	CONSTRAINT Schedule_pk PRIMARY KEY (id)
);

CREATE TABLE BILLBOARD_CATEGORY
(
	categoryID varchar(10) NOT NULL,
	billboardID varchar(10) NOT NULL,
	CONSTRAINT BC1_fkey FOREIGN KEY (categoryID)
		REFERENCES CATEGORY (id),
	CONSTRAINT BC2_fkey FOREIGN KEY (billboardID)
		REFERENCES BILLBOARD (id),
	CONSTRAINT BCategory_pkey PRIMARY KEY (billboardID,categoryID)
);

CREATE TABLE BILLBOARD_CATEGORY_BAND
(
	bandID varchar(10) NOT NULL,
	categoryID varchar(10) NOT NULL,
	billboardID varchar(10) NOT NULL,
	CONSTRAINT BCB1_fkey FOREIGN KEY (categoryID)
		REFERENCES CATEGORY (id),
	CONSTRAINT BCB2_fkey FOREIGN KEY (bandID)
		REFERENCES BAND (id),
	CONSTRAINT BCB3_fkey FOREIGN KEY (billboardID)
		REFERENCES BILLBOARD (id),
	CONSTRAINT BCB_pkey PRIMARY KEY (billboardID,categoryID,bandID)
);



CREATE TABLE BILLBOARD_SCHEDULE
(
	scheduleID varchar(10) NOT NULL,
	billboardID varchar(10) NOT NULL,
	CONSTRAINT BS1_fkey FOREIGN KEY (scheduleID)
		REFERENCES SCHEDULE (id),
	CONSTRAINT BS2_fkey FOREIGN KEY (billboardID)
		REFERENCES BILLBOARD (id),
	CONSTRAINT BSchedule_pkey PRIMARY KEY (billboardID,scheduleID)
);






