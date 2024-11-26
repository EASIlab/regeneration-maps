/**
 * This file exports 
 * 
 * • create_map(): a function that returns an ee.Map object having the preferred style
 * • blue1, purp, blue2, … 
 *   strings holding sld style formatting objects creating a log colour ramp for values from 
 *   0 to 15_000 according to the color ramps of base R function hcl.colors()
 *   These strings can be fed to `anEEImage.sldStyle(...)` when adding the layer to the map
*/



exports.create_map = function(background){
  if (typeof background === 'undefined') {
    background = "#ffffeb"
  }
  var snazzyGrey = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.icon",
        "stylers": [
            {
                "color": "#bd081c"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                  "color": background
            }, 
            {
                  "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers" : [
            {
                 "visibility": "off"
            } 
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e9e9e9"
            },
            {
                "lightness": 17
            }
        ]
    }
  ]

  // center on Germany (takes WGS84)  
  var daMap = ui.Map({ lon: 10.18, lat : 50.38, zoom: 6 });
  daMap.setOptions("snazzyGrey", { snazzyGrey: snazzyGrey});

  // disable standard google map controls not needed: 
  // layer selector, satellite background map selector, drawing tools
  daMap.setControlVisibility(true, false, true, true, false, true, false);
 
  // set cursor style 
  daMap.style().set('cursor', 'crosshair')  
  
  return daMap;
}

// create the xml color ramp (there is an R-Script "create_slds" for creating the 
// logarithmic interpolated sld strings)

