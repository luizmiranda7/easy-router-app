var Book = React.createClass({  
  propTypes: {
    title: React.PropTypes.string.isRequired,
    read: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    return {
      title: this.props.title,
      read: this.props.read
    };
  },
  handleChange: function(ev) {
    this.setState({
      read: !this.state.read
    });
  },
  render: function() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td><input type='checkbox' checked={this.state.read} onChange={this.handleChange} /></td>
      </tr>
    );
  }
});