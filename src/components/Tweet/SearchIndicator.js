import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { resetCoordinates } from "../../actions";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const propType = {
    resetCoordinates: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

const styles = {
    root: {
        flexGrow: 1,
    },
};

class SearchIndicator extends React.Component {

    componentWillUnmount() {
        console.info('SearchIndicator component will unmount');
        this.props.resetCoordinates()
    }

    /**
     * To give feedback to user about the search information
     * @returns {*}
     */
    renderSearchIndicatorText() {
        const { searchTerm, latitude, longitude } = this.props.state.appDataReducer;
        if (searchTerm && latitude && longitude) {
            return (
                <AppBar position="static" color="default" style={{height: 30}}>
                    <Toolbar>
                        <Typography color="inherit" style={{position: 'absolute', top: 4}}>
                            We have successfully detected your city as <b>{searchTerm}</b> and lets see what is
                            happening there.
                        </Typography>
                    </Toolbar>
                </AppBar>
            )
        }
        if (searchTerm && !latitude && !longitude) {
            return (
                <AppBar position="static" color="default" style={{height: 30}}>
                    <Toolbar>
                        <Typography color="inherit" style={{position: 'absolute', top: 4}}>
                            You are searching for : {searchTerm}
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

const mapStateToProps = (state) => {
    console.info("STATE INFO FROM SEARCH INDICATOR: ", state);
    return {state: state};
};
const mapDispatchToProps = {
    resetCoordinates

};
const styledComponent = withStyles(styles)(SearchIndicator);
export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);