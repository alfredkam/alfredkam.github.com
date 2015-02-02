    /** @jsx React.DOM */
    var Search = React.createClass({
        getInitialState : function () {
            return {
                hidden : true,
                data : []
            };
        },
        handleClick : function () {
            document.getElementById('searchSpace').innerHTML = '';
        },
        capture : function (e) {
            var key = e.target.value;
            var arr = [];
            for (var i in this.props.data) {
                // console.log(this.props.data[i].title.match(key))
                if(this.props.data[i].title.toLowerCase().match(key)) {
                    arr.push(this.props.data[i]);
                    continue;
                }
                for(var j in this.props.data[i].tags) {
                    if(this.props.data[i].tags[j].toLowerCase().match(key)) {
                        arr.push(this.props.data[i]);
                        break;
                    }
                }
            }
            this.arr = arr;

            this.setState({
                data : arr,
                hidden : false
            });
        },
        render : function () {
            var result = _.map(this.arr, function (data) {
                return (
                    <div className='results'>
                        <a href={'http://'+window.location.host+data.href}>{data.title}</a>
                    </div>
                );
            });
            return (
                <div className='row'>
                    <div className='col-xs-12'>
                        <input onChange={this.capture} className='col-xs-6 col-xs-offset-3' /><i onClick={this.handleClick} className='icon-cancel'></i>
                    </div>
                    <div className='col-xs-6 col-xs-offset-3 resultWrapper'>
                        {this.state.hidden == false && result == ''? 'search not found' : result}
                    </div>
                </div>
            );
        }
    });

    var Component = React.createClass({
        componentWillMount : function () {
            this.data = [];
            this.getData();
        },
        getData : function () {
            var self = this;
            $.ajax({
                async : true,
                url : '/search.json'
            }).done(function (data) {
                self.data = data;
            });
        },
        handleClick : function () {
            React.renderComponent(
                <Search data={this.data}/>,
                document.getElementById('searchSpace')
            );
        },
        render : function () {
            return (
                <div onClick={this.handleClick} className='searchBtn'>
                    <i className='icon-search'></i><span>Search</span>
                </div>
            );
        }
    });

    React.renderComponent(
        <Component />,
        document.getElementById('searchComponent')
    );