exports.sunset = "<RasterSymbolizer>\n    <Opacity>1.0</Opacity>\n     <ChannelSelection>\n        <GrayChannel>\n            <SourceChannelName>1</SourceChannelName>\n        </GrayChannel>\n    </ChannelSelection>\n    <ColorMap type=\"ramp\">\n        <ColorMapEntry color=\"#FFEC9D\" quantity=\"0\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#FAD67F\" quantity=\"1\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#F5C162\" quantity=\"1\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#F1AC4A\" quantity=\"2\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#EF9B4E\" quantity=\"3\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#EC8B51\" quantity=\"5\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#E67C57\" quantity=\"9\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#D87263\" quantity=\"15\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#CA6870\" quantity=\"26\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#B4617C\" quantity=\"44\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#915D8A\" quantity=\"74\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#6F5A97\" quantity=\"126\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#535496\" quantity=\"215\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#3B4D8C\" quantity=\"365\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#234681\" quantity=\"621\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#1B3B6F\" quantity=\"1056\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#1A2E59\" quantity=\"1795\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#192043\" quantity=\"3052\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#11152C\" quantity=\"5189\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#080A16\" quantity=\"8822\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#000000\" quantity=\"15000\" label=\"\" opacity=\"1\"/>\n   </ColorMap>\n</RasterSymbolizer>"
// Blue with very light Blue at 0
exports.test_sld = "<RasterSymbolizer>\n        <Opacity>1.0</Opacity>\n        <ChannelSelection>\n                <GrayChannel>\n                        <SourceChannelName>1</SourceChannelName>\n                </GrayChannel>\n        </ChannelSelection>\n        <ColorMap extended=\"true\">\n                <ColorMapEntry color=\"#0000ff\" quantity=\"3189.0\"/>\n                <ColorMapEntry color=\"#009933\" quantity=\"6000.0\"/>\n                <ColorMapEntry color=\"#ff9900\" quantity=\"9000.0\" />\n                <ColorMapEntry color=\"#ff0000\" quantity=\"14265.0\"/>\n        </ColorMap>\n</RasterSymbolizer>"
exports.new_blues = "<RasterSymbolizer>\n    <Opacity>1.0</Opacity>\n     <ChannelSelection>\n        <GrayChannel>\n            <SourceChannelName>1</SourceChannelName>\n        </GrayChannel>\n    </ChannelSelection>\n    <ColorMap type=\"ramp\">\n        <ColorMapEntry color=\"#F4FAFE\" quantity=\"0\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#EDF7FC\" quantity=\"1\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#E3F1F8\" quantity=\"1\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#D9EAF5\" quantity=\"2\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#CDE3F0\" quantity=\"3\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#C1DBEC\" quantity=\"5\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#B5D2E7\" quantity=\"9\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#A8C9E2\" quantity=\"15\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#9BBFDD\" quantity=\"26\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#8DB5D8\" quantity=\"44\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#7FABD3\" quantity=\"74\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#72A1CE\" quantity=\"126\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#6496C8\" quantity=\"215\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#558BC3\" quantity=\"365\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#467FBE\" quantity=\"621\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#3573B9\" quantity=\"1056\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#3267AD\" quantity=\"1795\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#315B9D\" quantity=\"3052\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#2F4F8E\" quantity=\"5189\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#2C437F\" quantity=\"8822\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#273871\" quantity=\"15000\" label=\"\" opacity=\"1\"/>\n   </ColorMap>\n</RasterSymbolizer>"
exports.blues = "<RasterSymbolizer>\n  <ChannelSelection>\n    <GrayChannel>\n      <SourceChannelName>1</SourceChannelName>\n    </GrayChannel>\n  </ChannelSelection\n   <ColorMap type=\"ramp\">\n        <ColorMapEntry color=\"#F4FAFE\" quantity=\"0\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#EDF7FC\" quantity=\"1\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#E3F1F8\" quantity=\"1\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#D9EAF5\" quantity=\"2\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#CDE3F0\" quantity=\"3\" label=\"0\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#C1DBEC\" quantity=\"5\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#B5D2E7\" quantity=\"9\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#A8C9E2\" quantity=\"15\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#9BBFDD\" quantity=\"26\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#8DB5D8\" quantity=\"44\" label=\"0\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#7FABD3\" quantity=\"74\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#72A1CE\" quantity=\"126\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#6496C8\" quantity=\"215\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#558BC3\" quantity=\"365\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#467FBE\" quantity=\"621\" label=\"0\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#3573B9\" quantity=\"1056\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#3267AD\" quantity=\"1795\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#315B9D\" quantity=\"3052\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#2F4F8E\" quantity=\"5189\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#2C437F\" quantity=\"8822\" label=\"0\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#273871\" quantity=\"15000\" label=\"\" opacity=\"1\"/>\n   </ColorMap>\n</RasterSymbolizer>"
// purple with more color at 0
exports.purp =     "<RasterSymbolizer>\n    <ColorMap type=\"ramp\">\n        <ColorMapEntry color=\"#F6E2FB\" quantity=\"0\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#F3D8FB\" quantity=\"1\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#EED0F8\" quantity=\"1\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#E8C8F4\" quantity=\"2\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#E1C1F0\" quantity=\"3\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#DBB9EC\" quantity=\"5\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#D4B2E8\" quantity=\"9\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#CCABE4\" quantity=\"15\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#C5A4DF\" quantity=\"26\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#BE9DDB\" quantity=\"44\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#B696D6\" quantity=\"74\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#AF8FD2\" quantity=\"126\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#A789CD\" quantity=\"215\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#9F82C9\" quantity=\"365\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#977CC4\" quantity=\"621\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#8F75C0\" quantity=\"1056\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#876FBB\" quantity=\"1795\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#7E6AB5\" quantity=\"3052\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#7564AE\" quantity=\"5189\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#6C5FA6\" quantity=\"8822\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#645A9F\" quantity=\"15000\" label=\"\" opacity=\"1\"/>\n   </ColorMap>\n</RasterSymbolizer>"
// Blues with gray at 0
exports.blues2 = "<RasterSymbolizer>\n    <ColorMap type=\"ramp\">\n        <ColorMapEntry color=\"#E2E2E2\" quantity=\"0\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#E0E0E1\" quantity=\"1\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#DCDDE0\" quantity=\"1\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#D7D8DE\" quantity=\"2\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#D2D3DC\" quantity=\"3\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#CBCDD9\" quantity=\"5\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#C4C6D6\" quantity=\"9\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#BCBFD3\" quantity=\"15\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#B3B7CF\" quantity=\"26\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#AAAFCB\" quantity=\"44\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#A1A6C8\" quantity=\"74\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#979DC3\" quantity=\"126\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#8C94BF\" quantity=\"215\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#818ABB\" quantity=\"365\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#7681B6\" quantity=\"621\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#6A76B2\" quantity=\"1056\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#5D6CAE\" quantity=\"1795\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#4F61AA\" quantity=\"3052\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#3F56A6\" quantity=\"5189\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#2C4BA4\" quantity=\"8822\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#023FA5\" quantity=\"15000\" label=\"\" opacity=\"1\"/>\n   </ColorMap>\n</RasterSymbolizer>"
// Grays with 0 being light gray
exports.lightGrays  = "<RasterSymbolizer>\n    <ColorMap type=\"ramp\">\n        <ColorMapEntry color=\"#E2E2E2\" quantity=\"0\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#E0E0E0\" quantity=\"1\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#DDDDDD\" quantity=\"1\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#D8D8D8\" quantity=\"2\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#D3D3D3\" quantity=\"3\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#CDCDCD\" quantity=\"5\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#C7C7C7\" quantity=\"9\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#C0C0C0\" quantity=\"15\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#B8B8B8\" quantity=\"26\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#B0B0B0\" quantity=\"44\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#A8A8A8\" quantity=\"74\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#9F9F9F\" quantity=\"126\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#969696\" quantity=\"215\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#8D8D8D\" quantity=\"365\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#838383\" quantity=\"621\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#7A7A7A\" quantity=\"1056\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#707070\" quantity=\"1795\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#656565\" quantity=\"3052\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#5B5B5B\" quantity=\"5189\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#515151\" quantity=\"8822\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#474747\" quantity=\"15000\" label=\"\" opacity=\"1\"/>\n   </ColorMap>\n</RasterSymbolizer>"
exports.risk = "<RasterSymbolizer>\n    <Opacity>1.0</Opacity>\n     <ChannelSelection>\n        <GrayChannel>\n            <SourceChannelName>1</SourceChannelName>\n        </GrayChannel>\n    </ChannelSelection>\n    <ColorMap type=\"ramp\">\n        <ColorMapEntry color=\"#E5E5E5\" quantity=\"0\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#FCFD8F\" quantity=\"25\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#F3CE65\" quantity=\"50\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#EB9F3C\" quantity=\"75\" label=\"\" opacity=\"1\"/>\n        <ColorMapEntry color=\"#9A3F07\" quantity=\"100\" label=\"\" opacity=\"1\"/>\n   </ColorMap>\n</RasterSymbolizer>"

// last line