/**
 * Create by guang 2015-12-1
 */

'usr strict'

var React = require('react-native');

module.exports = React.StyleSheet.create({
	item:{
	    borderBottomWidth:1,
	    borderColor:"#ececec",
	    backgroundColor: '#FFFFFF',
	    margin: 10,
  	},

  	itemTop:{
  		flexDirection: 'row',
  		marginTop:10,
  		marginBottom:10,
  	},

  	image : {
  		flex: 1,
  		height: 300,
	    marginLeft : 10,
	    marginRight : 10,
	    marginBottom:10,
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