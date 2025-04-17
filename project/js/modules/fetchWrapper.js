export async function fetchData(resourceUri) {

    try {
        const response = await fetch(resourceUri);
        consolge.log(response);

        if(!response.ok) {
            throw new Error (`An Error has occured while processing the request ${response.status}`);
        }

        const data = await response.json();
        return data;
    } 
    catch(error) {
        throw error;
    }
}