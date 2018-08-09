/**
 * Class Search
 * @class Search
 * @classdesc Represent the map component
 * @extends Component
 * @author clenon <code@carloslenon.com>
 * 
 */
//core dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Grid, FormControl, Input, InputAdornment, Paper, LinearProgress, Snackbar, Button, Slide, AppBar, Toolbar, Typography } from '@material-ui/core';
import SearhIcon from '@material-ui/icons/Search';
import * as WeatherSVC from './../../../services/weather.svc';
import * as Actions from './../../actions';
import * as FormatUtils from './../../utilities/format';
import * as ConvertUtils from './../../utilities/convert';
//components
import CityWeather from './cityWeather';
import History from './history';
import Favorite from './favorite';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    searchInput: {
        marginTop: 5
    },
    paper: {
        paddingLeft: 6,
        paddingRigth: 6
    },
    textAlignRigth: {
        textAlign: 'right'
    }
});

class Weather extends Component {

	constructor(props){
        super(props);
        	    
		this.state = {            
            weather: {},            
            cityInfo: {},
            showWeatherBox: false,
            isRequest: false,
            openRequestAlertBox: false,
            showHistory: false,                        
            citySearched: {},
            favorite: {}
        };

        this.searchCity = this.searchCity.bind(this);
        this.closeRequestAlertBox = this.closeRequestAlertBox.bind(this);
        this.viewCityWeatherDetail = this.viewCityWeatherDetail.bind(this);
        this.addToFavorite = this.addToFavorite.bind(this);
    }

    componentWillReceiveProps = (nextProps) => {
		if(this.props !== nextProps) {
            this.setState({
                weather: {},            
                cityInfo: {},
                citySearched: {},
                favorite: {}
            });
            
			switch (nextProps.weather.type) {
				case Actions.CITY_WEATHER:
					this.setState({
                        isRequest: false,
                        showWeatherBox: true, 
                        weather: {
                            temp: ConvertUtils.kelvToCels(nextProps.weather.weather.main.temp),
                            pressure: nextProps.weather.weather.main.pressure,
                            humidity: nextProps.weather.weather.main.humidity,
                            temp_min: ConvertUtils.kelvToCels(nextProps.weather.weather.main.temp_min),
                            temp_max: ConvertUtils.kelvToCels(nextProps.weather.weather.main.temp_max),
                            types: nextProps.weather.weather.weather,
                            windSpeed: nextProps.weather.weather.wind.speed,
                        },
                        cityInfo: {
                            id: nextProps.weather.weather.id,
                            coord: {
                                lng: nextProps.weather.weather.coord.lon,
                                lat: nextProps.weather.weather.coord.lat,
                            },
                            name: nextProps.weather.weather.name,
                            country: { 
                                abbr: nextProps.weather.weather.sys.country
                            },
                            date: FormatUtils.formatDate(new Date())
                        },
                        citySearched: {
                            id: nextProps.weather.weather.id,
                            title: nextProps.weather.weather.name,
                            avatar: nextProps.weather.weather.sys.country,
                            subTitle: ConvertUtils.kelvToCels(nextProps.weather.weather.main.temp),
                        }
                    });
                    break;
                default:                    
                    break;
            }
            
            switch (nextProps.request.type) {
                case Actions.REQUEST_ERR:
                    this.setState({ 
                        isRequest: false, 
                        showWeatherBox: false,
                        openRequestAlertBox: true,
                    });
                    break;
                default:                    
                    break;
            }
		}
	}
    
    searchCity (ctx) {
        if(ctx.target.value){
            if(ctx.key && ctx.key === 'Enter') {
                if(this.state.citySearched.hasOwnProperty('title')) {
                    if(this.state.citySearched.title.toLowerCase() !== ctx.target.value.toLowerCase()) {
                        this.props.dispatch({ type: Actions.REQUEST_START });
                        this.setState({ isRequest: true, showWeatherBox: false });
                        this.props.dispatch(WeatherSVC.getWeatherByCityName(ctx.target.value));                
                        ctx.preventDefault();
                    }
                } else {                    
                    this.props.dispatch({ type: Actions.REQUEST_START });
                    this.setState({ isRequest: true, showWeatherBox: false });
                    this.props.dispatch(WeatherSVC.getWeatherByCityName(ctx.target.value));                
                    ctx.preventDefault();
                }
            }
        }        
    }

    closeRequestAlertBox () {
        this.setState({ openRequestAlertBox: false });
    }

    viewCityWeatherDetail(_cityName) {
        this.props.dispatch({ type: Actions.REQUEST_START });
        this.setState({ isRequest: true, showWeatherBox: false });
        this.props.dispatch(WeatherSVC.getWeatherByCityName(_cityName));
    }
    
    addToFavorite() {        
        this.setState({ favorite: this.state.citySearched });
    }

	render() {
        const { classes } = this.props;
        const { cityInfo, weather, showWeatherBox, isRequest, openRequestAlertBox, citySearched, favorite } = this.state;

		return (
			<div>
                <Paper className= { classes.paper }>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth className={classes.margin}>
                                <Input
                                    className={classes.searchInput}
                                    placeholder="Write the city (e.g 'Managua')"
                                    type="search"
                                    onKeyPress= { this.searchCity }                                    
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SearhIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>                
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={openRequestAlertBox}
                    autoHideDuration={2000}
                    onClose={this.closeRequestAlertBox}                        
                    message={<span id="message-id">City not found</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.closeRequestAlertBox}>
                            CLOSE
                        </Button>                            
                    ]}
                    TransitionComponent={Slide}
                />
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={9} lg={10}>
                        <Grid container justify="center" spacing={0}>
                            <Grid item xs={10} sm={10} md={10} lg={10}>
                                <Favorite data= {favorite} viewDetailEvt={this.viewCityWeatherDetail} />
                            </Grid>
                        </Grid>
                        {
                            isRequest ? <LinearProgress color="secondary" /> : null
                        }
                        { 
                            showWeatherBox ? <CityWeather cityInfo={ cityInfo } weather={ weather } addToFavoriteEvt={this.addToFavorite} /> : null
                        } 
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={2}>
                        <AppBar position="static" color="default">
                            <Toolbar>
                                <Typography variant="title" color="inherit">
                                    Histories
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <History data={citySearched} viewDetailEvt={this.viewCityWeatherDetail} />
                    </Grid>
                </Grid>
			</div>
		);
	}
}

Weather.propTypes = {
	classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
        request: state.request,        
        weather: state.weather
	}
}

export default connect(mapStateToProps)(withStyles(styles)(Weather));