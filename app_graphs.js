//PRjoect 3 UFOs
//Option menu for the displays in the site

// Comments in the reports
//(Remember to reference the html to the files we will use )

//1. Create a bar chart to display reports by year.
// Greek god names
comments = data.map(function (row){
    return row.comments
  });
  
  for (var i=0; i < relatives.length; i++) {
    obj[array[i]] = (obj[array[i]] || 0) +1 ;
  }


  // Trace for the Greek Data
  let trace1 = {
      x: relatives,
      y: data.map(row => row.greekSearchResults),
      type: "bar"
    };
  
  // Data trace array
  let traceData = [trace1];
  
  // Apply the group barmode to the layout
  let layout = {
    title: "Greek gods search results"
  };
  
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", traceData, layout);
// Insert the graph
    let trace1 = [{
        x: xArray,
        y: yArray,
        type: "bar",
        orientation:"h",
        text:hoverLabels    
    }];                 
    let layout = {
        title: { 
            display: true,
            text: "10 most common bacteria in the Subject (OTU)",
            size: 9
        },
        autosize: true,
        xaxis: {autorange: true},
        yaxis: {autorange: true} 
    };
  
   Plotly.newPlot("bar",  trace1, layout);
};


//3. Create a bubble chart of the ocurrences for relatives.
function bubble(id, data) {
    let  = data.samples;
    let subjectFauna = fauna.filter(row => row.id == id)[0];
    console.log(subjectFauna);
    
    xArray = [];
    yArray = [];
    hoverLabels = [];

    let sampleLength = d3.selectAll(subjectFauna.otu_ids).size();
    console.log(sampleLength)
    for (el = 0; el < 80 ; el++) {
        xArray.push(subjectFauna.otu_ids[el]);
        yArray.push(subjectFauna.sample_values[el]);
        hoverLabels.push(subjectFauna.otu_labels[el]);
    }
// Insert the graph
    let name = `Subject ${id} : OTUs population`; 
    
    let trace2 = [{
        x: xArray,
        y: yArray,
        type: "scatter",
        mode: 'markers',
        marker: {
            color: xArray,
            size: yArray
        },
        text: hoverLabels  
    }];                 
    
    let layout = {
        title: { 
            display: true,
            text: name,
            size: 9
        },
        xaxis: {autorange: true},
        yaxis: {autorange: true},
        margin: {b: 30, l: 20, r: 20, t: 30}
    };
 
   Plotly.newPlot("bubble",  trace2, layout);
}


//4. Display the sample metadata, i.e., an individual's demographic information.
//Populate the panel with demographics 
function demographics(id, data) {
    let metadata = data.metadata;
    let subjectMetadata = metadata.filter(row => row.id == id)[0];
    //console.log(subjectMetadata)
    let panel = d3.select("#sample-metadata");
    panel.html("")
    let list =panel.append("ul");
    Object.entries(subjectMetadata).forEach(([key,value]) => { 
        panel.append("h5").text(key + ": " + value);
        });       
};

