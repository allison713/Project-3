// json url
const url = "http://127.0.0.1:5000/api/v1.0/ufo_sighting_data"

// initialize function to pull ID numbers
function main() {
    var dropDown = d3.select("#selectedDataset");
    // retrieve JSON data
    d3.json(url).then(function (data) {
        var sampleNames = d3.group(data, d=> d.date);
        sampleNames.forEach((sample) => {
            dropDown.append("option").text(sample.date.substring(0,4)).property("value", sample.date.substring(0,4))
        });
        // var initSample = sampleNames[0];
        // demographicInfo(initSample);
        // charts(initSample);
    });
};

//--------------------------------------------------------------
// Building a demographic metadata 
//--------------------------------------------------------------//
// function demographicInfo(sample) {
//     var demo = d3.select("#sample-metadata");
//     d3.json(url).then(function (data) {
//         var metaData = data.matedata;
//         var metaDataSample = metaData.filter(row => row.id == sample);
//         demo.selectAll("p").remove();
//         metaDataSample.forEach((row) => {
//             for (const [key, value] of Object.entries(row)) {
//                 demo.append("p").text(`${key.charAt(0).toUpperCase()+key.slice(1)}:   ${value}`);
//             };
//         });
//     });
// };


//---------------------------------------------------
//Building Chartes
//---------------------------------------------------//
// function charts(sample) {
//     d3.json(url).then(function (data) {
//         // variables for charts
//         var samplesComplete = data.sample;
//         var sampleInfo = samplesComplete.filter(row => row.id == sample);
//         var sampleValues = sampleInfo[0].count;
//         var otuIds = sampleInfo[0].state_name;

//         var sampleshape = data.shape_sample;
//         var sampleInfo2 = sampleshape.filter(row => row.id == sample);
//         var sampleValues2 = sampleInfo2[0].count;
//         var otuIds2 = sampleInfo2[0].state_name;

//         //----------------------------------------------
//         // Building a bar chart
//         //----------------------------------------------//
//         var bardata = {
//             y: sampleValues,
//             x: otuIds,
//             type: "bar",
//             orientation: "v",
//         };
//         var data = [bardata];
//         // var barlayout = { height: 400, margin: { t: 5, b: 0 }};
//         var bartitle={title:"Number of UFO Observations by State"};
//         Plotly.newPlot("bar", data,bartitle)

//         var bardata = {
//             x: sampleValues2,
//             y: otuIds2,
//             type: "bar",
//             orientation: "h",
//         };
//         var data = [bardata];
//         // var barlayout = { height: 400, margin: { t: 5, b: 0 }};
//         var bartitle={title:"Number of UFO Observations by Shape"};
//         Plotly.newPlot("bar2", data,bartitle)



//         //---------------------------------------------------------
//         // Building  a bubble chart
//         //----------------------------------------------------------//

//         var firsttrace = {
//             x: otuIds2,
//             y: sampleValues2,
//             mode: "markers",
//             marker: {
//                 size: sampleValues2,
//                 color: otuIds2,
//                 colorscale: "Earth"
//             },
//             text: otuIds2
//         };
//         var bubdata = [firsttrace];
//         var bublayout = {title: "Number of obeservations per shape",
//         xaxis: {title:"OTU ID"},
//             showlegend: false
//         };

//         Plotly.newPlot("bubble", bubdata, bublayout);

//     });
// };


// function optionChanged(sample) {
//     demographicInfo(sample);
//     charts(sample);
// };

// call main function to run
main();