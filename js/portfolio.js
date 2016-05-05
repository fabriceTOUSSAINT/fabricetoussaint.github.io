

// ReactDOM.render(
// 	<h1>Hello, world!</h1>,
// 	document.getElementById('workContainer')
// 	);



// var RandomMessage = React.createClass({
//   getInitialState: function() {
//     return { message: 'Hello, Universe' };
//   },
//   onClick: function() {
//     var messages = ['Hello, World', 'Hello, Planet', 'Hello, Universe'];
//     var randomMessage = messages[Math.floor((Math.random() * 3))];

//     this.setState({ message: randomMessage });
//   },
//   render: function() {
//     return (
//       <div>
//         <MessageView message={ this.state.message }/>
//         <p><input type="button" onClick={ this.onClick } value="Change Message"/></p>
//       </div>
//     );
//   }
// });

// var MessageView = React.createClass({
//   render: function() {
//     return (
//       <p>{ this.props.message }</p>
//     );
//   }
// });


// ReactDOM.render(
// 	<RandnomMessage />,
// 	document.getElementById('workContainer')

// 	);

var tabList = [
    { 'id': 1, 'num': '1', 'name': 'Hooptee Celebrity Golf', 'initials': 'Ht', 'url': '/ht', 'photo': 'images/port-bg-ht.jpg' },
    { 'id': 2, 'num': '2', 'name': 'Achievements Unlimited', 'initials': 'Au', 'url': '/au', 'photo': 'images/port-bg-au.jpg' },
    { 'id': 3, 'num': '3', 'name': 'Crown City Crossfit', 'initials': 'Cc', 'url': '/cc', 'photo': 'images/port-bg-cc.jpg' },
    { 'id': 4, 'num': '4','name': 'Photography Portfolio', 'initials': 'Ft', 'url': '/ft', 'photo': 'images/port-bg-ht.jpg' }
];

var Tab = React.createClass({
    handleClick: function(e){
        e.preventDefault();
        this.props.handleClick();
    },
    
    render: function(){
        return (
        	<div className={'pt-button col-xs-12 col-sm-3 pt-hover wow fadeIn'}>
              <figure>
                <a onClick={this.handleClick} href={this.props.url} >
              

                <img src={this.props.photo} />

                <div className={'parent'}> 
		              <div className={'title'}>
		                  <div className={'pos'}>
			                  <h5>{this.props.num}</h5>
			                  <h1>{this.props.initials}</h1>
			                  <p>{this.props.name}</p>
		              	  </div>
		              </div>
		              </div>
                </a>
          </figure>
        </div>
        );
    }
});


var Tabs = React.createClass({
    handleClick: function(tab){
        this.props.changeTab(tab);
    },
    
    render: function(){
        return (


<div className={'container pt-wrap'}>
    <div className={'row'}>  
                {this.props.tabList.map(function(tab) {
                    return (
                        <Tab
                            handleClick={this.handleClick.bind(this, tab)}
                            key={tab.id}
                            url={tab.url}
                            name={tab.name}
                            isCurrent={(this.props.currentTab === tab.id)}
                            photo={tab.photo}
                            num={tab.num}
                            initials={tab.initials}
                         />
                    );
                }.bind(this))}
	  </div>
</div>
        );
    }
});

var Content = React.createClass({
    render: function(){
        return(
            <div className="content">
                {this.props.currentTab === 1 ?
                <div className="ht">
                    <img src="http://memorial-hill-dev.flywheelsites.com/wp-content/uploads/2015/10/PT-square.jpg" />
                </div>
                :null}

                {this.props.currentTab === 2 ?
                <div className="au">
                    <img src="http://memorial-hill-dev.flywheelsites.com/wp-content/uploads/2015/10/PT-square-4.jpg" />
                </div>
                :null}

                {this.props.currentTab === 3 ?
                <div className="cc">
                    <img src="http://memorial-hill-dev.flywheelsites.com/wp-content/uploads/2015/10/PT-square-3.jpg" />
                </div>
                :null}
            
                {this.props.currentTab === 4 ?
                <div className="ft">
                    <img src="http://memorial-hill-dev.flywheelsites.com/wp-content/uploads/2015/10/PT-square-2.jpg" />
                </div>
                :null}
            </div>
        );
    }
});

var App = React.createClass({
    getInitialState: function () {        
        return {
            tabList: tabList,
            currentTab: 1
        };
    },

    changeTab: function(tab) {
        this.setState({ currentTab: tab.id });
    },

    render: function(){
        return(
            <div>
            <Content currentTab={this.state.currentTab} />
                <Tabs
                    currentTab={this.state.currentTab}
                    tabList={this.state.tabList}
                    changeTab={this.changeTab}
                />
                
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('workContainer')
);