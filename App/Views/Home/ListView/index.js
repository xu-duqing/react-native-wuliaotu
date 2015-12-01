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

var Item = require('../Item');
var styles = require('./style');

var REQUEST_URL = 'http://jandan.net/?oxwlxojflwblxbsapi=jandan.get_pic_comments&page=';

var items = [];
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
			responseData.comments.forEach(function(item){
				items.push(item);
			});
			console.log(items);
			this.setState({
				dataSource : this.state.dataSource.cloneWithRows(items),
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
			
			responseData.comments.forEach(function(item){
				items.push(item);
			});	

			this.setState({
				dataSource : this.state.dataSource.cloneWithRows(items),
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
				onEndReachedThreshold = {1}
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
			<Item onPress={this._onPress} itemData = {rowData} />
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