$(document).ready(init());

var zone_data;
var map;
var zoningData = [
  {
    name: "a-b",
    filename: "a-b.geojson",
    color: "#90ff00"
  },
  {
    name: "a-r",
    filename: "a-r.geojson",
    color: "#4c661a"
  },
  {
    name: "a-u",
    filename: "a-u.geojson",
    color: "#2ea629"
  },
  {
    name: "b-1",
    filename: "b-1.geojson",
    color: "#40ffb2"
  },
  {
    name: "b-2",
    filename: "b-2.geojson",
    color: "#238c62"
  },
  {
    name: "b-2a",
    filename: "b-2a.geojson",
    color: "#004d45"
  },
  {
    name: "b-2b",
    filename: "b-2b.geojson",
    color: "#00fff6"
  },
  {
    name: "b-3",
    filename: "b-3.geojson",
    color: "#59b3b0"
  },
  {
    name: "b-4",
    filename: "b-4.geojson",
    color: "#40d9ff"
  },
  {
    name: "b-5p",
    filename: "b-5p.geojson",
    color: "#203840"
  },
  {
    name: "b-6p",
    filename: "b-6p.geojson",
    color: "#004166"
  },
  {
    name: "cc",
    filename: "cc.geojson",
    color: "#a0a600"
  },
  {
    name: "cd",
    filename: "cd.geojson",
    color: "#ffff00"
  },
  {
    name: "ear-1",
    filename: "ear-1.geojson",
    color: "#003ad9"
  },
  {
    name: "ear-2",
    filename: "ear-2.geojson",
    color: "#080073"
  },
  {
    name: "ear-3",
    filename: "ear-3.geojson",
    color: "#9b86b3"
  },
  {
    name: "ed",
    filename: "ed.geojson",
    color: "#bfd2ff"
  },
  {
    name: "ex-1",
    filename: "ex-1.geojson",
    color: "#332400"
  },
  {
    name: "i-1",
    filename: "i-1.geojson",
    color: "#003780"
  },
  {
    name: "i-2",
    filename: "i-2.geojson",
    color: "#3d8bf2"
  },
  {
    name: "m-1p",
    filename: "m-1p.geojson",
    color: "#f27100"
  },
  {
    name: "mu-1",
    filename: "mu-1.geojson",
    color: "#f27d79"
  },
  {
    name: "mu-2",
    filename: "mu-2.geojson",
    color: "#7f0900"
  },
  {
    name: "mu-3",
    filename: "mu-3.geojson",
    color: "#4c0500"
  },
  {
    name: "p-1",
    filename: "p-1.geojson",
    color: "#004166"
  },
  {
    name: "p-2",
    filename: "p-2.geojson",
    color: "#5992b3"
  },
  {
    name: "pud-1",
    filename: "pud-1.geojson",
    color: "#f22800"
  },
  {
    name: "pud-2",
    filename: "pud-2.geojson",
    color: "#59392d"
  },
  {
    name: "r-1a",
    filename: "r-1a.geojson",
    color: "#bf40ff"
  },
  {
    name: "r-1b",
    filename: "r-1b.geojson",
    color: "#8a53a6"
  },
  {
    name: "r-1c",
    filename: "r-1c.geojson",
    color: "#47004d"
  },
  {
    name: "r-1d",
    filename: "r-1d.geojson",
    color: "#ffbff6"
  },
  {
    name: "r-1e",
    filename: "r-1e.geojson",
    color: "#f200ba"
  },
  {
    name: "r-1t",
    filename: "r-1t.geojson",
    color: "#8c4669"
  },
  {
    name: "r-2",
    filename: "r-2.geojson",
    color: "#59162d"
  },
  {
    name: "r-3",
    filename: "r-3.geojson",
    color: "#f20049"
  },
  {
    name: "r-4",
    filename: "r-4.geojson",
    color: "#ff80a6"
  },
  {
    name: "r-5",
    filename: "r-5.geojson",
    color: "#d9a3b3"
  }

]

var zoningLayers;

function init() {
  loadJSON(function(response) {
    zone_data = JSON.parse(response);
  });
  loadMap();
};

function loadMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYmxha2VzaGFsbCIsImEiOiJRSkN3Y3prIn0.MfDnpigJE6CVbEsV0xwLfA';
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v8',
    center: [-84.49726196688812, 38.03283139707153],
    zoom: 12,
  });
  map.on('load', loadData);
  map.on('load', loadLegend)
};

function loadData() {
  zoning_folder = "data/"
  zoningData.forEach(function (zone) {
    var source = new mapboxgl.GeoJSONSource({
      data: zoning_folder + zone.filename
    });
    map.addSource(zone.name, source);
    map.addLayer({
      "id": zone.name,
      "type": "fill",
      "source": zone.name,
      'layout': {},
      'paint': {
        'fill-color': zone.color,
        'fill-opacity': 0.5
      }
    });
  });
};

