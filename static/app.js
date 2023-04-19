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
    init();
    });
