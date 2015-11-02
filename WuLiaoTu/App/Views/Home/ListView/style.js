/**
 * Create by Guang 2015-11-2
 */

'usr strict'

var React = require('react-native');

module.exports = React.StyleSheet.create({
	item:{
	    borderBottomWidth:1,
	    borderColor:"#ececec",
	    backgroundColor: '#F5FCFF',
  	},

  	image : {
  		flex: 1,
  		height: 300,
	    margin : 10,
	    resizeMode: React.Image.resizeMode.contain,
  	},
	
  	loding :{
		flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
   		backgroundColor: '#F5FCFF',
  	},
});