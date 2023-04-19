// json url
const url = "http://127.0.0.1:5000/api/v1.0/ufo_sighting_data"


d3.json(url).then(function (data) {

    function init() {
        var year = "1949"
        var filtered = data.filter(row => row.date.substring(0,4) == year);
        var states = [];

        for (let i=0; i<data.length; i++) {
            var state = data[i].state;
            if (states.includes(state) === false) {
                states.push(state);
            }
        }

        let xChoice = states.map(x => x);

        let stateCounts = [];

        states.forEach(state => {
            count = filtered.filter(row => row.state == state).length;
            stateCounts.push(count);}
        );

        let trace = {
            x: xChoice,
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
            }],
            y: stateCounts,
            type: "bar",
            orientation: "v"
        };

        let traceData = [trace];

        let layout = {
            title: `UFO sightings per state in year 1949`,
            autosize: false,
            width: 1100,
            height: 450
          }

        Plotly.newPlot("bar", traceData, layout);
        
        //Add map to page 
        //NOTE CHOROPLETH IS NOT WORKING YET, BUT THE MAP IS THERE.
        let myMap = L.map("chart-container", {
            center: [39, -98],
            zoom: 4
          });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);

        // Load the GeoJSON data.
        let geoData = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/ACS-ED_2014-2018_Economic_Characteristics_FL.geojson";

        let geojson;

        d3.json(geoData).then(function(data) {
        // Create a new choropleth layer.
            geojson = L.choropleth(data, {

                // Define which property in the features to use.
                valueProperty: "DP03_16E",

                // Set the color scale.
                scale: ["#ffffb2", "#b10026"],

                // The number of breaks in the step range
                steps: 10,

                // q for quartile, e for equidistant, k for k-means
                mode: "q",
                style: {
                    // Border color
                    color: "#fff",
                    weight: 1,
                    fillOpacity: 0.8}}).addTo(myMap);
                });
            };
    //add each year to the dropdown.
    var dropDown = d3.select("#selDataset");
    var years = [];

        for (let i=0; i<data.length; i++) {
            var year = data[i].date.substring(0,4);
            if (years.includes(year) === false) {
                years.push(year);
            }
        }

        years.forEach((year) => {
            dropDown.append("option").text(year).property("value", year);
            });

    //Trigger to update the graph
    d3.selectAll("#selDataset").on("change", function() {
        updatePlotly();
    });

    //Function to change graph when dropdown is selected
    function updatePlotly() {
        // Use D3 to select the drop down menu
        let dropdownMenu = d3.select("#selDataset");

        // Assign the value of the dropdown menu option to a variable
        let name = dropdownMenu.property("value");

        var year = `${name}`
        var filtered = data.filter(row => row.date.substring(0,4) == year);
        var states = [];
        
        for (let i=0; i<data.length; i++) {
            var state = data[i].state;
            if (states.includes(state) === false) {
                states.push(state);
            }
        }

        let xChoice = states.map(x => x);

        //Can't get the states to sort by Alpha!!//
        xChoice.sort(function (a,b) {
            return b-a;
        });

        let stateCounts = [];

        states.forEach(state => {
            count = filtered.filter(row => row.state == state).length;
            stateCounts.push(count);}
        );

            //update the bar chart
            updateBar = {
                x: xChoice,
                transforms: [{
                    type: 'sort',
                    target: 'y',
                    order: 'descending'
                }],
                y: stateCounts,
                type: "bar",
                orientation: "v"
              };

            let trace = [updateBar];
            let layout = {
                title: `UFO sightings per state in the year ${year}`,
                autosize: false,
                width: 1100,
                height: 450
              }

            //new graph
            Plotly.newPlot("bar", trace, layout);
        };

    function updateMap() {
        let myMap = L.map("map", {
            center: [45.52, -122.67],
            zoom: 13
          });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);
    }
    init();
    });
