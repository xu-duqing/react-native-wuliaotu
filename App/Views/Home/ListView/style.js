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

  	itemTop:{
  		flexDirection: 'row',
  		marginTop:10,
  	},

  	image : {
  		flex: 1,
  		height: 300,
	    marginLeft : 10,
	    marginRight : 10,
	    resizeMode: React.Image.resizeMode.contain,
  	},
	
  	loding :{
		flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
   		backgroundColor: '#F5FCFF',
  	},
  	authorText: {
  		color:"black",
  		fontSize: 14,
  		marginLeft: 10,
  	},
  	timeText:{
  		color:"black",
  		fontSize: 12,
  		marginLeft: 10,
  	},
    itemContentText:{
      color:"black",
      fontSize: 12,
      marginLeft: 10,
      marginRight: 10,
    }
});