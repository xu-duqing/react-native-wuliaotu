/**
 * Create by Guang on 2015-10-29
 */

'usr strict'

var React = require('react-native');
var {
	Image,
} = React;

var styles = require('./style');

var Detail = React.createClass({

	render : function(){
		return (
			<Image 
				style = {styles.container}
				source = {{uri: this.props.route.image}}>
			</Image>
			);
	}
});

module.exports = Detail;