DROP DATABASE PET_SALON;
CREATE DATABASE PET_SALON;

USE PET_SALON;

DROP TABLE IF EXISTS CLIENT;
CREATE TABLE CLIENT(
	Client_ID	INT NOT NULL auto_increment,
    Fname		VARCHAR(255) NOT NULL,
    MInit		VARCHAR(1) NOT NULL,
    Lname		VARCHAR(255) NOT NULL,
    Phone_number	VARCHAR(10) NOT NULL UNIQUE,
    Email		VARCHAR(255) NOT NULL UNIQUE,
    Address		VARCHAR(255),
    Birthday	DATE,
    CONSTRAINT pk_client PRIMARY KEY (Client_ID)
);

DROP TABLE IF EXISTS STORE_PRODUCTS;
CREATE TABLE STORE_PRODUCTS(
	Product_ID INT NOT NULL auto_increment,
    Quantity INT NOT NULL,
    Brand VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Price FLOAT(2),
    CONSTRAINT pk_storeproducts PRIMARY KEY (Product_ID)
);
    
DROP TABLE IF EXISTS SPECIES;
CREATE TABLE SPECIES(
    Name VARCHAR(255) NOT NULL,
    CONSTRAINT pk_species PRIMARY KEY (Name)
);
    
DROP TABLE IF EXISTS PRODUCT_SPECIES;
CREATE TABLE PRODUCT_SPECIES(
	Store_Product INT NOT NULL,
    Species VARCHAR(255) NOT NULL,
    CONSTRAINT fk_productspecies_storeproducts FOREIGN KEY (Store_Product) references STORE_PRODUCTS(Product_ID), 
	CONSTRAINT fk_productspecies_species FOREIGN KEY (Species) references SPECIES (Name) 
);

DROP TABLE IF EXISTS PET;
CREATE TABLE PET(
	Owner_ID		INT NOT NULL,
    Name		VARCHAR(255) NOT NULL,
    Breed		VARCHAR(255) NOT NULL,
    Species		VARCHAR(255),
    CONSTRAINT pk_pet PRIMARY KEY (Owner_ID, Name),
    CONSTRAINT fk_pet_client FOREIGN KEY (Owner_ID) references CLIENT(Client_ID) 
);

DROP TABLE IF EXISTS EMPLOYEE;
CREATE TABLE EMPLOYEE(
    Employee_ID  INT NOT NULL auto_increment,
    SSN         VARCHAR(255) NOT NULL UNIQUE,
    Name        VARCHAR(255) NOT NULL,
    Phone_number    VARCHAR(10) NOT NULL UNIQUE,
    Email       VARCHAR(255) NOT NULL UNIQUE,
    Hourly_wage DECIMAL(4,2),
    Salary		DECIMAL(7,2),
    CONSTRAINT pk_employee PRIMARY KEY (Employee_ID)
);

DROP TABLE IF EXISTS MANAGER;
CREATE TABLE MANAGER(
	Manager_ID	INT NOT NULL,
    CONSTRAINT pk_manager PRIMARY KEY (Manager_ID),
    CONSTRAINT fk_manager_employee FOREIGN KEY (Manager_ID) references EMPLOYEE (Employee_ID)
);

DROP TABLE IF EXISTS GROOMER;
CREATE TABLE GROOMER(
	Groomer_ID	INT NOT NULL,
    CONSTRAINT pk_groomer PRIMARY KEY (Groomer_ID),
    CONSTRAINT fk_groomer_employee FOREIGN KEY (Groomer_ID) references EMPLOYEE (Employee_ID)
);

DROP TABLE IF EXISTS RECEPTIONIST;
CREATE TABLE RECEPTIONIST(
	Receptionist_ID	INT NOT NULL,
    CONSTRAINT pk_receptionist PRIMARY KEY (Receptionist_ID),
    CONSTRAINT fk_receptionist_employee FOREIGN KEY (Receptionist_ID) references EMPLOYEE (Employee_ID)
);

DROP TABLE IF EXISTS SHIFT;
CREATE TABLE SHIFT(
    Shift_ID int not null PRIMARY KEY auto_increment,
    shift_type VARCHAR(2) not null,
    date datetime not null,
    supervisor int not null,
    receptionist int not null,
    CONSTRAINT fk_shift_supervisor FOREIGN KEY (supervisor)
        REFERENCES MANAGER(Manager_ID),
    CONSTRAINT fk_shift_receptionist FOREIGN KEY (receptionist)
        REFERENCES RECEPTIONIST(Receptionist_ID)
);

DROP TABLE IF EXISTS GROOMER_SHIFTS;
CREATE TABLE GROOMER_SHIFT(
    groomer_id int not null,
    shift_id int not null,
    CONSTRAINT pk_groomer_shift_id PRIMARY KEY (groomer_id, shift_id),
    CONSTRAINT fk_groomer_shift_groomer FOREIGN KEY (groomer_id) 
        REFERENCES GROOMER(Groomer_ID),
    CONSTRAINT fk_groomer_shift_shift FOREIGN KEY (shift_id) 
        REFERENCES SHIFT(Shift_ID)
);

DROP TABLE IF EXISTS APPOINTMENT;
create table APPOINTMENT(
	appointment_id int not null primary key auto_increment,
    duration time not null,
    start_time timestamp not null,
    groomer_id int not null,
    owner_id int not null,
    pet_name varchar(255) not null,
    constraint fk_appointment_groomer foreign key (groomer_id)
		references GROOMER(Groomer_ID),
	constraint fk_appointment_owner_pet foreign key (owner_id, pet_name)
		references PET(Owner_Id, Name)
);
