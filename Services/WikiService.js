
export async function getNearbyPagesAsync(latitude, longitude) {
  let url = "https://en.wikipedia.org/w/api.php";
  let params = {
    action: "query",
    list: "geosearch",
    gscoord: latitude + "|" + longitude,
    gsradius: "10000",
    gslimit: "10",
    format: "json"
  }

  url = url + "?origin=*";
  Object.keys(params).forEach(function(key){
    url += "&" + key + "=" + params[key];
  });

  try {
    let respond = await fetch(url);
    respond = await respond.json();
    let formattedPages = [];
    const pages = respond.query.geosearch;

    pages.forEach((item) => {
      let newPage = {
        title: item.title,
        pageId: item.pageid,
        distance: item.dist,
        latitude: item.lat,
        longitude: item.lon
      };
      formattedPages.push(newPage);
    })

    return formattedPages;
  } catch (error) {
    console.log(error);
  }
}