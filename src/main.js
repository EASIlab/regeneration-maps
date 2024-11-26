/**
 * Script for showing the regeneration maps
 * holds layer adding and visibility logic
 * uses styles script for managing Map appearance
 * uses panels script for creating info boxes, legend, etc. 
 * 
 * resources get uploaded and registered in a seperate process outside the script
 * in the "Assets" tab on the left top.
 * the imports section above wraps them into an Image object and enables the script to
 * reference them by a variables name
*/

var style = require('users/easi/regeneration_maps:style.js');
var panels = require('users/easi/regeneration_maps:panels.js');

ui.root.clear()

// environment object holding all the variables and indices
var env = {}; 


// create the map object, giving the background color as RGB value
env.map = style.create_map('#ffffeb');
ui.root.add(env.map);

// choose the colour ramp
// blues, purp, blues2, lightGray, sunset
var sld = style.sunset;

// has index 0 can now be referenced by Map.layers().get(0)
env.map.addLayer(risk.sldStyle(style.risk), {}, 
                "Cultivation Risk", false);

// index 1
env.map.addLayer(abies_alba.sldStyle(sld), {}, 
            'Abies alba', false);
// index 2
env.map.addLayer(acer_campestre.sldStyle(sld), {}, 
            'Acer campestre', false);
            
// index 3
env.map.addLayer(acer_platanoides.sldStyle(sld), {}, 
            'Acer platanoides', false);


// index 4
env.map.addLayer(acer_pseudoplatanus.sldStyle(sld), {}, 
            'Acer pseudoplatanus', false);
            

// index 5
env.map.addLayer(alnus_glutinosa.sldStyle(sld), {}, 
            'Alnus glutinosa', false);

// index 6
env.map.addLayer(alnus_incana.sldStyle(sld), {}, 
            'Alnus incana', false);

// index 7
env.map.addLayer(carpinus_betulus.sldStyle(sld), {}, 
            'Carpinus betulus', false);

// index 8
env.map.addLayer(castanea_sativa.sldStyle(sld), {}, 
            'Castanea sativa', false);

// index 9
env.map.addLayer(fagus_sylvatica.sldStyle(sld), {}, 
            'Fagus sylvatica', true);

// index 10
env.map.addLayer(fraxinus_excelsior.sldStyle(sld), {}, 
            'Fraxinus exceelsior', false);

// index 11
env.map.addLayer(picea_abies.sldStyle(sld), {}, 
            'Picea abies', false);

// index 12
env.map.addLayer(pinus_strobus.sldStyle(sld), {}, 
            'Pinus strobus', false);

// index 13
env.map.addLayer(pinus_sylvestris.sldStyle(sld), {}, 
            'Pinus sylvestris', false);

// index 14
env.map.addLayer(populus_tremula.sldStyle(sld), {}, 
            'Populus tremula', false);

// index 15
env.map.addLayer(prunus_avium.sldStyle(sld), {}, 
            'Prunus avium', false);

// index 16
env.map.addLayer(prunus_serotina.sldStyle(sld), {}, 
            'Prunus serotina', false);

// index 17
env.map.addLayer(pseudotsuga_menziesii.sldStyle(sld), {}, 
            'Pseudotsuga menziesii', false);

// index 18
env.map.addLayer(quercus_rubra.sldStyle(sld), {}, 
            'Quercus rubra', false);

// index 19
env.map.addLayer(robinia_pseudoacacia.sldStyle(sld), {}, 
            'Robinia pseudoacacia', false);

// index 20
env.map.addLayer(salix.sldStyle(sld), {}, 
            'Salix', false);

// index 21
env.map.addLayer(sorbus_aria.sldStyle(sld), {}, 
            'Sorbus aria', false);


// index 22
env.map.addLayer(tilia.sldStyle(sld), {}, 
            'Tilia', false);

// index 23
env.map.addLayer(ulmus.sldStyle(sld), {}, 
            'Ulmus', false);


// the script and its functions use layer name strings to refer to layers. 
// so there is a poor man's registry set up, mapping 
// layer name string  ->  index in the Map's layers container 
// layer name string  ->  image object

// enable referencie indices by layer name string
env.layer_idx = {"Cultivation Risk": 0,
                 "Abies alba": 1, 
                 "Acer campestre": 2, 
                 "Acer platanoides": 3, 
                 "Acer pseudoplatanus": 4, 
                 "Alnus glutinosa": 5, 
                 "Alnus incana": 6, 
                 "Carpinus betulus": 7, 
                 "Castanea sativa": 8, 
                 "Fagus sylvatica": 9, 
                 "Fraxinus excelsior": 10, 
                 "Picea abies": 11, 
                 "Pinus strobus": 12, 
                 "Pinus sylvestris": 13, 
                 "Populus tremula": 14, 
                 "Prunus avium": 15, 
                 "Prunus serotina": 16, 
                 "Pseudotsuga menziesii": 17, 
                 "Quercus rubra": 18, 
                 "Robinia pseudacacia": 19, 
                 "Salix": 20, 
                 "Sorbus aria": 21, 
                 "Tilia": 22, 
                 "Ulmus": 23};
            
