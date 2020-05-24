async function getImage(cityName) {

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${cityName}&orientation=landscape&client_id=JXy3ruMFQ3-YyfHMuhD2fy1AZ_gh4750wedKVthQG3k`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status:${response.status}`);
    } else {
      // const data = await response.json();
      // console.log(data);
      return response.json();
    }
  }
  
  export { getImage };
  // https://api.unsplash.com/search/photos?query=istanbul&orientation=landscape&client_id=JXy3ruMFQ3-YyfHMuhD2fy1AZ_gh4750wedKVthQG3k