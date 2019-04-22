import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import TweetHeader from "./Tweet/TweetHeader";
import TweetFooter from "./Tweet/TweetFooter";
import TweetBody from "./Tweet/TweetBody";
import {Hearts} from '@bit/mhnpd.react-loader-spinner.hearts';
import {getRandomColor} from "@bit/joshk.jotils.get-random-color";

const styles = theme => ({
    card: {
        margin: 10,
        width: 700,
        maxWidth: 700,
        position: 'relative',
        top: 0,
        bottom: 0,
        left: 300,
        right: 0,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

class TweetContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
        this.pageEndDetection = this.pageEndDetection.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.pageEndDetection);
        this.generateTweets = this.props.generateTweets();
        setTimeout(() => {this.generateTweets.next()},2000);

    }

    componentWillUnmount() {
        console.info('Tweet container component will unmount');
        window.removeEventListener('scroll', this.pageEndDetection);
    }

    pageEndDetection() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.info("you're at the bottom of the page");
            this.generateTweets.next();
            this.generateTweets = this.props.generateTweets();
            this.generateTweets.next();
        }
    }

    renderLoaderIndicator(){
        return(
            <div style={{left: '43%', position: 'absolute'}}>
                <Hearts
                    color={getRandomColor()}
                    height={150}
                    width={150}
                />
            </div>
        )
    }

    render() {
        const {classes, tweets, errorMessage,isLoading} = this.props;
        const grabbedStatus = tweets && tweets.statuses;
        if(errorMessage){
            return (<div style={{position: 'absolute', top: '40%', left: '30%',width: '550px',textAlign:'center'}}>
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                            Network error occurred :
                        </Typography>
                        <Typography component="p">
                            {errorMessage}
                            {'\n Please try again after some time...'}
                        </Typography>
                    </Paper>
                </div>
            );
        }
        if (grabbedStatus && grabbedStatus.length) {
            return (
                <div className="content" onScroll={this.pageEndDetection}>
                    {
                        grabbedStatus.map((tweet, i) => (
                            <div className="tweet-content">
                                <Card className={classes.card} key={i}>
                                    <TweetHeader tweet={tweet} classes={classes}/>
                                    <TweetBody tweet={tweet} classes={classes}/>
                                    <TweetFooter tweet={tweet} classes={classes}/>
                                </Card>
                            </div>
                        ))
                    }
                    {isLoading && this.renderLoaderIndicator()};
                </div>

            )
        }else{
            return (<div style={{position: 'absolute', top: '40%', left: '30%',width: '550px',textAlign:'center'}}>
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                            No tweets found :(
                        </Typography>
                        <Typography component="p">
                            Please try another keyword...
                        </Typography>
                    </Paper>
                </div>
            );
        }

    }
}

TweetContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TweetContainer);