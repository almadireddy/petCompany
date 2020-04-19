import pandas as pd
import numpy as np

def generate(names, breeds):
    name = np.random.choice(names) 
    name = name if name[0] != '*' else name[1:]
    breed = breeds[np.random.choice(len(breeds))]
    return [name, breed[0], breed[1]]

data = pd.read_csv('datasets/petdata.csv').set_index('Animal ID')

names = list(data['Pet name'])
breeds = list(zip(data['Animal Type'], data['Breed']))

with open('test.sql', 'w') as file:
    for x in range(1000):
        file.write('INSERT INTO PET (Name, Breed, Species) VALUES ({0}, {1}, {2});\n'.format(*generate(names, breeds)))
