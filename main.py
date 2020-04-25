import pandas as pd
import numpy as np
import datetime
import random

def generate_pet(owners, names, breeds, species):
    owner = np.random.choice(owners)
    name = np.random.choice(names) 
    name = name if name[0] != '*' else name[1:]
    if 'ROUND' in name or 'MAX' in name:
        name = 'BOB'
    breed = breeds[np.random.choice(len(breeds))]
    if breed[0] == 'OTHER':
        species.add(breed[1])
        return [int(owner), name, breed[1], breed[1]]
    return [int(owner), name, breed[1], breed[0]]

def generate_product(brands):
    brand = np.random.choice(brands)
    quantity = np.random.randint(1, 20)
    price = float(np.random.randint(99, 10000))/100
    return [quantity, brand, price]

def generate_appointment(durations, owners, names):
    duration = (datetime.datetime(2001, 1, 1, 0, 0, 0) + \
    datetime.timedelta(minutes=int(np.random.choice(durations)))).time()
    starttime = datetime.time(
        np.random.randint(1, 24),
        np.random.randint(1, 60),
        np.random.randint(1, 60)
    )
    date = datetime.date(
        np.random.randint(2019, 2021),
        np.random.randint(1, 13),
        np.random.randint(1, 29)
    )
    groomerid = np.random.randint(6, 63) # groomer id values hardcoded bc im lazy
    ownerid = np.random.choice(owners)
    name = np.random.choice(names) 
    name = name if name[0] != '*' else name[1:]
    if 'ROUND' in name or 'MAX' in name:
        name = 'BOB'
    return [str(duration), '{0} {1}'.format(date, starttime), groomerid, int(ownerid), name]

def generate_product_species(species):
    id = np.random.randint(1, 101)
    species = random.choice(tuple(species))
    #species = species[np.random.choice(len(species))][0]
    return [id, species]

pet_data = pd.read_csv('datasets/petdata.csv').set_index('Animal ID')

names = list(pet_data['Pet name'])
breeds = list(zip(pet_data['Animal Type'], pet_data['Breed']))
owners = np.floor(np.linspace(1, 801, 1000))
appointmentids = np.arange(1, 401)
durations = [30, 60, 90, 120]

brands = ['AdVet', 'Alcott', 'Alpha Tech Pet',
            'Aquapaw', 'BarkLogic', 'Bissell', 
            'CannaLove', 'Cool Pup', 'Crazy Dog', 
            'Dermapaw', 'Epi-Pet', 'Four Paws', 
            'FurHaven', 'K&H', 'Grooming Tools',
            'NaturPet', 'Pet Gear', 'Purrdy Paws', 
            'TruDog', 'Wags & Wiggles', 'Zymox']

species = set(['DOG', 'CAT'])

with open('pet_insert.sql', 'w') as file:
    for x in range(1000):
        file.write('INSERT INTO PET (Owner_id, Name, Breed, Species) \
        \nVALUES ({0}, \'{1}\', \'{2}\', \'{3}\');\n'.format(*generate_pet(owners, names, breeds, species)))

with open('store_product_insert.sql', 'w') as file:
    for x in range(100):
        file.write('INSERT INTO STOREPRODUCTS (Quantity, Brand, Price) \
            \nVALUES ({0}, \'{1}\', {2});\n'.format(*generate_product(brands)))

with open('appointments_insert.sql', 'w') as file:
    for x in range(400):
        file.write('INSERT INTO APPOINTMENT (duration, start_time, groomer_id, owner_id, pet_name) \
            \nVALUES (\'{0}\', \'{1}\', {2}, {3}, \'{4}\');\n'.format(*generate_appointment(durations, owners, names)))

with open('product_species_insert.sql', 'w') as file:
    for x in range(500):
        file.write('INSERT INTO PRODUCT_SPECIES (StoreProduct, Species) \
            \nVALUES ({0}, \'{1}\');\n'.format(*generate_product_species(species)))

with open('species_insert.sql', 'w') as file:
    for x in species:
        file.write('INSERT INTO SPECIES (name) \
            \nVALUES (\'{0}\');\n'.format(x))
    
