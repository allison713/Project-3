d3.csv("https://raw.githubusercontent.com/Alejandro-Delacruz/store-all-data-for-p3/main/world_data-1.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}


var trace1 = {
  type: "scatter",
  mode: "lines",
  name: 'AU',
  x: unpack(rows, 'Year_Posted'),
  y: unpack(rows, 'AU'),
  line: {color: '#17BECF'}
}

var trace2 = {
  type: "scatter",
  mode: "lines",
  name: 'CA',
  x: unpack(rows, 'Year_Posted'),
  y: unpack(rows, 'CA'),
  line: {color: '#7F7F7F'}
}

var trace3 = {
  type: "scatter",
  mode: "lines",
  name: 'DE',
  x: unpack(rows, 'Year_Posted'),
  y: unpack(rows, 'DE'),
  line: {color: '#F9D949'}
}

var trace4 = {
  type: "scatter",
  mode: "lines",
  name: 'GB',
  x: unpack(rows, 'Year_Posted'),
  y: unpack(rows, 'GB'),
  line: {color: '#05BFDB'}
}

var trace5 = {
  type: "scatter",
  mode: "lines",
  name: 'US',
  x: unpack(rows, 'Year_Posted'),
  y: unpack(rows, 'US'),
  line: {color: '#FF6D60'}
}

var data = [trace1,trace2,trace3,trace4,trace5];

var layout = {
  title: 'Number of UFO Obeservations Accorss the World',
  autosize: true,
  height: 500,
  margin: {
    l: 250,
    r: 250,
    b: 100,
    pad: 40
  },

};

Plotly.newPlot('linePlot', data, layout);
})
