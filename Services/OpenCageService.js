// Documentation for OpenCageDataApi: https://opencagedata.com/api#intro

const apiKey = "02870f19e4934830b32442fcc491b6b9";
const baseURL = "https://api.opencagedata.com/geocode/v1/json?q=";
const keyNotation = "&key=";

function getAddressFromRespond(respond) {
  const components = respond.results[0].components;
  let address = components.country;
  const comma = ", ";

  if (components.county) {
    address += comma + components.county;
  }
  
  if (components.city) {
    address += comma + components.city;
  }
  
  if (components.road) {
    address += comma + components.road;
  }

  if (components.house_number) {
    address += comma + components.house_number;
  }
  

  return address;
}

export async function getFormatedAddress(latitude, longitude) {
  const coordinates = latitude + "+" + longitude;
  const url = baseURL + coordinates + keyNotation + apiKey;

  try {
    let respond = await fetch(url);
    respond = await respond.json();
    const address = getAddressFromRespond(respond);

    return address;
  } catch (error) {
    console.log(error);
  }
}

export async function getLocationByAddress(address) {
  const url = baseURL + address + keyNotation + apiKey + "&pretty=1";

  try {
    let respond = await fetch(url);
    respond = await respond.json();
    const address = getAddressFromRespond(respond);
    const geometry = respond.results[0].geometry;
    const location = {
      address: address,
      latitude: geometry.lat,
      longitude: geometry.lng
    }

    return location;
  } catch (error) {
    console.log(error);
  }
}