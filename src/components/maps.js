export const Maps = () => {
    let apiKey = "c93320c343b909326997fa230c76834c";
    const map = Wrld.map("map", apiKey, {
        center: [51.509865, -0.118092],
        zoom: 15
    });

    let times = [Wrld.themes.time.Dawn, Wrld.themes.time.Day, Wrld.themes.time.Dusk, Wrld.themes.time.Night];
    let timeIndex = 0;
    setInterval(() => {
        map.themes.setTime(times[timeIndex]);
        timeIndex = (timeIndex + 1) % times.length;
    }, 5000);

    let weathers = [Wrld.themes.weather.Clear, Wrld.themes.weather.Overcast, Wrld.themes.weather.Rainy, Wrld.themes.weather.Snowy];
    let weatherIndex = 2;
    setInterval(() => {
        map.themes.setWeather(weathers[weatherIndex]);
        weatherIndex = (weatherIndex + 1) % weathers.length;
    }, 5000);

    const searchbarConfig = {
        apiKey: apiKey,
        outdoorSearchMenuItems: [
          {name: "Around Me", searchTag: "", iconKey: "aroundme"},
          {name: "Tourism", searchTag: "tourist_info", iconKey: "tourist_info"},
          { name: "General", searchTag: "general", iconKey: "general" },
          { name: "Check In", searchTag: "check_in", iconKey: "ticket" },
          { name: "Gates", searchTag: "gate", iconKey: "airport" },
          { name: "Coffee", searchTag: "coffee", iconKey: "coffee" },
          { name: "Food & Drink", searchTag: "food_drink", iconKey: "food_drink" },
          { name: "Shopping", searchTag: "shopping", iconKey: "shopping" },
          { name: "Hotel", searchTag: "hotel", iconKey: "hotel" },
        ],
        locationJumps: [
          {name: "San Francisco", latLng: [37.7952, -122.4028]},
          {name: "London", latLng: [51.509865, -0.118092]},
          {name: "Paris", latLng: [48.8566, 2.3522]},
          {name: "New York", latLng: [40.712776, -74.005974]},
          {name: "Miami", latLng: [25.761681, -80.191788]},
        ]
    };
    const searchbar = new WrldSearchbar("widget-container", map, searchbarConfig);
    const markerController = new WrldMarkerController(map, {
        searchbar: searchbar,
        poiViewsEnabled: true
    });

    searchbar.on("searchresultselect", goToResult);
    function goToResult(event) {
        markerController.openPoiView(event.result.sourceId);
        map.setView(event.result.location.latLng, 15);
    }
}

