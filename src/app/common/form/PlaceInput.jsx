import React, { Component } from "react";

import { Form } from "semantic-ui-react";
import Script from 'react-load-script';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

class PlaceInput extends Component {
  state = {
    address: "",
    scriptLoaded: false
  };

  handleFormSubmit = event => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  handleScriptLoaded = () => {
    this.setState({ scriptLoaded: true });
  };

  handleChange = address => this.setState({ address });

  render() {
    const {
      input,
      width,
      onSelect,
      placeholder,
      options,
      meta: { touched, error }
    } = this.props;
    return (
      <Form.Field error={touched && !!error} width={width}>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDGNGtwW8w1smXpSkHxO3pM-ehqJeizIA0&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        {this.state.scriptLoaded && (
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={onSelect}
            searchOptions={options}
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
                    input: input,
                    placeholder: placeholder,
                    className: "location-search-input",
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
      </Form.Field>
    );
  }
}

export default PlaceInput;
