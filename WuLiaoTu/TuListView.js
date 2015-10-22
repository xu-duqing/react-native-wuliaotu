/**
 * Create by Guang on 2015-10-21
 */

'usr strict'

var React = require("react-native");
var TuItem = require("./TuListItem");

var {
	View,
	StyleSheet,
	Text,
	ListView,
} = React

var REQUEST_URL = 'http://jandan.net/?oxwlxojflwblxbsapi=jandan.get_pic_comments';

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
				<View style = {styles.container}>
					<Text>
						数据加载中，请稍后...
					</Text>
				</View>
			);
	},
	renderScoreboard : function(rowData){
		return(
			<TuItem image = {rowData.pics[0]} />
			);
	},

	render : function(){

		if (!this.state.loaded) {
			return this.renderLodingView();
		};

		return this.renderListView(this.state.dataSource);
	}
});

var styles = StyleSheet.create({

  	container :{
		flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
   		backgroundColor: '#F5FCFF',
  	},

  	list : {

  	},

});

module.exports = TuListView;