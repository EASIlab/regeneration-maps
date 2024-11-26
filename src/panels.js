/*This module contains the main part for creating the panels. 
* 
* Still in the main script is the function that manages the clicking event
*/

exports.createPanel = function(env){
  
  // this is the single big main panel
  var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {  
      position : 'bottom-left',
      width: '25%'
    }
  });
  var firstLine = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'), 
    style: {
      padding: '0px 0px 0px 0px',
      margin: '4px 4px 8px 4px'
    }
  });
  
    // first line
  firstLine.add(ui.Label(
      'Species to query : ', 
      {
        fontSize: '12px',
        textAlign: 'left',
        width: '40%'  
      }));
  firstLine.add(ui.Label(
      'Regeneration [count / ha]', 
      {
        fontSize: '12px',
        textAlign: 'left',
        width: '60%'  
      }));
  

  // queryBlock is the big main block above consisting of 2 columns
  // holding the query selector on the left and the query result section on the right
  var queryBlock = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal')
  });
  
  env.querySelection = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      margin: '4px 4px 16px 4px', 
      width: '40%'
          }
    });
  buildQuerySelection(env, true);
  
  queryBlock.add(env.querySelection);
  
  // the value panel is needed as an extra variable for the map's onClick function to 
  // reference
  env.valuePanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'), 
    style: {
      margin: '4px 4px 16px 4px', 
      stretch: 'horizontal'
    }  
  });
  env.valuePanel.add(ui.Label("Click on map to show values"), 
  { position: "center-left"});

  queryBlock.add(env.valuePanel);
  
  
  var layerBlock = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var selectPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'), 
    style : {
            width: '40%'
          }
  });
  var selectMessage = ui.Label({
    value : "Show Layer"
  });
  var select = ui.Select({
          // the Selector shows the layer name strings
          items : Object.keys(env.layer_idx), 
            // starting value
          value : "Fagus sylvatica",
          // key is given to the function by the ui.Select object, in case of a
          // layer selection event
          onChange : function(key){
              if (env.old_layer === key) return; 
              if (key === "Cultivation Risk"){
                  create_legend(env, "risk");
              }
              if (env.old_layer === "Cultivation Risk"){
                  create_legend(env, "reg");
              }
              // old_layer is the global variabe holding the layer currently shown
              env.map.layers().get(env.layer_idx[env.old_layer]).setShown(false);
              env.map.layers().get(env.layer_idx[key]).setShown(true);
              env.old_layer = key; 
              }
          });
  selectPanel.add(selectMessage);
  selectPanel.add(select);
  layerBlock.add(selectPanel);
  // create the legend on the env object, so that you can switch 
  // to cultivation risk style in case one selects that map
  env.legend = ui.Panel({
    style : {
              stretch : 'horizontal'
          }
    });
  create_legend(env, "reg");
  layerBlock.add(env.legend);
  
  // assemble the big block
  panel.add(firstLine);
  panel.add(queryBlock);
  panel.add(layerBlock);
  
  // the copyright info below
  panel.add(ui.Label({
    value: "©L. Gass & L. Hülsmann (2024); in prep. \n https://www.easi.uni-bayreuth.de/en/",
    style : {
      whiteSpace : 'pre'
    }
  }))
  return panel;
}


function buildQuerySelection(env, outerChecked){
  
  env.querySelection.clear();

  // checking function know env.data_to_query 
  var checkingFunction =  function(checked, box){
      env.data_to_query[box.getLabel()] = checked; 
      };
      
  for (var lay in env.data_to_query){
    env.querySelection.add(
      ui.Checkbox(lay, outerChecked, checkingFunction, false, 
      {
        fontSize: '12px',
        textAlign: 'left',
        padding: '0px 0px 0px 0px',
        margin: '0px 0px 0px 0px'
      }));
    }
  // a select/deselect all
  // assumes index of self is 23 (24th elemnt in the list)
  env.querySelection.add(
    ui.Checkbox("all", outerChecked, 
      function(checked, box){
          for (var species in env.data_to_query){
            env.data_to_query[species] = checked;
          }
          buildQuerySelection(env, checked);
              }, 
      false, 
      {
        fontSize: '12px',
        textAlign: 'left',
        padding: '0px 0px 0px 0px',
        margin: '0px 0px 0px 0px'
      }));
}


// function to create the legend as ui.Label element
// kind either "reg" then for regeneration maps or "risk" then for risk
function create_legend(env, kind){
  env.legend.clear();
  // recreate a simple version of  the color ramp used manually for the legend
  var sunset = ["#FFEC9DFF", "#F2AF4AFF", "#EB7F54FF", "#C36377FF", "#61599DFF", "#1D457FFF", "#191F40FF", "black"];
  var risk = ["#E5E5E5FF", "#FCFD8FFF","#F3CE65FF","#EB9F3CFF","#9A3F07FF"];
  var palette; 
  var minLabel;
  var midLabel; 
  var maxLabel;
  var textLabel;
  
  if (kind === "reg") {
    palette = sunset; 
    minLabel = "0";
    midLabel = "75";
    maxLabel = "15000";
    textLabel = "Regeneration [count / ha]"
  } else {
    palette = risk;
    minLabel = "0";
    midLabel = "50";
    maxLabel = "100"
    textLabel = "Cultivation Risk [%]"
  };
  
  // Creates a color bar thumbnail image for use in legend from the given
  // color palette.
  function makeColorBarParams(palette) {
            return {
            // Bounding box for color bar.
                bbox: [0, 0, 1, 0.1],
                // Dimensions of color bar.
                dimensions: '100x10',
                // Format of color bar.
                format: 'png',
                // Min value for color bar.
                min: 0,
                // Max value for color bar.
                max: 1,
                // Color palette for color bar.
                palette: palette
            };
        }
    // Create the color bar for the legend.
  var colorBar = ui.Thumbnail({
    // Image to use for color bar.
    image: ee.Image.pixelLonLat().select(0),
    // Parameters for color bar.
    params: makeColorBarParams(palette),
    style: {
      // Stretch color bar horizontally.
      stretch: 'horizontal',
      // No margin for color bar.
      margin: '0px 0px',
      // Max height of color bar.
      maxHeight: '10%',
      // Width of color bar.
      width: '100%'
      },
      });

    
   // Create a panel with three numbers for the legend.
   var legendLabels = ui.Panel({
      widgets: [
        ui.Label(minLabel, {
                    margin: '0px 0px'
          }),
          ui.Label(midLabel, {
            margin: '0px 0px',
            textAlign: 'center',
            stretch: 'horizontal'
            }),
          ui.Label(maxLabel, {
            margin: '0px 0px'
            }),
         ],
        layout: ui.Panel.Layout.flow('horizontal')
      });
      
  // Add label to legend.
  env.legend.add(
      ui.Label({
        value: textLabel,
        style: {
          fontSize: '14px',
          textAlign: 'left',
          padding: '0px 0px 4px 0px',
          margin: '8px 0px'
          },
        })
    );

  
  // Add colorbar to legend.
  env.legend.add(colorBar);

  // Add labels to legend.
  env.legend.add(legendLabels);
}

// last line