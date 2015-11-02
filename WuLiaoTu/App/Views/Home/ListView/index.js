/**
 * Create by Guang 2015-11-2
 */

'usr strict'

var React = require('react-native');
var {
	Image,
	Text,
	ListView,
	View,
	TouchableHighlight,
} = React;

var styles = require('./style');

var REQUEST_URL = 'http://jandan.net/?oxwlxojflwblxbsapi=jandan.get_pic_comments';

var TuItem = React.createClass({

	getInitialState : function(){
		return{
			loding : false,
		};
	},

	_onPress:function(path){
		this.props.onPress(path);
	},

	render : function(){

		console.log(this.props.image);
		return(
			<TouchableHighlight onPress={() => this._onPress(this.props.image)}>
				<View style = {styles.item}>
					<Image 
					style = {styles.image} 
					source={{uri : this.props.image}}
					onLoadStart = {() => {this.state.loding = true}}
					onLoadEnd = {() => {this.state.loding = false}}>
						{this.lodingView}
					</Image>
				</View>
			</TouchableHighlight>
			);
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

var TuListView = React.createClass({

	getInitialState : function(){
		return {
			dataSource : new ListView.DataSource({
				rowHasChanged : (row1,row2) => row1 !== row2,
			}),
			loaded : false,
		};
	},

	componentDidMount : function(){
		this.fetchData();
	},

	fetchData : function(){				
		fetch(REQUEST_URL)
		.then((response) => response.json())
		.then((responseData) => {
			console.log(responseData);
			this.setState({
				dataSource : this.state.dataSource.cloneWithRows(responseData.comments),
				loaded : true,
			});

		}).done();
	},

	renderListView : function(data){
		console.log(data.length);
		return (
			<ListView
				dataSource = {data}
				renderRow = {this.renderScoreboard}/>
		);
	},
	renderLodingView : function(){
		return (
				<View style = {styles.loding}>
					<Text>
						数据加载中，请稍后...
					</Text>
				</View>
			);
	},
	renderScoreboard : function(rowData){
		return(
			<TuItem onPress={this._onPress} image = {rowData.pics[0]} />
			);
	},

	_onPress:function(path){
		this.props.onPushDetail(path);
	},

	render : function(){

		if (!this.state.loaded) {
			return this.renderLodingView();
		};
		return this.renderListView(this.state.dataSource);
	}
});

module.exports = TuListView;