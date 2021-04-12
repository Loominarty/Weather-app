import React from 'react';
import ReactDOM from 'react-dom';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { city_input: '' };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
  }
  myChangeHandler = (event) => {
    this.setState({city_input: event.target.value});
  }
  render() {
    return (
        <div className="city_form_container">
      <form>
      <input
        type='text' placeholder="Įveskite miestą" className="city_input" onChange={this.myChangeHandler}/>
      <button type="submit" className="submit_city"> <i class="fas fa-plus"></i> </button>
      </form>
    </div>
    );
  }
}
export default SearchForm;