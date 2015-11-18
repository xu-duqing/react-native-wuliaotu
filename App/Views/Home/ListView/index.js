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

					<Text style = {styles.itemContentText}>
						{this.props.itemData.text_content}
					</Text>
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
			<TuItem onPress={this._onPress} itemData = {rowData} />
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