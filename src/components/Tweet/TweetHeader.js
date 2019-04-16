import React from "react";
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

function TweetHeader(props) {
    const {tweet, classes} = props;
    return (
        <CardHeader
            avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                    <img className="avatar" alt="" src={tweet.user.profile_image_url_https}/>
                </Avatar>
            }
            action={
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            }
            title={<div><span className="fullname">{tweet.user.name}</span><span
                className="userhandler">{` @${tweet.user.screen_name}`}</span></div>}
            subheader={tweet.created_at}
        >
        </CardHeader>
    )
}

export default TweetHeader
