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
} = React

var REQUEST_URL = 'http://jandan.net/?oxwlxojflwblxbsapi=jandan.get_pic_comments';

var TuListView = React.createClass({

	getInitialState : function(){
		return {
			wuliaotuData : null,
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
				wuliaotuData : responseData.comments,
			});

		}).done();
	},

	renderListView : function(itemData){
		return (
			<TuItem image = {itemData.pics[0]}/>
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


	render : function(){

		if (!this.state.wuliaotuData) {
			return this.renderLodingView();
		};
		var data = this.state.wuliaotuData[1];
		return this.renderListView(data);
	}
});

var styles = StyleSheet.create({

  	container :{
		flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
   		backgroundColor: '#F5FCFF',
  	},

});

module.exports = TuListView;