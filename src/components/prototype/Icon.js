import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import Inbox from '@material-ui/icons/Inbox';
import Repeat from '@material-ui/icons/Repeat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

class Icon extends React.Component {
    constructor(props) {
        super(props);
        this.iconObj = 'base';
        this.iconHandler = (e) => {
            console.log(e)
        };
        this.iconStyles = null;
        this.iconCounter = null;
    }

    render() {
        let icon = React.createElement(this.iconObj, this.iconStyles, null);
        return (
            <IconButton aria-label="actionIcons" onClick={this.iconHandler}>
                {icon}
                <span className="counts">{this.iconCounter}</span>
            </IconButton>
        )
    }
}

export class Comment extends Icon {
    constructor(props) {
        super(props);
        this.iconObj = ChatBubbleOutline;
        this.iconHandler = this.props.onClick;
        this.iconCounter = this.props.tweet.user.listed_count;
        this.iconStyles = {style: {color: 'blue'}}
    }

    render() {
        return super.render();
    }
}

export class Retweet extends Icon {
    constructor(props) {
        super(props);
        this.iconObj = Repeat;
        this.iconHandler = this.props.clickHandler;
        this.iconCounter = this.props.tweet.retweet_count;
        this.iconStyles = {style: {color: 'orange'}}
    }

    render() {
        return super.render();
    }
}

export class Favorites extends Icon {
    constructor(props) {
        super(props);
        this.state = {
            favouriteStatus: false,
            favouriteCount: 0,

        };
        this.iconObj = FavoriteIcon;
        this.iconHandler = this.handleFavouriteClick;
    }

    componentDidMount() {
        this.setState({favouriteCount: this.props.FavouriteCount});
    }

    renderFavouriteButton() {
        if (this.state.favouriteStatus) {
            this.iconObj = FavoriteIcon;
            this.iconStyles = {style: {color: 'red'}}
        } else {
            this.iconObj = FavoriteBorder;
            this.iconStyles = {style: {color: ''}}
        }
    }

    handleFavouriteClick = (e) => {
        if (!this.state.favouriteStatus) {
            this.setState({
                favouriteStatus: !this.state.favouriteStatus,
                favouriteCount: this.state.favouriteCount + 1,
            })
        } else {
            this.setState({
                favouriteStatus: !this.state.favouriteStatus,
                favouriteCount: this.state.favouriteCount - 1,
            })
        }
    };

    render() {
        this.iconCounter = this.state.favouriteCount;
        this.renderFavouriteButton();
        return super.render();
    }
}

export class PM extends Icon {
    constructor(props) {
        super(props);
        this.iconObj = Inbox;
        this.iconHandler = this.props.clickHandler;
        this.iconStyles = {style: {color: '#4c8492'}}
    }

    render() {
        return super.render();
    }
}