import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { modifySearchQuery } from "../actions";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});

function updateSearchQuery(props, e) {
    if (e.key === 'Enter') {
        let sanitizeUserInput = e.target.value.trim().toLowerCase();
        if (sanitizeUserInput) {
            props.modifySearchQuery(sanitizeUserInput);
        }
    }
}

function homepageClick(props, e) {
    if (e.type === 'click') {
        props.modifySearchQuery(props.state.appDataReducer.userCity);
    }
}

function SearchBar(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography style={{cursor: 'pointer'}} className={classes.title} variant="h6" color="inherit"
                                noWrap onClick={ref => homepageClick(props, ref)}>
                        Twitter Search App
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onKeyDown={ref => updateSearchQuery(props, ref)}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    console.info("STATE INFO FROM SEARCH BAR : ", state);
    return {state: state};
};
const mapDispatchToProps = {
    modifySearchQuery,
};
const styledComponent = withStyles(styles)(SearchBar);
export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);