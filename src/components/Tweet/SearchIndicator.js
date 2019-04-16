import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const propType = {
    resetCoordinates: PropTypes.func.isRequired,
    searchedTerm: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
};

const defaultProps = {
    searchedTerm: null,
    latitude: null,
    longitude: null,
};

const styles = {
    root: {
        flexGrow: 1,
    },
};

class SearchIndicator extends React.Component {

    componentWillUnmount() {
        debugger;
        console.log('Component will unmount');
        this.props.resetCoordinates()
    }

    /**
     * To give feedback to user about the search information
     * @returns {*}
     */
    renderSearchIndicatorText() {
        const {searchedTerm, latitude, longitude} = this.props;
        if (searchedTerm && latitude && longitude) {
            return (
                <AppBar position="static" color="default" style={{height: 30}}>
                    <Toolbar>
                        <Typography color="inherit" style={{position: 'absolute', top: 4}}>
                            We have successfully detected your city as <b>{searchedTerm}</b> and lets see what is
                            happening there.
                        </Typography>
                    </Toolbar>
                </AppBar>
            )
        }
        if (searchedTerm && !latitude && !longitude) {
            return (
                <AppBar position="static" color="default" style={{height: 30}}>
                    <Toolbar>
                        <Typography color="inherit" style={{position: 'absolute', top: 4}}>
                            You have searched for : {searchedTerm}
                        </Typography>
                    </Toolbar>
                </AppBar>
            )
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                {this.renderSearchIndicatorText()}
            </div>
        );
    }
}

SearchIndicator.propTypes = propType;
SearchIndicator.defaultProps = defaultProps;

export default withStyles(styles)(SearchIndicator);