/**
 * Class Header
 * @class Header
 * @classdesc Represent the map component
 * @extends Component
 * @author clenon <code@carloslenon.com>
 * 
 */
//core dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles, Drawer, List, ListItem, ListItemText, Avatar, Zoom, ListItemSecondaryAction, IconButton } from '@material-ui/core';

library.add([faCloud]);

const styles = theme => ({
    drawerPaper: {
        position: 'relative',        
    }
});

class History extends Component {

	constructor(props){
        super(props);
        	    
		this.state = {
            histories: []
        };

        this.removeItem = this.removeItem.bind(this);
    }

    componentWillReceiveProps = (nextProps) => {        
        if(this.props !== nextProps) {
            this.setState({ 
                toogleSideBar: !this.state.toogleSideBar
            });            
            
            if(nextProps.data.hasOwnProperty('id')){                
                let arrDuplicateHistory = this.state.histories.filter((el) => el.id ===  nextProps.data.id);
                if(arrDuplicateHistory.length === 0) this.setState({ histories: [...this.state.histories, nextProps.data]});
            }
        }
    }

    removeItem(_item) {
        this.setState(prevState => ({ histories: prevState.histories.filter(item => item !== _item)}));
    }

	render() {
        const { classes, viewDetailEvt } = this.props;
        const { histories } = this.state;

        let arrHistories = histories;
        if(arrHistories.length > 5) arrHistories.shift();

		return (
            <Drawer
                classes={{
                    paper: classes.drawerPaper
                }}
                anchor="right"
                variant="permanent">
                    <List
                    component="nav">
                        { 
                            arrHistories.length === 0 ? 
                                <ListItem>
                                    <Avatar>0</Avatar>
                                    <ListItemText primary="History" secondary="No History Added" />
                                </ListItem> :
                                arrHistories.map((item) =>
                                    <Zoom in={true} key={item.id} style={{ transitionDelay: true ? 300 : 50 }}>
                                        <ListItem 
                                            button                                            
                                            onClick={() => viewDetailEvt(item.title)}>
                                            <Avatar>
                                                {item.avatar}
                                            </Avatar>
                                            <ListItemText primary={item.title} secondary={item.subTitle} />
                                            <ListItemSecondaryAction>
                                                <IconButton 
                                                    aria-label="Remove" 
                                                    color="secondary"
                                                    onClick={() => this.removeItem(item)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </Zoom>
                                )
                        }
                    </List>
            </Drawer>            
		);
	}
}

History.propTypes = {    
    data: PropTypes.object.isRequired,
    viewDetailEvt: PropTypes.func.isRequired
};

export default withStyles(styles)(History);