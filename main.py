import pandas as pd
import numpy as np

def generate_pet(names, breeds):
    name = np.random.choice(names) 
    name = name if name[0] != '*' else name[1:]
    breed = breeds[np.random.choice(len(breeds))]
    return [name, breed[0], breed[1]]

pet_data = pd.read_csv('datasets/petdata.csv').set_index('Animal ID')

names = list(pet_data['Pet name'])
breeds = list(zip(pet_data['Animal Type'], pet_data['Breed']))

with open('pet_insert.sql', 'w') as file:
    for x in range(1000):
        file.write('INSERT INTO PET (Owner_id, Name, Breed, Species) VALUES ({0}, {1}, {2}, {3});\n'.format(123, *generate_pet(names, breeds)))
