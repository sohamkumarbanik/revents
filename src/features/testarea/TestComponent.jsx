import React, { Component } from "react";
import { connect } from "react-redux";

import { incrementAsync, decrementAsync } from "./testActions";
import { openModal } from '../modals/modalActions';
import { Button } from "semantic-ui-react";
// import Script from "react-load-script";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

const mapStateToProps = state => ({
  data: state.test.data,
  loading: state.test.loading
});

const actions = {
  incrementAsync,
  decrementAsync,
  openModal
};

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    address: "",
    scriptLoaded: false
  };

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  handleChange = address => this.setState({ address });

  render() {
    const { incrementAsync, decrementAsync, data, openModal, loading } = this.props;
    console.log(loading);
    return (
      <div>
        {/* <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDGNGtwW8w1smXpSkHxO3pM-ehqJeizIA0&libraries=places"
          onLoad={this.handleScriptLoad}
        /> */}
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button loading={loading} onClick={incrementAsync} color="green" content="Increment" />
        <Button loading={loading} onClick={decrementAsync} color="red" content="Decrement" />
        <Button onClick={() => openModal('TestModal', {data: 43})} color="teal" content="Open Modal" />
        <br />
        <br />
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && (
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className: "location-search-input"
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          )}
          <button type="submit">Submit</button>
        </form>
        
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(TestComponent);
