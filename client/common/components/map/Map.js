/**
 * Class Map
 * @class Map
 * @classdesc Represent the map component
 * @extends Component
 * @author clenon <code@carloslenon.com>
 * 
 */
//core dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from "recompose";
import { 
	GoogleMap, 
	Marker,
	withScriptjs,
	withGoogleMap
} from "react-google-maps";

class Map extends Component {

	constructor(props){
        super(props);
        	    
	    this.state = {};
	}

	render() {		
		const MapComponent = compose(
			withProps({
					/**
					 * Note: create and replace your own key in the Google console.
					 * https://console.developers.google.com/apis/dashboard
					 * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
					 */
					googleMapURL:
					"https://maps.googleapis.com/maps/api/js?key=AIzaSyASUvL6uOogY-NKMnphBrUCalHO9p_-5Yg&v=3.exp&libraries=geometry,drawing,places",
					loadingElement: <div style={{ height: `100%` }} />,
					containerElement: <div style={{ height: `100%` }} />,
					mapElement: <div style={{ height: `300px` }} />
				}),
				withScriptjs,
				withGoogleMap
		  )(props => (
				<GoogleMap defaultZoom={12} defaultCenter={{ lat: props.position.lat, lng: props.position.lng }}>
					{props.isMarkerShown && (
					<Marker position={{ lat: props.position.lat, lng: props.position.lng }} />
					)}
				</GoogleMap>
		  ));

		return (
			<div>
				<MapComponent isMarkerShown position={this.props.cityMapPosition} />
			</div>
		);
	}
}

Map.propTypes = {	
	cityMapPosition: PropTypes.object.isRequired
};

export default Map;