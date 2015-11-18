/**
 * Create by Guang 2015-10-29
 */

'usr strict'

var React = require('react-native');
var NavigationBar = require('react-native-navbar');

var {
	Navigator,
	Text,
	View,
	StatusBarIOS,
	Platform,
	ToolbarAndroid,
} = React;

var HomeView = require('./App/Views/Home');
var DetailView = require('./App/Views/Detail');

Platform.OS === 'ios' ? StatusBarIOS.setStyle('default', false): null;

var NavToolbar = React.createClass({

	render :function(){
		if (this.props.navIcon) {
			return (
				<ToolbarAndroid
					style={{backgroundColor: '#3CABDA', height: 56,}}
					title={this.props.route.title}
					navIcon={require('image!ic_arrow_back_white_24dp')}
					onIconClicked={this.props.navigator.pop}
					titleColor='white' />
				)
		};
		return (
			<ToolbarAndroid
				style={{backgroundColor: '#3CABDA', height: 56,}}
				title={this.props.route.title}
				onIconClicked={this.props.navigator.pop}
				titleColor='white' />
			)
	}
});

var WuLiao = React.createClass({

	renderSceneIOS : function(route, navigator){
		var Component = route.component;
		var navBar = route.navigatorBar;

		switch (route.id){
			case "home":
				Component = HomeView;
				navBar = <NavigationBar 
					style={{flex: 1,backgroundColor: '#141414'}} 
					title={{"title":"首页","tintColor":"white"}}
					rightButton={{title:'详情',handler:() => {navigator.push({title:'详情页',id:'detail',image:'http://ww3.sinaimg.cn/mw600/3e045011gw1exmvn7kbdsj20ax0axmxw.jpg'})},tintColor:'#3CABDA'}} />
				break;
			case "detail":
				Component = DetailView;
				navBar = <NavigationBar 
					style={{flex: 1,backgroundColor: '#141414',}} 
					title={{"title":"详情页","tintColor":"white"}}
					leftButton={{title:'返回',handler:() => navigator.pop(),tintColor:'#3CABDA'}} />
				break;
		}
		return (
			<View style={{flex: 1,backgroundColor: 'white'}}>
				{navBar}
				<Component
					navigator = {navigator}
					route = {route}/>
			</View>
			);
	},

	renderSceneAndroid : function(route,navigator){

		var Component = route.component;
		var navBar = route.navigatorBar;

		switch (route.id){
			case "home":
				Component = HomeView;
				navBar = <NavToolbar
					navIcon = {false} 
					navigator = {navigator}
					route = {route} />
				break;
			case "detail":
				Component = DetailView;
				navBar = <NavToolbar 
					navIcon = {true}
					navigator = {navigator}
					route = {route} />
				break;
		}
		return (
			<View style={{flex: 1,backgroundColor: 'white'}}>
				{navBar}
				<Component
					navigator = {navigator}
					route = {route}/>
			</View>
			);
	},

	render : function(){
		var renderScene = Platform.OS === "ios" ? this.renderSceneIOS:this.renderSceneAndroid;

		return (
			<Navigator
				debugOverlay={false}
				initialRoute = {{title : '首页',index:0,id:'home'}}
				renderScene = {renderScene} />
			);
	}
}); 

module.exports = WuLiao;