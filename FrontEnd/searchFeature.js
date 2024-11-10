// Initialize the map and set view to specific coordinates (MUB)
//const map = L.map('map').setView([43.13444, -70.93083], 15); // Coordinates of MUB

// Add the tile layer (OpenStreetMap tiles)
/*const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);*/

// Marker information
const locations = [
    {
        name: "Memorial Union Building (MUB)",
        latLng: [43.13444, -70.93083],
        desc: "Core facilities at UNH including the UNH Bookstore, Campus Services, Games Room, and more.",
        link: "https://www.unh.edu/mub/"
    },
    {
        name: "Thompson Hall",
        latLng: [43.13601, -70.93238],
        desc: "Home to the College of Liberal Arts at UNH.",
        link: "https://cola.unh.edu/"
    },
    {
        name: "Dimond Library",
        latLng: [43.13544923700985, -70.93326597669162],
        desc: "The Diamond Library is the main library on campus and houses collections supporting the humanities, social sciences, business, health sciences, human services, education, and earth sciences. It is also home to the federal and state depository publication collections, multimedia, Special Collections, University Archives, and the University Museum. Students enjoy using the library's quiet rooms and comfortable seating to study.",
        link: "https://library.unh.edu/locations/dimond-library"
    },
    {
        name: "Hamel Recreation Center",
        latLng: [43.13877, -70.93335],
        desc: "The Hamel Recreation Center is a state-of-the-art fitness and recreation facility at the University of New Hampshire. It offers a wide range of fitness equipment, group exercise classes, indoor courts, and recreational spaces. It is a popular hub for students looking to stay active and engaged with various sports and fitness programs.",
        link: "https://campusrec.unh.edu/facilities/hamel-recreation-center"
    },
    {
        name: "Kingsbury Hall",
        latLng: [43.13417908742887, -70.93435063027898],
        desc: "Kingsbury Hall provides students the environment they need to learn to become the next generation of scientists, engineers, and mathematicians. The laboratories have the appropriate infrastructure, with high-bay areas and heating, air conditioning, and ventilation throughout. All departments in Kingsbury have computer clusters and student project spaces.",
        link: "https://ceps.unh.edu/facility/kingsbury-hall"
    },
    {
        name: "Ecenter",
        latLng: [43.13628730878516, -70.92640880283004],
        desc: "The Peter T. Paul Entrepreneurship Center delivers a unique, hands-on, experiential programming that inspires, nurtures, and mentors students from any major, at every step in the process, anywhere from idea development to company creation.",
        link: "https://www.unh.edu/ecenter/"
    },
    {
        name: "University of New Hampshire InterOperability Laboratory",
        latLng: [43.136152709507066, -70.92662000573046],
        desc: "The UNH InterOperability Laboratory tests networking and data communications products. Since 1988, the laboratory has fostered multi-vendor interoperability while preparing students for careers in the industry.",
        link: "https://innovation.unh.edu/unh-interoperability-lab"
    },
    {
        name: "Whittemore Center Arena",
        latLng: [43.139646398728345, -70.9345250208699],
        desc: "The Whittemore Center is a multi-purpose arena. It is home to the UNH Wildcats Hockey. Other events that happen in the Whitt include career fairs, open skate, and concerts.",
        link: "https://campusrec.unh.edu/facilities/whittemore-center-arena"
    },
    {
        name: "Paul College",
        latLng: [43.136656798875336, -70.92926288466798],
        desc: "The Peter T. Paul College of Business and Economics provides state-of-the-art facilities, including classrooms, lecture halls, computer labs, and collaboration spaces.",
        link: "https://paulcollege.unh.edu"
    }
    // Add more locations as needed...
];

// Initialize markers array
const markers = [];

// Add markers to the map
locations.forEach(location => {
    const marker = L.marker(location.latLng).addTo(map);
    marker.bindPopup(`<b>${location.name}</b><br>${location.desc}<br><a href="${location.link}" target="_blank">Learn more</a>`);
    markers.push({
        marker,
        name: location.name.toLowerCase(),  // Store the name in lowercase for case-insensitive search
        desc: location.desc.toLowerCase()   // Store the description in lowercase for case-insensitive search
    });
});

// Filter markers based on search input
document.getElementById('search-bar').addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase(); // Get the search term (case-insensitive)

    markers.forEach(({ marker, name, desc }) => {
        // Check if either the name or the description includes the search term
        if (name.includes(searchTerm) || desc.includes(searchTerm)) {
            if (!map.hasLayer(marker)) {
                marker.addTo(map(marker)); // Show marker if it is not already added to the map
            }
        } else {
            if (map.hasLayer(marker)) {
                map.removeLayer(marker); // Hide marker if it is already on the map
            }
        }
    });
});
