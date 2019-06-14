import { updateTheme } from './../actions/index';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../firebase.js';
import Buttons from './Buttons';
import FileUploader from 'react-firebase-file-uploader';

class ThemeSettings extends Component {
  state = {
    uid: '',
    primaryColor: '',
    secondaryColor: '',
    buttonType: '',
    backgroundType: '',
    backgroundColor: '',
    gradientDirection: 'to right',
    gradientStartColor: 'red',
    gradientStopColor: 'yellow',
    backgroundImage: '',
    bgiUploading: false,
    bgiProgress: false,
    bgiError: false,
    themeNotUpdated: false
  };

  componentDidMount() {
    const user = { ...this.props.user };
    this.setState({ ...user });
  }

  handleInput = event => {
    if (
      event.target.name === 'primaryColor' ||
      event.target.name === 'secondaryColor' ||
      event.target.name === 'buttonType' ||
      event.target.name === 'backgroundType' ||
      event.target.name === 'backgroundColor' ||
      event.target.name.includes('gradient') ||
      event.target.name === 'backgroundImage'
    ) {
      this.setState({ [event.target.name]: event.target.value, themeNotUpdated: true });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  handleCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  updateUser = () => {
    if (this.state.userNotUpdated) {
      const { uid, username, avatar, name } = this.state;
      this.props.updateUser(uid, { username, avatar, name });
      this.setState({ userNotUpdated: false });
    }
  };

  handlebgiUploadStart = () => this.setState({ bgiUploading: true, bgiProgress: 0, bgiError: false });

  handlebgiProgress = bgiProgress => this.setState({ bgiProgress });

  handlebgiUploadError = error => {
    this.setState({ bgiUploading: false, bgiError: true });
  };

  handlebgiUploadSuccess = filename => {
    this.setState({
      bgiProgress: 100,
      bgiUploading: false,
      bgiError: false
    });
    firebase
      .storage()
      .ref('backgrounds')
      .child(filename)
      .getDownloadURL()
      .then(backgroundImage => this.setState({ backgroundImage, themeNotUpdated: true }));
  };

  lightOrDark(color) {
    var r, g, b, hsp;
    if (color.match(/^rgb/)) {
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
      r = color[1];
      g = color[2];
      b = color[3];
    } else {
      color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
      r = color >> 16;
      g = (color >> 8) & 255;
      b = color & 255;
    }
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    if (hsp > 127.5) {
      return 'light';
    } else {
      return 'dark';
    }
  }

  updateTheme = () => {
    const { uid, primaryColor, buttonType,
      backgroundType, backgroundColor, backgroundImage, gradientDirection, gradientStartColor, gradientStopColor
    } = this.state; //prettier-ignore
    let secondaryColor = '#fff';
    const lightordark = this.lightOrDark(primaryColor);
    if (lightordark === 'light') {
      secondaryColor = '#000';
    }
    this.props.updateTheme(uid, {
      primaryColor,
      secondaryColor,
      buttonType,
      backgroundType,
      backgroundColor,
      gradientDirection,
      gradientStartColor,
      gradientStopColor,
      backgroundImage
    });
    this.setState({ themeNotUpdated: false, secondaryColor });
  };

  render() {
    return (
      <>
        <div className='card'>
          <div className='card-title'>
            <h2>Theming options</h2>
          </div>
          <div className='card-body'>
            <div className='input-group'>
              <label htmlFor='primaryColor'>Accent Color: </label>
              <input
                type='text'
                name='primaryColor'
                className='form-input limit-width'
                placeholder='Accent color (in hex, rgb, rgba, hsl)'
                defaultValue={this.state.primaryColor}
                onChange={this.handleInput}
              />
            </div>

            <div className='input-group'>
              <label htmlFor='buttonType'>Button Type: </label>
              <select
                name='buttonType'
                onChange={this.handleInput}
                value={this.state.buttonType}
                className='form-input limit-width'
              >
                <option value='solid'>Solid</option>
                <option value='outline'>Outline</option>
                <option value='round-solid'>Round solid</option>
                <option value='round-outline'>Round outline</option>
                <option value='semitransparent-white'>Semitransparent white</option>
                <option value='semitransparent-black'>Semitransparent black</option>
                <option value='effect-btn type1'>Effect Type 1</option>
                <option value='effect-btn type2'>Effect Type 2</option>
                <option value='effect-btn type3'>Effect Type 3</option>
                <option value='btn-bg-effect from-top'>Background down from top</option>
                <option value='btn-bg-effect from-middle'>Background down from middle</option>
                <option value='btn-bg-effect from-bottom'>Background down from bottom</option>
              </select>
            </div>

            <div className='input-group'>
              <label htmlFor='backgroundType'>Background Type: </label>
              <select
                name='backgroundType'
                onChange={this.handleInput}
                value={this.state.backgroundType}
                className='form-input limit-width'
              >
                <option value='color'>Color</option>
                <option value='gradient'>Gradient</option>
                <option value='image'>Image</option>
              </select>
            </div>

            {this.state.backgroundType === 'color' && (
              <div className='input-group'>
                <label htmlFor='backgroundColor'>Background Color: </label>
                <input
                  type='text'
                  name='backgroundColor'
                  className='form-input limit-width'
                  placeholder='Background color (in hex, rgb, rgba, hsl)'
                  defaultValue={this.state.backgroundColor}
                  onChange={this.handleInput}
                />
              </div>
            )}

            {this.state.backgroundType === 'gradient' && (
              <>
                <div className='input-group'>
                  <label>Gradient Direction: </label>
                  <select
                    name='gradientDirection'
                    onChange={this.handleInput}
                    value={this.state.gradientDirection}
                    className='form-input limit-width'
                  >
                    <option value='to left'>To left</option>
                    <option value='to right'>To right</option>
                    <option value='to top'>To top</option>
                    <option value='to bottom'>To bottom</option>
                  </select>
                </div>
                <div className='input-group'>
                  <label>Gradient Start Color: </label>
                  <input
                    type='text'
                    name='gradientStartColor'
                    className='form-input limit-width'
                    placeholder='Start color (in hex, rgb, rgba, hsl)'
                    defaultValue={this.state.gradientStartColor}
                    onChange={this.handleInput}
                  />
                </div>

                <div className='input-group'>
                  <label>Gradient Stop Color: </label>
                  <input
                    type='text'
                    name='gradientStopColor'
                    className='form-input limit-width'
                    placeholder='End color (in hex, rgb, rgba, hsl)'
                    defaultValue={this.state.gradientStopColor}
                    onChange={this.handleInput}
                  />
                </div>
              </>
            )}

            {this.state.backgroundType === 'image' && (
              <div className='avatar-settings'>
                <img src={this.state.backgroundImage} className='bgimg' alt='user' />
                <div className='edit'>
                  <label htmlFor='background'>Background Image: </label>
                  <div className='uploadButtonWrapper'>
                    <button>Upload new image</button>
                    <FileUploader
                      accept='image/png,image/jpeg'
                      name='background'
                      storageRef={firebase.storage().ref('backgrounds')}
                      onUploadStart={this.handlebgiUploadStart}
                      onUploadError={this.handlebgiUploadError}
                      onUploadSuccess={this.handlebgiUploadSuccess}
                      onProgress={this.handlebgiProgress}
                      randomizeFilename
                    />
                  </div>
                  {this.state.bgiUploading ? (
                    <div className='progress'>
                      <div className='progress-bar' style={{ width: this.state.bgiProgress + '%' }} />
                    </div>
                  ) : null}
                  {this.state.bgiError ? <div className='error-text'>Cannot upload image</div> : null}
                </div>
              </div>
            )}
          </div>
          <div className='card-action'>
            {this.state.themeNotUpdated && (
              <button className='primary' onClick={this.updateTheme}>
                Update theme
              </button>
            )}
          </div>
        </div>

        <div
          className='card demo user-profile'
          style={{
            backgroundColor: this.state.backgroundType === 'color' && this.state.backgroundColor,
            background:
              this.state.backgroundType === 'gradient' &&
              'linear-gradient(' +
                this.state.gradientDirection +
                ', ' +
                this.state.gradientStartColor +
                ', ' +
                this.state.gradientStopColor +
                ')',
            backgroundImage:
              this.state.backgroundType === 'image' && 'url("' + this.state.backgroundImage + '")',
            '--primary-color': this.state.primaryColor,
            '--secondary-color': this.state.secondaryColor,
            '--shadow-color': this.state.shadowColor
          }}
        >
          <div className='user'>
            <img src={this.state.avatar} alt='user' />
            <h2>{this.state.name}</h2>
          </div>
          <div className='card-body'>
            <Buttons
              link={{
                animation: 'none',
                created: '2019-05-04 20:14:06',
                redirect: '',
                shown: true,
                thumbnail: '',
                title: 'Demo button'
              }}
              buttonType={this.state.buttonType}
            />
            <Buttons
              link={{
                animation: 'none',
                created: '2019-05-04 20:14:06',
                redirect: '',
                shown: true,
                thumbnail:
                  'https://user-images.githubusercontent.com/101482/29592647-40da86ca-875a-11e7-8bc3-941700b0a323.png',
                title: 'Demo button with image'
              }}
              buttonType={this.state.buttonType}
            />
            <Buttons
              link={{
                animation: 'none',
                created: '2019-05-04 20:14:06',
                redirect: '',
                shown: true,
                thumbnail: '',
                title: 'A Demo button with a very very long text for gossippy titles'
              }}
              buttonType={this.state.buttonType}
            />

            <div className='user-socialLinks' style={{ marginTop: '0px' }}>
              <a className='user-social' href='/admin/settings'>
                <i className='flaticon facebook' />
              </a>
              <a className='user-social' href='/admin/settings'>
                <i className='flaticon twitter' />
              </a>
              <a className='user-social' href='/admin/settings'>
                <i className='flaticon reddit' />
              </a>
              <a className='user-social' href='/admin/settings'>
                <i className='flaticon whatsapp' />
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateTheme: (uid, theme) => dispatch(updateTheme(uid, theme))
  };
};

export default connect(
  ({ user }) => ({
    user
  }),
  mapDispatchToProps
)(ThemeSettings);
