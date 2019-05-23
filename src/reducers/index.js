import { combineReducers } from 'redux';

const initialState = {
    apiErrorMessage: '',
    appErrorMessage: '',
    isLoading: false,
    latitude: null,
    longitude: null,
    showSearchIndicator: false,
    searchTerm: '',
    tweets: null,
    userCity: '',
};

const appDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_COORDINATES':
            return {
                ...state,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                isLoading: true,
            };
        case 'FETCH_COORDINATES_ERROR':
            return {
                ...state,
                apiErrorMessage: action.payload.apiErrorMessage,
                searchTerm: action.payload.searchTerm,
            };
        case 'FETCH_LOCATION_ERROR':
            return {
                ...state,
                apiErrorMessage: action.payload.apiErrorMessage,
                appErrorMessage: "Now trying to load app with default search query",
                searchTerm: action.payload.searchTerm,
                isLoading: false,
            };
        case 'FETCH_LOCATION':
            return {
                ...state,
                searchTerm: action.payload.searchTerm,
                userCity: action.payload.userCity,
                isLoading: true,
                showSearchIndicator: true,
            };
        case 'FETCH_TWEETS':
            return {
                ...state,
                tweets: action.payload.tweets,
                isLoading: false,
                showSearchIndicator: true,
                searchTerm: action.payload.searchTerm,
                apiErrorMessage: '',
                appErrorMessage: '',
            };
        case 'FETCH_TWEETS_ERROR':
            return {
                ...state,
                isLoading: false,
                apiErrorMessage: action.payload.apiErrorMessage,
                appErrorMessage: action.payload.appErrorMessage,
            };

        case 'FETCH_TWEETS_ONSCROLL':
            let newTweetsObj = {...state.tweets};
            if (action.payload.tweets && action.payload.tweets.statuses) {
                const appendedTweets = newTweetsObj.statuses.concat(action.payload.tweets.statuses);
                newTweetsObj.statuses = appendedTweets;
            }
            return {
                ...state,
                isLoading: false,
                tweets: newTweetsObj,
            };
        case 'MODIFY_SEARCHQUERY':
            //To prevent calling BE when user search for same query again
            if (action.payload.searchTerm === state.searchTerm) {
                return state;
            }
            return {
                ...state,
                tweets: null,
                isLoading: true,
                showSearchIndicator: true,
                searchTerm: action.payload.searchTerm,
            };
        case 'RESET_COORDINATES':
            return {
                ...state,
                latitude: null,
                longitude: null
            };
        case 'RESET_SEARCHINDICATOR':
            return {
                ...state,
                showSearchIndicator: false
            };
        default:
            return state;
    }
};

export default combineReducers({
    appDataReducer
});