env.images = {   "Cultivation Risk": risk,
                 "Abies alba": abies_alba, 
                 "Acer campestre": acer_campestre, 
                 "Acer platanoides": acer_platanoides, 
                 "Acer pseudoplatanus": acer_pseudoplatanus, 
                 "Alnus glutinosa": alnus_glutinosa, 
                 "Alnus incana": alnus_incana, 
                 "Carpinus betulus": carpinus_betulus, 
                 "Castanea sativa": castanea_sativa, 
                 "Fagus sylvatica": fagus_sylvatica, 
                 "Fraxinus excelsior": fraxinus_excelsior, 
                 "Picea abies": picea_abies, 
                 "Pinus strobus": pinus_strobus, 
                 "Pinus sylvestris": pinus_sylvestris, 
                 "Populus tremula": populus_tremula, 
                 "Prunus avium": prunus_avium, 
                 "Prunus serotina": prunus_serotina, 
                 "Pseudotsuga menziesii": pseudotsuga_menziesii, 
                 "Quercus rubra": quercus_rubra, 
                 "Robinia pseudacacia": robinia_pseudoacacia, 
                 "Salix": salix, 
                 "Sorbus aria": sorbus_aria, 
                 "Tilia": tilia, 
                 "Ulmus": ulmus};
                
// there is also a Point object, that is used for querying the values on a map. 
// it also is a layer and has the highest index value
env.point_idx = Object.keys(env.layer_idx).length;
// global variable that holds the layer name string  of the layer shown
env.old_layer = "Fagus sylvatica"

// manage the images as a collection on the server
env.collection = ee.ImageCollection(Object.keys(env.images)
                                        .map(function(key){return env.images[key];}));


// pre setting maps  for which data should be queried
env.data_to_query = {};
for (var lays in env.images){
  env.data_to_query[lays] = true; 
}

// panel creation in the panels script
env.map.add(panels.createPanel(env));


/** manage info extraction when clicking
 * earth engine gets the coords of a click on a map and then gives it to a function
 * which specifies what to do in that event
 * expects an an env objecti in the environment with the following properties 
 * point_idx :        the index of the point object in the map's layer container 
 * images:            an Object mapping:  layer string -> image object
 * data_to_query:     an Object mapping:  layer string -> boolean control if layer should 
 *                    be queried
 * collection:        container on the server, holding references to the image objects
*/
env.map.onClick(function(coords){
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // create a point object for querying the collection 
  // and also showing it on the map
  var dot = ui.Map.Layer(point, {
        color: 'red'
     });
  env.map.layers().set(env.point_idx, dot);

  // getRegion queries the values for all images in the collection at the point
  var values =  env.collection.getRegion(point, 100)
                // get Region returns a list of sublists whose 5th element is the value
              .map(function(subList){return ee.List(subList).get(4);})
              .remove("b1").getInfo() // now js object
              .map(function(value) {
                  if (value === null || value === undefined){
                    return "No Data";
                  } else {
                    return value.toFixed(0);
                  }});
  
  // values now holds an array, the index corresponding to the order in the images registry, except for 
  // when we click outside of Bavaria, then the Cultivation Risk layer is empty and the method returns no
  // result only for this layer, we get 23 instead of 24 values 
  
  // we single out cultivation risk data, if present
  var cult_risk;
  if (values.length === 23){
    values.unshift("Seeing this implies a programming error");
    cult_risk = "No Data";
  } else { // length 24 implies there was cult_risk data
    cult_risk = values[0];
  }
  
  env.cultLine.clear();
  env.cultLine.add(ui.Label({
    value: "High Reg. Cultivation Risk [%]", 
    style: {
      whiteSpace: "pre", 
      stretch: 'horizontal', 
      margin: "0px 0px 0px 8px", 
      fontSize: "12px",
    }
  }));
  env.cultLine.add(ui.Label({
    value: cult_risk, 
    style: {
      whiteSpace: "pre", 
      margin: "0px 0px 0px 8px", 
      fontSize: "12px",
      textAlign: "right"
    }
  }));
  
  
  
  env.valuePanel.clear();
  
  // we use the values array to build up result string  and a label string
  var result = "";
  var counts = ""
  for (var species in env.images){
    if(env.data_to_query[species] && species !== "Cultivation Risk"){
      var idx = env.layer_idx[species];
      counts += ("       " + values[idx]).slice(-7) + '\n';
      result +=  species + ": " + '\n';
      
    }
  }
  var resultLabel = ui.Label({
    value: result, 
    style: {
      whiteSpace: "pre", 
      stretch: 'horizontal', 
      margin: "0px 0px 0px 8px", 
      fontSize: "12px",
    }
  });
  var countsLabel = ui.Label({
    value: counts, 
    style: {
      whiteSpace: "pre", 
      margin: "0px 0px 0px 8px", 
      fontSize: "12px",
      textAlign: "right"
    }
  });
  
  env.valuePanel.add(resultLabel);
  env.valuePanel.add(countsLabel);
});

// last line