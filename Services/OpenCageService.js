
export async function getFormatedAddress(latitude, longitude) {
  const coordinates = latitude + "+" + longitude;
  const apiKey = "02870f19e4934830b32442fcc491b6b9"; 
  const url = "https://api.opencagedata.com/geocode/v1/json?q=" + coordinates + "&key=" + apiKey;

  try {
    let respond = await fetch(url);
    respond = await respond.json();
    const components = respond.results[0].components;
    let address = components.country + ", ";
    address += components.county + ", ";
    address += components.city + ", ";
    address += components.road + ", ";
    address += components.house_number;

    return address;
  } catch (error) {
    console.log(error);
  }
 
}