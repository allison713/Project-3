function map(year_selected){
    d3.csv("https://raw.githubusercontent.com/Arctansin/data/main/city_data.csv",function(data){

        function filterData(year) {
            var rows = data.filter(function(d) {
            return d.Year_Posted === year;
            });
            return rows;
        };

        var cityName = filterData(year_selected).map(function(d) { return d.city; }),   
            cityPop = filterData(year_selected).map(function(d) { return d.country; }),
            cityLat = filterData(year_selected).map(function(d) { return d.latitude; }),
            cityLon = filterData(year_selected).map(function(d) { return d.longitude; }),
            color = [,"rgb(255,65,54)","rgb(133,20,75)","rgb(255,133,27)","lightgrey"],
            citySize = [],
            hoverText = [],
            scale = 1;


        for ( var i = 0 ; i < cityPop.length; i++) {
            var currentSize = cityPop[i] / scale;
            var currentText = cityName[i] +" :"+  cityPop[i];
            citySize.push(currentSize);
            hoverText.push(currentText);
        }

        var data = [{
            type: 'scattergeo',
            locationmode: 'USA-states',
            lat: cityLat,
            lon: cityLon,
            hoverinfo: 'text',
            text: hoverText,
            marker: {
                size: citySize,
                line: {
                    color: 'black',
                    width: 2
                },
            }
        }];

        var layout = {
            title: 'Number of Obeservations Accross US City',
            showlegend: false,
            autosize: true,
            geo: {
                scope: 'usa',
                projection: {
                    type: 'albers usa'
                },
                showland: true,
                landcolor: 'rgb(217, 217, 217)',
                subunitwidth: 1,
                countrywidth: 1,
                subunitcolor: 'rgb(255,255,255)',
                countrycolor: 'rgb(255,255,255)'
            }
        };
        Plotly.newPlot("myDiv", data, layout, {showLink: false});
    });

};

map("2008")