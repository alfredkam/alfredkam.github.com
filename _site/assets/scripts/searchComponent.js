    /** @jsx React.DOM */
    var Search = React.createClass({
        handleClick : function () {
            document.getElementById('searchSpace').innerHTML = '';
        },
        render : function () {
            return (
                <div className='row'>
                    <div className='col-md-12'>
                        <input className='col-sm-6 col-sm-offset-3' /><i onClick={this.handleClick} className='icon-cancel'></i>
                    </div>
                </div>
            );
        }
    });

    var Component = React.createClass({
        getInitialState : function () {
            return {
                hidden : true
            };
        },
        componentWillMount : function () {
            this.data = [];
            this.getData();
        },
        getData : function () {
            var self = this;
            $.ajax({
                async : true,
                url : 'search.json'
            }).done(function (data) {
                self.data = data;
            });
        },
        handleClick : function () {
            this.setState({
                hidden : false
            });

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