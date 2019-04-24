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
import {CellMeasurer, CellMeasurerCache, List} from 'react-virtualized';

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

let cache = new CellMeasurerCache({
    defaultHeight: 240,
    fixedWidth: true,
});

class TweetContainer extends React.Component {

    constructor(props) {
        super(props);
        this.rowRenderer = this.rowRenderer.bind(this);
        cache.clearAll(); //need to reset old cache copy, when this component gets remount.
    }

    componentDidMount() {
        this.generateTweets = this.props.generateTweets();
        setTimeout(() => {
            this.generateTweets.next()
        }, 2000);
    }

    handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            console.info('Reached bottom of the tweet container');
            this.generateTweets.next();
            this.generateTweets = this.props.generateTweets();
            this.generateTweets.next();
        }
    }

    rowRenderer({
                    key,         // Unique key within array of rows
                    index,       // Index of row within collection
                    isScrolling, // The List is currently being scrolled
                    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
                    style,        // Style object to be applied to row (to position it)
                    parent        // Reference to the parent Grid
                }) {
        const {classes, tweets} = this.props;
        const grabbedStatus = tweets && tweets.statuses;
        return (
            <CellMeasurer
                cache={cache}
                key={key}
                parent={parent}
                rowIndex={index}
                columnIndex={0}
            >
                {({measure}) => (
                    <div className="tweet" key={key} style={style}>
                        <Card className={classes.card} key={index}>
                            <TweetHeader tweet={grabbedStatus[index]} classes={classes}/>
                            <TweetBody tweet={grabbedStatus[index]} classes={classes}/>
                            <TweetFooter tweet={grabbedStatus[index]} classes={classes}/>
                        </Card>
                    </div>
                )}
            </CellMeasurer>
        )
    };

    TweetList() {
        return (<List
            deferredMeasurementCache={cache}
            width={document.documentElement.clientWidth}
            height={document.documentElement.clientHeight}
            overscanRowsCount={2}
            rowCount={this.props.tweets.statuses.length}
            rowHeight={cache.rowHeight}
            rowRenderer={this.rowRenderer}
            ref={(list) => {
                this.list = list
            }}
        />)
    };

    render() {
        const {classes, tweets, errorMessage} = this.props;
        const grabbedStatus = tweets && tweets.statuses;
        if (errorMessage) {
            return (<div style={{position: 'absolute', top: '40%', left: '30%', width: '550px', textAlign: 'center'}}>
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
                <div id="tweet-content" onScroll={this.handleScroll}>
                    {this.TweetList()}
                </div>
            )
        } else {
            return (<div style={{position: 'absolute', top: '40%', left: '30%', width: '550px', textAlign: 'center'}}>
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