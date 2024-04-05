const nearbySearch = async (map, places, request) =>
    new Promise((resolve, reject) => {
        const service = new places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
            if (status === places.PlacesServiceStatus.OK) resolve(results);
            reject(status);
        });
    });

export default nearbySearch;
