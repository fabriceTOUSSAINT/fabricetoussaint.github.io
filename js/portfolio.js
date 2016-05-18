

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
    { 'id': 4, 'num': '4','name': 'Photography Portfolio', 'initials': 'Ft', 'url': '/ft', 'photo': 'images/port-square.jpg' }
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


<div className={'container pt-wrap'} href={'#works'}>
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
            <div className="container">
            <div className="row">
                {this.props.currentTab === 1 ?
                <div className="ht">

                   <div className="left col-sm-6">
                    <div className="desktop">
                    	<div className="wrapper">
                    		<div className="holder">
		                    	<img src="images/ht-ss.png" />
		                    </div>
		                </div>
		            </div>
		        </div>



                	<div className="col-sm-6 desc">
	                	<h1>Hooptee</h1>
	                	<p>Full redesign & redevelopment of entire site.</p>
	                	<p>set up hosting, paypal transactions, direct purchase button to photographer</p>
	                	<a className="port-btn" href="http://hooptee.com/" target="_blank">Check it out yourself</a>
                	</div>
                </div>
                :null}

                {this.props.currentTab === 2 ?
                <div className="au">
                      <div className="left col-sm-6">
                    <div className="desktop">
                    	<div className="wrapper">
                    		<div className="holder">
		                    	<img src="images/au-ss.png" />
		                    </div>
		                </div>
		            </div>
		        </div>
                <div className="col-sm-6 desc">
                	<h1>Achievements Unlimited</h1>
	                	<p>Full redesign & redevelopment of entire site.</p>
	                	<p>set up hosting, paypal transactions, direct purchase button to photographer</p>
                	<a className="port-btn" href="http://achievementsunlimited.com/" target="_blank">Check it out yourself</a>
                	</div>
                </div>
                :null}

                {this.props.currentTab === 3 ?
                <div className="cc">
                       <div className="left col-sm-6">
                    <div className="desktop">
                    	<div className="wrapper">
                    		<div className="holder">
		                    	<img src="images/cc-ss.png" />
		                    </div>
		                </div>
		            </div>
		        </div>
                <div className="col-sm-6 desc">
                	<h1>CrossFit Crown City</h1>
	                	<p>Front-end/Wordpress</p>
	                	<p>Helped design and developed homepage of site</p>

					<a className="port-btn" href="http://crossfitcrowncity.com/" target="_blank">Check it out yourself</a>
                	</div>
                </div>
                :null}
            
                {this.props.currentTab === 4 ?
                <div className="ft">
                        <div className="left col-sm-6">
                    <div className="desktop">
                    	<div className="wrapper">
                    		<div className="holder">
		                    	<img src="images/photo-port.png" />
		                    </div>
		                </div>
		            </div>
		        </div>
                <div className="col-sm-6 desc">
                	<h1>photography Portfolio</h1>
                	<p>Personal photography portfolio</p>
				<a className="port-btn" href="photoPort.html">Check it out yourself</a>  
				              	</div>
                </div>
                :null}
            </div>
            </div>
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