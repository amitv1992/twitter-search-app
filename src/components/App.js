import React, {PureComponent} from 'react';
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {Hearts} from '@bit/mhnpd.react-loader-spinner.hearts';
import {getRandomColor} from '@bit/joshk.jotils.get-random-color'
import "../stylesheets/styles.scss";
import SearchBar from "../components/SearchBar";
import SearchIndicator from "./Tweet/SearchIndicator";
import TweetContainer from "./TweetContainer";
import { fetchUserCoordinates, fetchUserLocation, fetchTweets, fetchTweetsOnScroll, resetSearchIndicator } from "../actions";

class App extends PureComponent {
    /**
     * This is a react lifecycle method, which gets trigger when app renders the UI first time.
     */
    componentDidMount() {
        this.props.fetchUserCoordinates();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        /**
         * Logic to call LocationAPI
         */
        if (nextProps.state.latitude && nextProps.state.latitude !== this.props.state.latitude){
            console.info("LocationAPI got called...");
            this.props.fetchUserLocation(nextProps.state.latitude,nextProps.state.longitude)
        }
        /**
         * Logic to call TwitterAPI and prevent multiple calls for same query
         */
        if (nextProps.state.searchTerm && nextProps.state.searchTerm !== this.props.state.searchTerm){
            console.info("TwitterAPI got called...");
            this.props.fetchTweets(nextProps.state.searchTerm);
        }
    }

    /**
     * This method shows the understanding of generators
     * It always keeps new tweets ready by sending the request to BE for the user when he is about to scroll the page
     * @returns {IterableIterator<*>}
     */
    * generateTweets() {
        let tweets = null;
        yield fetch(`https://twit-be.herokuapp.com/megasearch/${this.props.state.searchTerm}`).then(res => res.json()).then(values => tweets = values).catch(error => {
            console.error(error);
        });
        yield this.props.fetchTweetsOnScroll(tweets);
    }

    renderSearchIndicator() {
        if(this.props.state.showSearchIndicator){
            setTimeout(() => {
                this.props.resetSearchIndicator();
            }, 5000);
            return (<SearchIndicator />)
        }else {
            return null
        }
    }

    /**
     * Whenever any changes happens to state it calls render function automatically
     * @returns {*}
     */
    render() {
        const { tweets, showSearchIndicator, isLoading, apiErrorMessage, appErrorMessage } = this.props.state;
        return (
            <div className="parent">
                <SearchBar/>
                { showSearchIndicator && this.renderSearchIndicator() }
                <div className="tweets-parent">
                    {apiErrorMessage &&
                        <div style={{position: 'absolute', top: '40%', left: '30%', width: '550px', textAlign: 'center'}}>
                            <Paper elevation={1}>
                                <Typography variant="h5" component="h4">
                                    {apiErrorMessage}
                                    {appErrorMessage &&
                                        <Paper elevation={0}>
                                            <Typography component="p" style={{fontSize:"smaller"}}>
                                                {appErrorMessage}
                                            </Typography>
                                            <Hearts
                                                color={getRandomColor()}
                                                height={150}
                                                width={150}
                                            />
                                        </Paper>
                                    }
                                </Typography>
                            </Paper>
                        </div>
                    }
                    {isLoading &&
                        <div style={{left: '43%', position: 'absolute'}}>
                            <Hearts
                                color={getRandomColor()}
                                height={150}
                                width={150}
                            />
                        </div>
                    }

                    {tweets &&
                        <TweetContainer generateTweets={this.generateTweets.bind(this)}/>
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) =>{
    console.info("STATE INFO FROM APP COMPONENT: ",state);
    return { state : state.appDataReducer };

};

const mapDispatchToProps = {
    fetchUserCoordinates,
    fetchUserLocation,
    fetchTweets,
    resetSearchIndicator,
    fetchTweetsOnScroll,
};
export default connect(mapStateToProps,mapDispatchToProps)(App);