// json url
const url = "http://127.0.0.1:5000/api/v1.0/ufo_sighting_data"

d3.json(url).then(function (data) {
    var dropDown = d3.select("#selDataset");
    var dropDown2 = d3.select("#selDataset-2");
    
    var years = ['1906', '1910', '1916', '1920', '1925', '1929', '1930', '1931', '1933', '1934', '1936', '1937', '1939', '1941', '1942', 
    '1943', '1944', '1945', '1946', '1947', '1948', '1949', '1950', '1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959', 
    '1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', 
    '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', 
    '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', 
    '2011', '2012', '2013'];

    var ufoShapes = ['cylinder', 'light', 'circle', 'sphere', 'disk', 'fireball', 'other', 'oval', 'cigar', 'rectangle', 'chevron', 'triangle', 
    'formation', 'not specified', 'delta', 'changing', 'egg', 'diamond', 'flash', 'teardrop', 'cone', 'cross', 'pyramid', 'crescent', 'flare', 
    'hexagon', 'dome', 'changed'];
        // for (let i=0; i<data.length; i++) {
        //     var year = data[i].date.substring(0,4);
        //     if (years.includes(year) === false) {
        //         years.push(year);
        //     }
        // }

        years.forEach((year) => {
            dropDown.append("option").text(year).property("value", year);
            });

        ufoShapes.forEach((shape) => {
            dropDown2.append("option").text(shape).property("value", shape);
            });

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
        // Trace for bar chart
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

        // Trace for line chart reports over time per shape
        var filteredShape = data.filter(row => row.shape == "cylinder");
        var shapes = [];

        //Create a list of all shapes
        for (let i=0; i<data.length; i++) {
            var shape = data[i].shape;
            if (shapes.includes(shape) === false) {
                shapes.push(shape);
            }
        };

        console.log(shapes)

        //Count all occurences of shapes
        let shapeCounts = [];

        years.forEach(year => {
            count1 = filteredShape.filter(row => row.date.substring(0,4) == year).length;
            shapeCounts.push(count1);}
        );

        var trace1 = {
            x: years,
            y: shapeCounts,
            type: 'lines'
          };

        let traceData1 = [trace1];

        let layout1 = {
            title: `UFO sightings of the shape Cylinder`,
            autosize: false,
            width: 900,
            height: 450
          }

        Plotly.newPlot("chart-container", traceData1, layout1);
        
    //     // Load the GeoJSON data.
    //     let geoData = "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json";

    //     let geojson;

    //     d3.json(geoData).then(function(data) {
    //     // Create a new choropleth layer.
    //         geojson = L.choropleth(data, {

    //             // Define which property in the features to use.
    //             valueProperty: "density",

    //             // Set the color scale.
    //             scale: ["#ffffb2", "#b10026"],

    //             // The number of breaks in the step range
    //             steps: 10,

    //             // q for quartile, e for equidistant, k for k-means
    //             mode: "q",
    //             style: {
    //                 // Border color
    //                 color: "#fff",
    //                 weight: 1,
    //                 fillOpacity: 0.8}
    //         }).addTo(myMap);
    //     });
    // };
    //add each year to the dropdown.


    //Trigger to update the graph
    d3.selectAll("#selDataset").on("change", function() {
        updateBar();
    });

    d3.selectAll("#selDataset-2").on("change", function() {
        updateLine();
    });

    //Function to change graph when dropdown is selected
    function updateBar() {
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
            traceBar = {
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

            let trace = [traceBar];
            let layout = {
                title: `UFO sightings per state in the year ${year}`,
                autosize: false,
                width: 1100,
                height: 450
              }

            //new graph
            Plotly.newPlot("bar", trace, layout);
        };

    function updateLine() {
        // Use D3 to select the drop down menu
        let dropdownMenu = d3.select("#selDataset-2");

        // Assign the value of the dropdown menu option to a variable
        let shapeSelect = dropdownMenu.property("value");

        var filteredShape = data.filter(row => row.shape == shapeSelect);

        let shapeCounts = [];

        years.forEach(year => {
            count1 = filteredShape.filter(row => row.date.substring(0,4) == year).length;
            shapeCounts.push(count1);}
        );

            //update the bar chart
            trace1 = {
                x: years,
                y: shapeCounts,
                type: "lines"
                };

            let traceData1 = [trace1];
            let layout1 = {
                title: `UFO sightings of the shape ${shapeSelect}`,
                autosize: false,
                width: 900,
                height: 450
                }

            //new graph
            Plotly.newPlot("chart-container", traceData1, layout1);
        };
    }
    init();
    shapes();
    });

// json url
const urlShape = "http://127.0.0.1:5000/api/v1.0/ufo_shapes"

// Function to graph shapes
function shapes() {
     // retrieve JSON data
    d3.json(urlShape).then(function (data) {
           //Fetch keys and values
            let figures=Object.keys(data);
            let observations=Object.values(data);
            
            // console.log(figures);   
            // console.log(observations);
                                  
            let dataPie=[{
                title: "SHAPES OBSERVED DURING THE YEARS",
                values: observations,
                labels: figures,
                hoverinfo:'label+percent',
                type: 'pie',
                textposition:'inside'
                
              }];
              
              var layout = {
                height: 400,
                width: 500,
                margin: {"t": 0, "b": 0, "l": 0, "r": 0},
                showlegend: false
              };
              
              Plotly.newPlot('myDivi', dataPie, layout);
              
            })};
