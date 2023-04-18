//Project 3 UFOs
//Option menu for the displays in the site

/**********script in html or css?********

<canvas id="myChart" style="width:100%;max-width:700px"></canvas>

this id has to be unique!!!!!

**********************************/


//const url ="http://127.0.0.1:5000/Ufo_Relatives";
const URL ="Ufo_Relatives";

// useEffect(() => {
//     fetch("http://127.0.0.1:5000/Ufo_Relatives").then ((response)=>
//     response.json().then((data) =>console.log(data)))
// ); 

//https://www.youtube.com/watch?v=eezJDYRdoKM Flask jsonify: Send JSON data  by Maker Club 2022
function init() {
    d3.json(URL).then(data =>  {
        console.log(data)   
        let relations = data.names;           
        });
};


init();