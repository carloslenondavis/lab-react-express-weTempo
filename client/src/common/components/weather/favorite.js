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
import { Paper, withStyles, Avatar, Grow, Chip } from '@material-ui/core';

const styles = theme => ({
    paper: {
        display: 'flex',        
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
        marginTop: 10        
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

class Favorite extends Component {

	constructor(props){
        super(props);
        	    
		this.state = {
            favorites: []
        };

        this.removeItem = this.removeItem.bind(this);
    }

    componentWillReceiveProps = (nextProps) => {        
        if(this.props !== nextProps) {
            if(nextProps.data.hasOwnProperty('id')){                
                let arrDuplicateHistory = this.state.favorites.filter((el) => el.id ===  nextProps.data.id);
                if(arrDuplicateHistory.length === 0) this.setState({ favorites: [...this.state.favorites, nextProps.data]});
            }           
        }
    }    
    
    removeItem(_item) {        
        const itemPos = this.state.favorites.indexOf(_item);
        this.state.favorites.splice(itemPos, 1);
        this.setState({ favorites: this.state.favorites });
    }

	render() {
        const { classes, viewDetailEvt } = this.props;
        const { favorites } = this.state;

		return (
            <Paper className={classes.paper}>                
                {
                    favorites.length === 0 ?
                    <Chip                                
                        avatar={<Avatar>0</Avatar>}
                        label="None Favorite Added"
                        className={classes.chip}
                    />:                 
                    favorites.map((item) =>
                        <Grow in={true} key={item.id} style={{ transitionDelay: true ? 300 : 50 }}>                            
                            <Chip                                
                                avatar={<Avatar>{item.avatar}</Avatar>}
                                label={item.title}
                                onDelete={() => this.removeItem(item)}
                                onClick={() => viewDetailEvt(item.title)}
                                className={classes.chip}
                            />
                        </Grow>
                    )
                }
            </Paper>          
		);
	}
}

Favorite.propTypes = {
    data: PropTypes.object.isRequired,
    viewDetailEvt: PropTypes.func.isRequired
};

export default withStyles(styles)(Favorite);