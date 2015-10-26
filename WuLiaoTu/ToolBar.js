/**
 * Created by Guang on 2015-10-19
 */
'usr strict'

var React = require('react-native');
var {
	ToolbarAndroid,
	NavigatorIOS,
	StyleSheet,
	Platform,
	Image,
} = React;

var TuListItem = require('./TuListItem');
var ToolBar = React.createClass({
	render : function(){
		if (Platform.OS === 'android') {
			return (
				<ToolbarAndroid
					style={styles.toolbar}
					title="无聊图"
					titleColor="white"
				/>
				);
		} else {
			return (
				<NavigatorIOS 
					style={styles.toolbar} 
					initialRoute = {{title : '无聊图',component:TuListItem}}
					titleTextColor = "white"
					barTintColor = "black"
				/>
			);
		}
		
	}
});

var styles = StyleSheet.create({
	toolbar: {
	    backgroundColor: '#000000',
	    height: 56,
	  },
});

module.exports = ToolBar;