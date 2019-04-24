import React from "react";
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import ReTweetModal from "../ReTweetModal";

const propType = {
    tweet: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const defaultProps = {
    tweet: null,
    classes: null,
};

class TweetBody extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleImageClick = () => {
        this.setState({
            open: !this.state.open
        })
    };

    /**
     * This method renders image found in the tweet content and assign modal to it
     * @param css
     * @param img
     * @returns {*}
     */
    renderMedia(css, img) {
        const {classes} = this.props;
        if (img.media && img.media[0]) {
            return (
                <div className="media">
                    <CardMedia
                        className={css}
                        image={img.media[0].media_url_https}
                        title=""
                        onClick={this.handleImageClick}
                    >
                        <ReTweetModal classes={classes} img={img} status={this.state.open}/>
                    </CardMedia>
                </div>
            )
        }
    }


    render() {
        const {tweet, classes} = this.props;
        return (
            <div className="tweet-body">
                <CardContent>
                    <Typography component="p">
                        <Linkify properties={{target: '_blank'}}>{tweet.text}</Linkify>
                    </Typography>
                </CardContent>
                {this.renderMedia(classes.media, tweet.entities)}
            </div>

        )
    }
}

TweetBody.propTypes = propType;
TweetBody.defaultProps = defaultProps;

export default TweetBody
