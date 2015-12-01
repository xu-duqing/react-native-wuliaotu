/**
 * Create by guang 2015-12-1
 */

'usr strict'

var React = require('react-native');
var {
	Text,
	Image,
	View,
	TouchableHighlight,
} = React;

var styles = require('./style');

var Item = React.createClass({

	getInitialState : function(){
		return{
			loding : false,
		};
	},

	_onPress:function(path){
		this.props.onPress(path);
	},

	render : function(){
		return(
			<TouchableHighlight onPress={() => this._onPress(this.props.itemData.pics[0])}>
				<View style = {styles.item}>
					<View style ={styles.itemTop}>
						<Text style = {styles.authorText}>
							{this.props.itemData.comment_author}
						</Text>
						<Text style = {styles.timeText}>
							{this.props.itemData.comment_date}
						</Text>
					</View>
					{this.contentTextView(this.props.itemData.text_content)}
					<Image 
					style = {styles.image} 
					source={{uri : this.props.itemData.pics[0]}}
					onLoadStart = {() => {this.state.loding = true}}
					onLoadEnd = {() => {this.state.loding = false}}>
						{this.lodingView}
					</Image>
				</View>
			</TouchableHighlight>
			);
	},

	contentTextView : function(text){
		if (text != null
			&& text.length != 0) {
			return(
				<Text style = {styles.itemContentText}>
					{this.props.itemData.text_content}
				</Text>);
		};
		return null;
	},

	lodingView : function(){
		if (this.state.loding) {
			return(
			<Text>
				图片加载中....
			</Text>
			);
		}
		return null;
	},


});

module.exports = Item;