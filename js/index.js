var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 1. Create a github Repo or Click 'Fork' from the top menu and generate your own JSFiddle link. 
// Be sure to click 'Update' when your work is done.

// 2. Create a Search Component for entering an Artist

// 3. On Search, make an api call to iTunes API to fetch the information about the artist
// API URL: https://itunes.apple.com/search?term=${ARTIST_NAME}

// 4. When the Search button is clicked, make a call to the API and display the list of albums, including the album name and album cover inside #albums-container in a grid. Use any CSS technique you are comfortable with (Note: The API will return a list of albums based on the search result. Use your skills to find out what the iTunes API data structure looks like and extract the relevant data from it).

// 5. Style the page to the best of the ability to make the UI look clean and presentable

// 6. Checkin or Click Update from the top Menu and save the link

var Application = function (_React$Component) {
  _inherits(Application, _React$Component);

  function Application(props) {
    _classCallCheck(this, Application);

    var _this = _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this, props));

    _this.state = {
      searchedArtist: '',
      albumList: null
    };
    return _this;
  }

  _createClass(Application, [{
    key: 'search',
    value: function search() {
      var _this2 = this;

      var ARTIST_NAME = this.state.searchedArtist;
      var FETCH_URL = 'https://itunes.apple.com/search?term=' + ARTIST_NAME + '&entity=album';
      fetch(FETCH_URL, {
        method: 'GET'
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        var albumArray = json.results;
        _this2.setState({ albumList: albumArray });
      });
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      if (this.state.albumList && this.state.searchedArtist !== '') {
        var albums = this.state.albumList;
        return React.createElement(
          'div',
          null,
          albums.map(this.getAlbums)
        );
      }
    }
  }, {
    key: 'getAlbums',
    value: function getAlbums(data) {
      var albumName = data.collectionName.length > 20 ? data.collectionName.substr(0, 17) + '...' : '' + data.collectionName;

      return React.createElement(
        'div',
        { className: 'album-grid' },
        React.createElement(
          'div',
          { className: 'album-name' },
          albumName
        ),
        React.createElement('img', { src: data.artworkUrl100, className: 'album-img', alt: 'Album Image' })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'searchbar' },
          React.createElement('input', {
            placeholder: 'Search for an Artist',
            value: this.state.searchedArtist,
            onChange: function onChange(event) {
              _this3.setState({ searchedArtist: event.target.value });
            },
            onKeyPress: function onKeyPress(event) {
              if (event.key === 'Enter') {
                _this3.search();
              }
            }
          })
        ),
        React.createElement(
          'button',
          { type: 'submit',
            onClick: function onClick() {
              return _this3.search();
            } },
          ' Search'
        ),
        this.renderContent()
      );
    }
  }]);

  return Application;
}(React.Component);

React.render(React.createElement(Application, null), document.getElementById('albums-container'));