CREATE DATABASE PET_SALON;

USE PET_SALON;

DROP TABLE IF EXISTS CLIENT;
CREATE TABLE CLIENT(
	ClientID	INT NOT NULL,
    Fname		VARCHAR(255) NOT NULL,
    MInit		VARCHAR(1) NOT NULL,
    Lname		VARCHAR(255) NOT NULL,
    Phone_number	VARCHAR(10) NOT NULL UNIQUE,
    Email		VARCHAR(255) NOT NULL UNIQUE,
    Address		VARCHAR(255),
    Birthday	DATE,
    CONSTRAINT pk_client PRIMARY KEY (ClientID)
);

DROP TABLE IF EXISTS STORE_PRODUCTS;
CREATE TABLE STORE_PRODUCTS(
	ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    Brand VARCHAR(255) NOT NULL,
    Price FLOAT(2),
    CONSTRAINT pk_storeproducts PRIMARY KEY (ProductID, quantity)
);
    
DROP TABLE IF EXISTS SPECIES;
CREATE TABLE SPECIES(
    Name VARCHAR(255) NOT NULL,
    CONSTRAINT pk_species PRIMARY KEY (Name)
);
    
DROP TABLE IF EXISTS PRODUCT_SPECIES;
CREATE TABLE PRODUCT_SPECIES(
	StoreProduct INT NOT NULL,
    Species VARCHAR(255) NOT NULL,
    CONSTRAINT fk_productspecies_storeproducts FOREIGN KEY (StoreProduct) references STORE_PRODUCTS(ProductID), 
	CONSTRAINT fk_productspecies_species FOREIGN KEY (Species) references SPECIES (Name) 
);

DROP TABLE IF EXISTS PET;
CREATE TABLE PET(
	OwnerID		INT NOT NULL,
    Name		VARCHAR(255) NOT NULL,
    Breed		VARCHAR(255) NOT NULL,
    Species		VARCHAR(255),
    CONSTRAINT pk_pet PRIMARY KEY (OwnerID, Name),
    CONSTRAINT fk_pet_client FOREIGN KEY (OwnerID) references CLIENT(ClientID) 
);

DROP TABLE IF EXISTS EMPLOYEE;
CREATE TABLE EMPLOYEE(
    EmployeeID  INT NOT NULL,
    SSN         VARCHAR(255) NOT NULL UNIQUE,
    Name        VARCHAR(255) NOT NULL,
    Phone_number    VARCHAR(10) NOT NULL UNIQUE,
    Email       VARCHAR(255) NOT NULL UNIQUE,
    Hourly_wage DECIMAL(4,2),
    Salary		DECIMAL(7,2),
    CONSTRAINT pk_employee PRIMARY KEY (EmployeeID)
);

DROP TABLE IF EXISTS MANAGER;
CREATE TABLE MANAGER(
	ManagerID	INT NOT NULL,
    CONSTRAINT pk_manager PRIMARY KEY (ManagerID),
    CONSTRAINT fk_manager_employee FOREIGN KEY (ManagerID) references EMPLOYEE (EmployeeID)
);

DROP TABLE IF EXISTS GROOMER;
CREATE TABLE GROOMER(
	GroomerID	INT NOT NULL,
    CONSTRAINT pk_groomer PRIMARY KEY (GroomerID),
    CONSTRAINT fk_groomer_employee FOREIGN KEY (GroomerID) references EMPLOYEE (EmployeeID)
);

DROP TABLE IF EXISTS RECEPTIONIST;
CREATE TABLE RECEPTIONIST(
	ReceptionistID	INT NOT NULL,
    CONSTRAINT pk_receptionist PRIMARY KEY (ReceptionistID),
    CONSTRAINT fk_receptionist_employee FOREIGN KEY (ReceptionistID) references EMPLOYEE (EmployeeID)
);

DROP TABLE IF EXISTS SHIFT;
CREATE TABLE SHIFT(
    ShiftID int not null PRIMARY KEY,
    shift_type VARCHAR(2) not null,
    date datetime not null,
    supervisor int not null,
    receptionist int not null,
    CONSTRAINT fk_shift_supervisor FOREIGN KEY (supervisor)
        REFERENCES MANAGER(ManagerID),
    CONSTRAINT fk_shift_receptionist FOREIGN KEY (receptionist)
        REFERENCES RECEPTIONIST(ReceptionistID)
);

DROP TABLE IF EXISTS GROOMER_SHIFTS;
CREATE TABLE GROOMER_SHIFT(
    groomer_id int not null,
    shift_id int not null,
    CONSTRAINT pk_groomer_shift_id PRIMARY KEY (groomer_id, shift_id),
    CONSTRAINT fk_groomer_shift_groomer FOREIGN KEY (groomer_id) 
        REFERENCES GROOMER(GroomerID),
    CONSTRAINT fk_groomer_shift_shift FOREIGN KEY (shift_id) 
        REFERENCES SHIFT(ShiftID)
);

DROP TABLE IF EXISTS APPOINTMENT;
create table APPOINTMENT(
	appointment_id int not null primary key,
    duration time not null,
    start_time timestamp not null,
    groomer_id int not null,
    owner_id int not null,
    pet_name varchar(255) not null,
    constraint fk_appointment_groomer foreign key (groomer_id)
		references GROOMER(GroomerID),
	constraint fk_appointment_owner_pet foreign key (owner_id, pet_name)
		references PET(OwnerId, Name)
);
