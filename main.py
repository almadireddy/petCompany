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

def generate_product(brands, names):
    brand = np.random.choice(brands)
    quantity = np.random.randint(1, 20)
    name = np.random.choice(names)
    price = float(np.random.randint(99, 10000))/100
    return [quantity, brand, name, price]

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

brands = [
    'AdVet', 'Alcott', 'Alpha Tech Pet',
    'Aquapaw', 'BarkLogic', 'Bissell', 
    'CannaLove', 'Cool Pup', 'Crazy Dog', 
    'Dermapaw', 'Epi-Pet', 'Four Paws', 
    'FurHaven', 'K&H', 'Grooming Tools',
    'NaturPet', 'Pet Gear', 'Purrdy Paws', 
    'TruDog', 'Wags & Wiggles', 'Zymox'
]

products = [
    'Comb', 'Deshedding Tool', 'Slicker Brush',
    'Rake', 'Pin Brush', 'Bristle Brush',
    'Blade', 'Glove', 'Curry Brush', 'Self-Groomer',
    'Supplement', 'Medication', 'Shampoo'
]

species = set(['DOG', 'CAT'])
namesids = []

with open('pet_insert.sql', 'w') as file:
    for x in range(1000):
        pet = generate_pet(owners, names, breeds, species)
        if tuple([pet[0], pet[1]]) in namesids:
            continue
        namesids.append(tuple([pet[0], pet[1]]))
        file.write('INSERT INTO PET (owner_id, Name, Breed, Species) \
        \nVALUES ({0}, \'{1}\', \'{2}\', \'{3}\');\n'.format(*pet))

with open('store_product_insert.sql', 'w') as file:
    for x in range(100):
        file.write('INSERT INTO STORE_PRODUCTS (Quantity, Brand, Name, Price) \
            \nVALUES ({0}, \'{1}\', \'{2}\', {3});\n'.format(*generate_product(brands, products)))

with open('product_species_insert.sql', 'w') as file:
    for x in range(500):
        file.write('INSERT INTO PRODUCT_SPECIES (Store_Product, Species) \
            \nVALUES ({0}, \'{1}\');\n'.format(*generate_product_species(species)))

with open('species_insert.sql', 'w') as file:
    for x in species:
        file.write('INSERT INTO SPECIES (name) \
            \nVALUES (\'{0}\');\n'.format(x))
    
