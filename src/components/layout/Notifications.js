import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// Mui imports
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavouriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

class Notifications extends Component {
    state = {
        anchorEl: null
    }

    handleOpen = (event) => {
        this.setState({ anchorEl: event.target });
    }

    handleClose = () => {
        this.setState({ anchorEl: null});
    }

    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter(not => !not.read)
            .map(not => not.notificationId);
        this.props.markNotificationsRead(unreadNotificationsIds);
    }

    render(){
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        let notificationIcon;
        if(notifications && notifications.length > 0){
            notifications.filter(not => not.read === false).length > 0
                ? notificationIcon = (
                    <Badge badgeContent={notifications.filter(not => not.read === false).length}
                        color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                ) : (
                    notificationIcon = <NotificationsIcon/>
                )
        } else {
            notificationIcon = <NotificationsIcon/>
        }
        
        let notificationsMarkup = 
            notifications && notifications.length > 0 ? (
                notifications.map(not => {
                    const verb = not.type === 'like' ? 'liked' : 'commented on';
                    const time = dayjs(not.createdAt).fromNow();
                    const iconColor = not.read ? 'primary' : 'secondary';
                    const icon = not.type === 'like' ? (
                        <FavouriteIcon color={iconColor} style={{marginRight: 10}}/>
                    ) : (
                        <ChatIcon color={iconColor} style={{marginRight: 10}}/>
                    )

                    return (
                        
                        <MenuItem key={not.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography component={Link}
                                color="default"
                                variant="body1"
                                to={`/users/${not.recipient}/scream/${not.screamId}`}
                            >
                                {not.sender} {verb} your scream {time}
                            </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    You have no notifications yet
                </MenuItem>
            )

        return(
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}>
                            {notificationIcon}
                        </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);