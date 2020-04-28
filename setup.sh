echo "Creating tables."
mysql --force -u root -p pet_salon < PET_SALON_CREATE.sql
echo "Running python."
python main.py
echo "Running node part 1."
node index.js
echo "Running species_insert.sql pet_insert.sql store_product_insert.sql product_species_insert.sql"
cat species_insert.sql pet_insert.sql store_product_insert.sql product_species_insert.sql | mysql --force -u root -p pet_salon
echo "Running node part 2."
node part2.js 