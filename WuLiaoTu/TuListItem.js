/**
 * Create by Guang on 2015-10-20
 */

'usr strict'

var React = require('react-native');
var {
	View,
	StyleSheet,
	Image,
	Text,
} = React;


var TuItem = React.createClass({

	render : function(){

		console.log(this.props.image);
		return(
			<View style = {styles.item}>
				<Image style = {styles.image}
				source={{uri : this.props.image}}/>
			</View>
			);
	},



});

var styles = StyleSheet.create({

	item:{
	    borderBottomWidth:1,
	    borderColor:"#ececec",
	    backgroundColor: '#F5FCFF',
  	},

  	image : {
  		flex: 1,
  		height: 300,
	    margin : 10,
	    resizeMode: Image.resizeMode.contain,
  	},

  	container :{
		flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
   		backgroundColor: '#F5FCFF',
  	},

});

module.exports = TuItem;