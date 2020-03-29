// define functions to communicate from frontend to backend
function retrieveGraphData(city, criteria, cb)
{
    return cb({data: {[city]: [{x: 5, y: 7}, {x:4, y:9}]}})
}



function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
}


const Client = {retrieveGraphData}; //remember to add your functions in {} to be able for it to be exported
export default Client;