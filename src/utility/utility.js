export const parseURL = function(apiName) {
    return apiName.toLowerCase().replaceAll(" ", "-");
}

export const parseApiName = function(url) {
    var apiName = url.replaceAll("-", " ").replace(
        /\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    ).replace(/api/ig, "API"); // Make title case, API all capitalised
    return apiName;
}
