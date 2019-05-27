import locationAPI,{ LOC_API_KEY } from '../apis/locationAPI';
import twitterAPI from '../apis/twitterAPI';

const defaultSearchTerm= 'world';

// Action creators
export function fetchUserCoordinates() {
    return (dispatch) => {
        const geolocation = navigator.geolocation;
        geolocation.getCurrentPosition((position) => {
            dispatch({
                type: 'FETCH_COORDINATES',
                payload: {latitude: position.coords.latitude, longitude: position.coords.longitude,}
            });

        }, (reject) => {
            console.error("coordinates error",reject,"message",reject.message);
            dispatch({
                type: 'FETCH_COORDINATES_ERROR',
                payload: {
                    apiErrorMessage: reject.message,
                    searchTerm: defaultSearchTerm,}
            });
        });
    }
}

export const fetchUserLocation = (lat, long) => async dispatch => {
    let response = null;
    try {
        response = await locationAPI.get(`/v1/reverse.php?key=${LOC_API_KEY}&lat=${lat}&lon=${long}&format=json`);
        let sanitizeCityName = response.data.address.city.toLowerCase();
        dispatch({
            type: 'FETCH_LOCATION',
            payload: {
                userCity: sanitizeCityName,
                searchTerm: sanitizeCityName,
            }
        });
    } catch (error) {
        if(error.response){
            // The request was made and the server responded with a status code
            console.info("location error",error.response.data);
            console.info("location error",error.response.status);
            console.info("location error",error.response.headers);
            dispatch({
                type: 'FETCH_LOCATION_ERROR',
                payload: {
                    apiErrorMessage: error.response.data.error,
                    searchTerm: defaultSearchTerm,
                }
            })
        }else{
            console.error("location error",error,"message",error.message);
            dispatch({
            type: 'FETCH_LOCATION_ERROR',
            payload: {
                apiErrorMessage: error.message+ " occurred.",
                searchTerm: defaultSearchTerm,
                }
            });
        }
    }
};

export const fetchTweets = (searchTerm) => async dispatch => {
    let response = null;
    try {
        response = await await twitterAPI.get(`/megasearch/${searchTerm}`);
        dispatch({
            type: 'FETCH_TWEETS',
            payload: {
                tweets: response.data,
                searchTerm: searchTerm
            }
        });
    } catch (e) {
        console.error("tweet error",e,"reponse",e.response);
        console.error("tweet error",e,"message",e.message);
        dispatch({
            type: 'FETCH_TWEETS_ERROR',
            payload: {
                apiErrorMessage: e.message+ " occurred.",
                appErrorMessage: 'Please check the network and refresh the page.'
            }
        });
    }
};

export const fetchTweetsOnScroll = (tweets) => {
    return {
        type: 'FETCH_TWEETS_ONSCROLL',
        payload: {tweets: tweets}
    };
};

export const resetCoordinates = () => {
    return {
        type: 'RESET_COORDINATES',
    };
};

export const resetSearchIndicator = () => {
    return {
        type: 'RESET_SEARCHINDICATOR',
    };
};

export const modifySearchQuery = (searchTerm) => {
    return {
        type: 'MODIFY_SEARCHQUERY',
        payload: {searchTerm: searchTerm ? searchTerm : defaultSearchTerm}
    };
};



