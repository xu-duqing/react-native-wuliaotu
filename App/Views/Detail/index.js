/**
 * Create by Guang on 2015-10-29
 */

'usr strict'

var React = require('react-native');
var {
	Image,
	ScrollView,
	View,
} = React;

var styles = require('./style');

var Detail = React.createClass({

	render : function(){
		return (
			<Image 
				style = {styles.img}
				resizeMode = {Image.resizeMode.contain}
				source = {{uri: this.props.route.image}}/>
			);
	}
});

module.exports = Detail;