export const spacedtoHyphenatedCase = function(string) {
    return string.toLowerCase().replaceAll(" ", "-");
}

export const hyphenatedToTitleCase = function(string) {
    return string.replaceAll("-", " ").replace(
        /\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    ).replace(/a ?p ?i/ig, "API"); // Make title case, API all capitalised
}
export const camelToTitleCase = function(string){
    const result = string.replace(/([A-Z])/g, " $1");
    return (result.charAt(0).toUpperCase() + result.slice(1)).replace(/a ?p ?i/ig, "API");
}

export const filterSwaggerPropertiesByType = (properties, filter) => {
    return properties.filter( property => property.type === filter)[0];
}