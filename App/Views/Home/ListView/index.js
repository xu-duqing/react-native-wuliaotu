/**
 * Create by Guang 2015-11-2
 */

'usr strict'

var React = require('react-native');
// var RefreshableListView = require("react-native-refreshable-listview");
var {
	Image,
	Text,
	ListView,
	View,
	TouchableHighlight,
} = React;

var styles = require('./style');

var REQUEST_URL = 'http://jandan.net/?oxwlxojflwblxbsapi=jandan.get_pic_comments&page=';

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
			isLoading : false,
			isRefresh : false,
			pageIndex : 1,
		};
	},

	componentDidMount : function(){
		this.fetchData();
	},

	fetchData : function(){				
		fetch(REQUEST_URL + this.state.pageIndex)
		.then((response) => response.json())
		.then((responseData) => {
			console.log(responseData);
			this.setState({
				dataSource : this.state.dataSource.cloneWithRows(responseData.comments),
				isLoading : true,
			});

		}).done();
	},

	fetchNextData : function(){
		this.state.pageIndex++;
		this.setState({isRefresh : true});
		console.log(this.state.pageIndex);
		
		fetch(REQUEST_URL + this.state.pageIndex)
		.then((response) => response.json())
		.then((responseData) => {
			console.log(responseData);
			this.setState({
				dataSource : this.state.dataSource.cloneWithRows(responseData.comments),
				isRefresh : false,
			});

		}).done();
	},

	_onEndReached :function(){
		this.fetchNextData();
	},

	footLoadView : function(){
		if (this.state.isRefresh) {
			return (
				<View style = {styles.loding}>
					<Text>
						数据加载中，请稍后...
					</Text>
				</View>);
		}else{
			return null;
		}
	},

	renderListView : function(data){
		console.log(data.length);
		return (
			<ListView
				dataSource = {data}
				renderRow = {this.renderScoreboard}
				onEndReached = {() => this._onEndReached()}
				renderFooter = {() => this.footLoadView()}/>
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

		if (!this.state.isLoading) {
			return this.renderLodingView();
		};
		return this.renderListView(this.state.dataSource);
	}
});

module.exports = TuListView;