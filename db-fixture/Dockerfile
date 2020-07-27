FROM mongo:4.2.8

COPY ./fixtures/*.json /
CMD mongo starwars --host db --eval "db.dropDatabase();" \
    && mongoimport --host db --db starwars --collection character --type json --file /characters.json --jsonArray \
    && mongoimport --host db --db starwars --collection planet --type json --file /planets.json --jsonArray \
    && mongoimport --host db --db starwars --collection species --type json --file /species.json --jsonArray \
    && mongoimport --host db --db starwars --collection starship --type json --file /starships.json --jsonArray \
    && mongoimport --host db --db starwars --collection vehicle --type json --file /vehicles.json --jsonArray