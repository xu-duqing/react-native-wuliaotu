/**
 * Create by Guang on 2015-10-29
 */

'usr strict'

var React = require('react-native');

var {
	View,
} = React;

var ListView = require('./ListView');
var styles = require('./style');

var Home = React.createClass({

	render : function(){
		return (
			<View style = {styles.container}>
				<ListView onPushDetail = {this._onPushDetail}/>
			</View>
			);
	},

	_onPushDetail : function(path){
		this.props.navigator.push({title:'图片详情',id:'detail',image:path});
	},

});

module.exports = Home;