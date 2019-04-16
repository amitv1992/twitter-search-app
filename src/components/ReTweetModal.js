import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CardMedia from '@material-ui/core/CardMedia';

function getModalStyle() {
    const measurement = 50;
    return {
        top: `${measurement}%`,
        left: `${measurement}%`,
        transform: `translate(-${measurement}%, -${measurement}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 100,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 2,
        outline: 'none',
    },
});

class ReTweetModal extends React.Component {
    render() {
        const {classes, img, status} = this.props;
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={status}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <CardMedia
                            className={classes.media}
                            image={img.media[0].media_url_https}
                            title=""
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

ReTweetModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReTweetModal);