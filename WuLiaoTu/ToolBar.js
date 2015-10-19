/**
 * 
 * @name guang
 */
'usr strict'

var React = require('react-native');
var {
	ToolbarAndroid,
	StyleSheet,
	Image,
} = React;

var ToolBar = React.createClass({
	render : function(){
		return (
			<ToolbarAndroid
				style={styles.toolbar}
				title="无聊图"
				titleColor="white"
				// navIcon={require('image!ic_launcher')}
			/>
			);
	}
});

var styles = StyleSheet.create({
	toolbar: {
	    backgroundColor: '#000000',
	    height: 56,
	  },
});

module.exports = ToolBar;