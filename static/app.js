// json url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// initialize function to pull ID numbers
function main() {
    var dropDown = d3.select("#selectedDataset");
    // retrieve JSON data
    d3.json(url).then(function (data) {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            dropDown.append("option").text(sample).property("value", sample)
        });
        var initSample = sampleNames[0];
        demographicInfo(initSample);
        charts(initSample);
    });
};

//--------------------------------------------------------------
// Building a demographic metadata 
//--------------------------------------------------------------//
function demographicInfo(sample) {
    var demo = d3.select("#sample-metadata");
    d3.json(url).then(function (data) {
        var metaData = data.metadata;
        var metaDataSample = metaData.filter(row => row.id == sample);
        demo.selectAll("p").remove();
        metaDataSample.forEach((row) => {
            for (const [key, value] of Object.entries(row)) {
                demo.append("p").text(`${key.charAt(0).toUpperCase()+key.slice(1)}:   ${value}`);
            };
        });
    });
};


//---------------------------------------------------
//Building Chartes
//---------------------------------------------------//
function charts(sample) {
    d3.json(url).then(function (data) {
        // variables for charts
        var samplesComplete = data.samples;
        var sampleInfo = samplesComplete.filter(row => row.id == sample);
        var sampleValues = sampleInfo[0].sample_values;
        var sampleValuesSlice = sampleValues.slice(0,10).reverse();
        var otuIds = sampleInfo[0].otu_ids;
        var otuIdsSlice = otuIds.slice(0,10).reverse();
        var otuLabels = sampleInfo[0].otu_labels;
        var otuLabelsSlice = otuLabels.slice(0,10).reverse();
        var metaData = data.metadata;
        var metaDataSample = metaData.filter(row => row.id == sample);
        var wash = metaDataSample[0].wfreq;

        //----------------------------------------------
        // Building a bar chart
        //----------------------------------------------//
        var bardata = {
            x: sampleValuesSlice,
            y: otuIdsSlice.map(item => `OTU ${item}`),
            type: "bar",
            orientation: "h",
            text: otuLabelsSlice,
        };
        var data = [bardata];
        // var barlayout = { height: 400, margin: { t: 5, b: 0 }};
        var bartitle={title:"Top 10 OTUs"};
        Plotly.newPlot("bar", data,bartitle)

        //---------------------------------------------------------
        // Building  a bubble chart
        //----------------------------------------------------------//
        var firsttrace = {
            x: otuIds,
            y: sampleValues,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIds,
                colorscale: "Earth"
            },
            text: otuIds
        };
        var bubdata = [firsttrace];
        var bublayout = {title: "Bacteria Cultures Per Sample",
        xaxis: {title:"OTU ID"},
            showlegend: false
        };

        Plotly.newPlot("bubble", bubdata, bublayout);

        //---------------------------------------------------------------
        // BUilding a Belly Button
        //---------------------------------------------------------------//
        var datagauge = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: wash,
              title: {text: "Belly Button Washing Frequency <br> Scrubs per Week" },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 9] },
                bar: { color: "red" },
                steps: [
                { range: [1, 2], color: "#DDFFBB" },
                { range: [2, 3], color: "#C7E9B0" },
                { range: [3, 4], color: "#B3C99C" },
                { range: [4, 5], color: "#A4BC92" },
                { range: [5, 6], color: "#57C5B6" },
                { range: [6, 7], color: "#159895" },
                { range: [7, 8], color: "#1A5F7A" },
                { range: [8, 9], color: "#002B5B" }
                ],
                threshold: {
                  line: { color: "black", width: 4 },
                  thickness: 0.75,
                  value: wash
                }
              }
            }
          ];
          
          var layout2 = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', datagauge, layout2);
    });
};


function optionChanged(sample) {
    demographicInfo(sample);
    charts(sample);
};

// call main function to run
main();