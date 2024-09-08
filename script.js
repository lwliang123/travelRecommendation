document.addEventListener("DOMContentLoaded", () => {
    // Fetch travel recommendations from the JSON file
    let recommendations = {};

    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            recommendations = data; // Store the fetched data
            console.log(recommendations); // Log data to verify if it's fetched correctly
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });

    // Search button click event
    document.getElementById("searchButton").addEventListener("click", () => {
        const searchQuery = document.getElementById("searchInput").value.trim().toLowerCase();
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = ""; // Clear any previous results

        let matchingResults = [];

        // Search for "beaches"
        if (searchQuery.includes("beach") || searchQuery.includes("beaches")) {
            matchingResults = recommendations.beaches; // Fetch beach recommendations
        }

        // Search for "temples"
        else if (searchQuery.includes("temple") || searchQuery.includes("temples")) {
            matchingResults = recommendations.temples; // Fetch temple recommendations
        }

        // Search for "countries"
        else if (searchQuery.includes("country") || searchQuery.includes("countries")) {
            recommendations.countries.forEach(country => {
                matchingResults = matchingResults.concat(country.cities); // Fetch all cities under each country
            });
        }

        // Display the matching results
        if (matchingResults.length > 0) {
            matchingResults.forEach(result => {
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('recommendation');

                const nameElement = document.createElement('h2');
                nameElement.textContent = result.name;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = result.description;

                const imageElement = document.createElement('img');
                imageElement.src = result.imageUrl;
                imageElement.alt = result.name;

                resultDiv.appendChild(nameElement);
                resultDiv.appendChild(descriptionElement);
                resultDiv.appendChild(imageElement);

                resultsDiv.appendChild(resultDiv);
            });
        } else {
            // If no matches found
            resultsDiv.innerHTML = "<p>No recommendations found for your search.</p>";
        }
    });

    // Reset button functionality
    document.getElementById("resetButton").addEventListener("click", () => {
        document.getElementById("searchInput").value = "";
        document.getElementById("results").innerHTML = ""; // Clear search results
    });

    // Clear button functionality
    document.getElementById("clearButton").addEventListener("click", () => {
        document.getElementById("searchInput").value = "";
        document.getElementById("results").innerHTML = ""; // Clear search results
    });
});