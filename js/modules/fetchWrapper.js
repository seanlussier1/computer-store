export async function fetchData(url) {
    // method will fetch a url and return the response as long as there is no error.
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
    }
    return await response.json();
}
