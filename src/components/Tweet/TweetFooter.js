import React from "react";
import CardActions from '@material-ui/core/CardActions';
import {Comment, Favorites, PM, Retweet} from '../prototype/Icon';

class TweetFooter extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            favouriteStatus: false,
            favouriteCount: 0,
        };
    }

    render() {
        const {tweet, classes} = this.props;
        let favCount = tweet.favorite_count?tweet.favorite_count: tweet.retweeted_status && tweet.retweeted_status.favorite_count;
        favCount=favCount?favCount:0;
        return (
            <div>
                <CardActions className={classes.actions} disableActionSpacing>
                    <Comment onClick={this.handleFavouriteClick} {...this.props}/>
                    <Retweet onClick={this.handleFavouriteClick} {...this.props}/>
                    <Favorites FavouriteCount={favCount}/>
                    <PM onClick={this.handleFavouriteClick} {...this.props}/>
                </CardActions>
            </div>
        )
    }
}

export default TweetFooter
