import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

// Mui imports 
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,

    },
    image: {
        minWidth:200,
        objectFit: 'cover'
    },
    content: {
        padding: 25
    }

}

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime)
        const { classes, scream : { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount} } = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile image" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography color="primary" variant="h5" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography> 
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography> 
                    <Typography variant="body1">{body}</Typography> 
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Scream)
