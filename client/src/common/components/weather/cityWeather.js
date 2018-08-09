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
import classnames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faThermometerEmpty, faSun, faThermometerHalf, faTint, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { 
    withStyles, 
    Grid, 
    Card, 
    CardHeader, 
    CardContent, 
    CardActions, 
    Avatar, 
    IconButton, 
    Collapse, 
    Chip,
    Grow
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Map from './../map/Map';

library.add([faThermometerEmpty, faSun, faThermometerHalf, faTint, faCloud, faMapMarkerAlt]);

const styles = theme => ({    
    button: {
        margin: theme.spacing.unit,
    },
    searchInput: {
        marginTop: 5
    },    
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    grid: {
        padding: 10,
        width: 'auto',
        margin: 0
    },
    counter: {
        fontSize: '1.3em',
        color: '#757575'
    },
    mediumSize: {
        fontSize: '2em'
    },
    bigSize: {
        fontSize: '2.5em'
    },
    textCenter: {
        textAlign: 'center'    
    },
    weatherTempChip: {
        backgroundColor: '#eff7ed',
        color: '#6db558'
    },
    weatherOtherChip: {
        backgroundColor: '#f7f7f7',
        color: '#999999',
    },
    weatherPresureChip: {
        backgroundColor: '#fba574',
        color: '#f3f3f3',
    },
    weatherWindChip: {
        backgroundColor: '#afaeea',
        color: '#f8f7fd',
    },
    weatherHumidityChip: {
        backgroundColor: '#7dbafe',
        color: '#f1f8fc',        
    },
    watherIcon: {
        opacity: '0.4',
        marginTop: 10,
        marginBottom: 5,
    },
    cardContent: {
        padding: 5
    }
});

class CityWeather extends Component {

	constructor(props){
        super(props);
        	    
		this.state = {
            showCityMap: false,
            cityLocation: {}
        };

        this.openCollapseSection = this.openCollapseSection.bind(this);
    }
    
    componentDidMount() {}

    componentWillReceiveProps = (nextProps) => {}    
    
    openCollapseSection() {
        this.setState({ 
            showCityMap: !this.state.showCityMap,
            cityLocation: { lat: this.props.cityInfo.coord.lat, lng: this.props.cityInfo.coord.lng }
        });        
    }

	render() {
        const { classes, cityInfo, weather, addToFavoriteEvt } = this.props;
        const { showCityMap, cityLocation } = this.state;

		return (
            <Grid container spacing={16} className={ classes.grid }>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Grow in={true} style={{ transitionDelay: true ? 300 : 50 }}>
                        <Card raised>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" className={ classes.avatar }>
                                        { cityInfo.country.abbr }
                                    </Avatar>
                                }
                                title={ cityInfo.name }
                                subheader= { cityInfo.date }
                            />
                            <CardContent className={classes.cardContent}>
                                <Grid container spacing={0}>
                                    <Grid item xs={7} sm={7}>
                                        <div className={classes.counter}>                                        
                                            <span className={classes.bigSize}>&nbsp;{ weather.temp }&deg;</span>
                                        </div>
                                        <Chip
                                            className= {classes.weatherTempChip}                                       
                                            label={ weather.temp_min + ' - ' + weather.temp_max }
                                        />                                    
                                    </Grid>
                                    <Grid item xs={5} sm={5} className={classes.textCenter}>
                                        <FontAwesomeIcon className={classes.watherIcon} size="7x" icon="cloud" />
                                        {
                                            weather.types.map((type) => 
                                                <Chip
                                                    key={ type.id }
                                                    className= { classes.weatherOtherChip }
                                                    label={ type.main + ' / ' + type.description }
                                                />
                                            )
                                        }
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={4} sm={4} className={classes.textCenter}>
                                                <div><FontAwesomeIcon className={classes.watherIcon} color="#fc9153" size="4x" icon="thermometer-half" /></div>
                                                <Chip                                            
                                                    className= { classes.weatherPresureChip }
                                                    label={ 'Presure / ' + weather.pressure + 'hpa' }
                                                />
                                            </Grid>
                                            <Grid item xs={4} sm={4} className={classes.textCenter}>
                                                <div><FontAwesomeIcon className={classes.watherIcon} color="#7dbafe" size="4x" icon="tint" /></div>
                                                <Chip                                            
                                                    className= { classes.weatherHumidityChip }
                                                    label={ 'Humidity / ' + weather.humidity + '%' }
                                                />
                                            </Grid>
                                            <Grid item xs={4} sm={4} className={classes.textCenter}>
                                                <div><FontAwesomeIcon className={classes.watherIcon} color="#afaeea" size="4x" icon="sun" /></div>
                                                <Chip                                                
                                                    className= { classes.weatherWindChip }
                                                    label={ 'Wind / ' + weather.windSpeed + 'm/s' }                                                
                                                />                                            
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>                            
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton aria-label="Add to favorites" onClick={addToFavoriteEvt}>
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton
                                    className={classnames(classes.expand, {
                                        [classes.expandOpen]: showCityMap,
                                    })}
                                    onClick={this.openCollapseSection}
                                    aria-expanded={showCityMap}
                                    aria-label="Show Map"
                                    >
                                    <FontAwesomeIcon icon="map-marker-alt" />
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse in={showCityMap} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Map cityMapPosition= { cityLocation } />                            
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grow>
                </Grid>
            </Grid>
			
		);
	}
}

CityWeather.propTypes = {
    classes: PropTypes.object.isRequired,
    cityInfo: PropTypes.object.isRequired,
    weather: PropTypes.object.isRequired,
    addToFavoriteEvt: PropTypes.func.isRequired
};

export default withStyles(styles)(CityWeather);