function loadLegend() {
  var content0 = "";
  var content1 = "";
  var content2 = "";
  var content3 = "";
  zoningData.forEach(function (zone, index) {
    if (index < 10) {
      content0 += legendTemplate(zone)
    }
    else if (index < 20) {
      content1 += legendTemplate(zone)
    }
    else if (index < 30) {
      content2 += legendTemplate(zone)
    }
    else {
      content3 += legendTemplate(zone)
    };
  });
  $('#legend-0').html(content0);
  $('#legend-1').html(content1);
  $('#legend-2').html(content2);
  $('#legend-3').html(content3);

  loadEvents();
};

function loadJSON(callback) {

var xobj = new XMLHttpRequest();
xobj.overrideMimeType("application/json");
xobj.open('GET', 'data/zones.json', true);
xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {

        // .open will NOT return a value but simply returns undefined in async mode so use a callback
        callback(xobj.responseText);

    }
}
xobj.send(null);

}

function loadEvents() {
  map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point);
    var selectedCode = features[0].properties.ZONING;
    document.getElementById('zone-name').innerHTML = selectedCode;
    zone_info = search_zones(selectedCode, zone_data.zones);
    clearInfo();
    setInfo(zone_info);
    
  });

  $('.layer-check').on('click', function () {
    $this = $(this);
    if ($this.is(':checked')) {
      map.setLayoutProperty($this.data('zoneName'), 'visibility', 'visible');
    }
    else {
      map.setLayoutProperty($this.data('zoneName'), 'visibility', 'none');
    }
  });

  $('#select-all').on('click', function (e) {
    e.preventDefault();
    zoningData.forEach(function (zone) {
      map.setLayoutProperty(zone.name, 'visibility', 'visible');
    });
    $('.layer-check').prop('checked', true);
  });

  $('#clear-all').on('click', function (e) {
    e.preventDefault();
    zoningData.forEach(function (zone) {
      map.setLayoutProperty(zone.name, 'visibility', 'none');
    });
    $('.layer-check').prop('checked', false);
  });
};

function search_zones(zone_code, myArray){
  for (var i=0; i < myArray.length; i++) {
      if (myArray[i].code === zone_code) {
          return myArray[i];
      }
  }
};

function setInfo(zone_info){
  document.getElementById("name").innerText = zone_info.name;
  document.getElementById("code").innerText = zone_info.code;
  document.getElementById("intent").innerText = zone_info.intent;
  document.getElementById("principal_uses").innerText = zone_info.principalUses;
  document.getElementById("accessory_uses").innerText = zone_info.accessoryUses;
  document.getElementById("conditional_uses").innerText = zone_info.conditionalUses;
  document.getElementById("prohibited_uses").innerText = zone_info.prohibitedUses;
  document.getElementById("min_lot_size").innerText = zone_info.minimumLotSize;
  document.getElementById("min_lot_frontage").innerText = zone_info.minimumLotFrontage;
  document.getElementById("min_front_yard").innerText = zone_info.minimumFrontYard;
  document.getElementById("min_side_yard").innerText = zone_info.minimumEachSideYard;
  document.getElementById("min_rear_yard").innerText = zone_info.minimumRearYard;
  document.getElementById("min_useable_open_space").innerText = zone_info.minimumUseableOpenSpace;
  document.getElementById("max_lot_coverage").innerText = zone_info.maximumLotCoverage;
  document.getElementById("max_building_height").innerText = zone_info.maximumHeightOfBuilding;
  document.getElementById("off_street_parking").innerText = zone_info.offStreetParking;
  document.getElementById("special_provisions").innerText = zone_info.specialProvisions;
};

function clearInfo(){
  document.getElementById("name").innerText = "";
  document.getElementById("code").innerText = "";
  document.getElementById("intent").innerText = "";
  document.getElementById("principal_uses").innerText = "";
  document.getElementById("accessory_uses").innerText = "";
  document.getElementById("conditional_uses").innerText = "";
  document.getElementById("prohibited_uses").innerText = "";
  document.getElementById("min_lot_size").innerText = "";
  document.getElementById("min_lot_frontage").innerText = "";
  document.getElementById("min_front_yard").innerText = "";
  document.getElementById("min_side_yard").innerText = "";
  document.getElementById("min_rear_yard").innerText = "";
  document.getElementById("min_useable_open_space").innerText = "";
  document.getElementById("max_lot_coverage").innerText = "";
  document.getElementById("max_building_height").innerText = "";
  document.getElementById("off_street_parking").innerText = "";
  document.getElementById("special_provisions").innerText = "";
}
