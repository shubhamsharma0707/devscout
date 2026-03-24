# DevScout: Open-Source Project Explorer 

##  Project Purpose
DevScout is a web application designed to help developers find, filter, and sort open-source GitHub repositories. The goal of this project is to create a clean, responsive user interface that dynamically handles real-time data fetched from a public API, strictly using Vanilla JavaScript without any external frameworks.

##  API Integration
This application uses the public **GitHub Search REST API** to fetch repository data.
* **Endpoint Used:** `https://api.github.com/search/repositories?q=language:javascript&sort=stars`
* **Why this API:** The GitHub API provides complex, deeply nested JSON data (including statistics like star counts, fork counts, and open issues). This makes it the perfect data source to demonstrate advanced JavaScript array manipulations.

##  Planned Features (Milestone 2 & 3)
* **API Fetching:** Using the native `fetch` API to asynchronously request data and handle loading states.
* **Search (`.filter`):** Users can search for specific repositories by typing keywords.
* **Filtering (`.filter`):** Users can filter the dashboard to only show repositories written in specific languages or those with active open issues.
* **Sorting (`.sort`):** Users can sort the displayed repositories in descending or ascending order based on the number of stars.
* **Dynamic Rendering (`.map`):** Iterating over the fetched data array to dynamically generate the HTML structure for the repository cards.

##  Technologies Used
* **HTML5:** Semantic structuring.
* **CSS3:** Custom styling, Flexbox, and CSS Grid for a responsive layout.
* **Vanilla JavaScript (ES6+):** DOM manipulation, asynchronous `fetch`, and functional array methods (map, filter, sort).

##  Setup and Local Installation
To run this project locally on your machine, follow these steps:

1. Clone this repository to your local machine:
   `git clone https://github.com/shubhamsharma0707/devscout.git`
2. Navigate into the project directory:
   `cd devscout`
3. Open the `index.html` file in your preferred web browser.