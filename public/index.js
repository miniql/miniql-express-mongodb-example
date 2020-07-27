
const query = {
    get: {
        planets: { // Gets all planets.
            from: "planet",
            resolve: {
                species: { // With nested species lookup.
                }
            }
        }
    }
}

// Load data from the backend using a REST API.
fetch("/query", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
    })
    .then(response => {
        // Log the response so we can see it in the browser console.
        console.log("Retreived response:");
        console.log(response);

        // Extract JSON data from the response body.
        return response.json();
    })
    .then(queryResult => {
        // Render the message from the response in the browser window.
        console.log("Parsed query result:");
        console.log(queryResult);

        const resultsElement = document.getElementById("query-result");

        // Loop through all entities and add the text to the DOM.
        const planets = queryResult.data.planets;
        for (const planet of planets) {
            const planetNameElement = document.createTextNode(planet.name);
            const planetItemElement = document.createElement("li");
            planetItemElement.appendChild(planetNameElement);
            resultsElement.appendChild(planetItemElement);

            const speciesListElement = document.createElement("ul");

            for (const species of planet.species) {
                const speciesNameElement = document.createTextNode(species.name);
                const speciesItemElement = document.createElement("li");
                speciesItemElement.appendChild(speciesNameElement);
                speciesListElement.appendChild(speciesItemElement);
            }

            planetItemElement.appendChild(speciesListElement);
        }
    });
