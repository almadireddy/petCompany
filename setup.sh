mysql --force -u root -p pet_salon < PET_SALON_CREATE.sql
node index.js
python main.py
cat species_insert.sql  pet_insert.sql store_product_insert.sql product_species_insert.sql appointments_insert.sql | mysql --force -u root -p pet_salon 
