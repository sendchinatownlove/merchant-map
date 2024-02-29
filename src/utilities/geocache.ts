// Utility functions to parse data from geocache

function removeCharFromString(stringInput: any, charToRemove: string) {
    if (stringInput === null || stringInput === undefined) {
        return null;
    }
    return stringInput.split(charToRemove).join("");
}

function decodeBase64(base64String: any) {
    const buf = Buffer.from(base64String, "base64");
    return buf.toString("utf8");
}

function decodeGeocache(base64Geocache: any) {
    // const cleanBase64Geocache = removeCharFromString(base64Geocache, "🔵");

    try {
        return JSON.parse(decodeBase64(base64Geocache));
    } catch (error) {
        return {};
    }
}
export function getAddressFromGeocache(base64Geocache: any) {
    // const base64GeocacheJSON = decodeGeocache(base64Geocache);
    const base64GeocacheJSON = JSON.parse(atob(base64Geocache));

    if (base64GeocacheJSON && base64GeocacheJSON.o) {
        // formattedAddress from the Geocache ends with ", USA" so we want to remove that.
        const formattedAddress = base64GeocacheJSON.o.formattedAddress;
        return removeCharFromString(formattedAddress, ", USA");
    }
    return undefined;
}

export function getLatLongFromGeocache(base64Geocache: any) {
    // const base64GeocacheJSON = decodeGeocache(base64Geocache);
    const base64GeocacheJSON = JSON.parse(atob(base64Geocache));

    if (base64GeocacheJSON && base64GeocacheJSON.o) {
        return { lat: base64GeocacheJSON.o.lat, lng: base64GeocacheJSON.o.lng };
    }
    return {
        lat: undefined,
        lng: undefined,
    };
}
