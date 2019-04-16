import React, {PureComponent} from 'react';
import "../stylesheets/styles.scss";
import axios from 'axios';
import {Hearts} from '@bit/mhnpd.react-loader-spinner.hearts';
import {getRandomColor} from '@bit/joshk.jotils.get-random-color'
import SearchBar from "../components/SearchBar";
import SearchIndicator from "./Tweet/SearchIndicator";
import TweetContainer from "./TweetContainer";


let apiKey = 'f750d586c2243a';

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            tweets: null,
            isLoading: false,
            latitude: null,
            longitude: null,
            errorMessage: '',
            userCity: '',
            searchIndicator: true,
        };
        this.resetCoordinates = this.resetCoordinates.bind(this)
    }

    /**
     * This is a react lifecycle method, which gets trigger when app renders the UI first time.
     */
    componentDidMount() {
        this.detectCoordinates();
    }

    /**
     * This method shows the understanding of generators
     * It always keeps new tweets ready by sending the request to BE for the user when he is about to scroll the page
     * @returns {IterableIterator<*>}
     */
    * generateTweets() {
        let tweets = null;
        yield fetch(`https://twit-be.herokuapp.com/search/${this.state.searchTerm}`).then(res => res.json()).then(values => tweets = values);
        const obj1 = {...this.state.tweets};

        if (tweets) {
            for (let i = 0; i < tweets.statuses.length; i++) {
                obj1.statuses.push(tweets.statuses[i])
            }
        }
        yield this.setState({tweets: obj1, isLoading: false});
    }

    /**
     * This method returns the position coordinates from the user agent (browser).
     */
    detectCoordinates() {
        window.navigator.geolocation.getCurrentPosition((success, reject) => {
            console.info("Found User geo position successfully ");
            this.setState({
                isLoading:true,
                latitude: success.coords.latitude,
                longitude: success.coords.longitude
            }, () => this.detectCity1())
        }, (reject) => {
            console.error("User denied geo position permission");
            this.callTwitterAPI('world');
            this.setState({
                errorMessage: reject.message,
            })
        })
    }

    /**
     * This method demonstrate the understanding of promises
     * It fetches user location detail from the found coordinates from the user agent (browser).
     */
    // detectCity() {
    //     console.info("State inside detectCity function : ", this.state);
    //     axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${this.state.latitude}&lon=${this.state.longitude}&format=json`, {
    //         async: true,
    //         crossDomain: true,
    //         method: "GET"
    //     }).then(res => {
    //         console.info("Detected city is : " + res.data.address.city);
    //         this.setState({
    //             userCity: res.data.address.city,
    //         },)
    //     }).then(() => this.callTwitterAPI(this.state.userCity));
    // }

    /**
     * This method demonstrate the understanding for using async and await
     * It fetches user location detail from the found coordinates from the user agent (browser).
     * @returns {Promise<void>}
     */
    async detectCity1() {
        const response = await axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${this.state.latitude}&lon=${this.state.longitude}&format=json`, {
            async: true,
            crossDomain: true,
            method: "GET"
        });
        this.setState({
            userCity: response.data.address.city,
        }, () => this.callTwitterAPI(this.state.userCity))
    }

    resetCoordinates() {
        this.setState({
            latitude: null,
            longitude: null,
        })
    }

    /**
     * This method fetched the tweets from the twitter API using the keyword provided by the user or using the found user location.
     * @param newValue
     */
    callTwitterAPI(newValue) {
        if (newValue) {
            fetch(`https://twit-be.herokuapp.com/search/${newValue}`)
                .then(res => res.json())
                .then(tweets => this.setState({
                    searchIndicator: true,
                    searchTerm: newValue,
                    tweets: tweets,
                    isLoading: false
                }));
        }
    }

    renderSearchIndicator() {
        if (this.state.searchIndicator) {
            setTimeout(() => {
                this.setState({searchIndicator: false})
            }, 5000);
            return (<SearchIndicator searchedTerm={this.state.searchTerm} latitude={this.state.latitude}
                                     longitude={this.state.longitude} resetCoordinates={this.resetCoordinates} />)
        } else {
            return null
        }
    }

    /**
     * Whenever any changes happens to state it calls render function automatically
     * @returns {*}
     */
    render() {
        const {tweets, isLoading, userCity} = this.state;
        return (
            <div className="parent">
                <SearchBar userCity={userCity} callTwitterAPI={this.callTwitterAPI.bind(this)}/>
                {this.renderSearchIndicator()}
                <div className="tweets-parent">
                    {isLoading &&
                    <div style={{left: '43%', position: 'absolute'}}>
                        <Hearts
                            color={getRandomColor()}
                            height={150}
                            width={150}
                        />
                    </div>
                    }
                    {tweets && <TweetContainer tweets={tweets} generateTweets={this.generateTweets.bind(this)}/>}
                </div>
            </div>
        );
    }
}

export default App;