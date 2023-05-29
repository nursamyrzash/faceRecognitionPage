import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import './App.css';
import ParticlesBg from 'particles-bg';
// https://samples.clarifai.com/metro-north.jpg

const returnClarifaiRequestOptions = (imageUrl) => {

  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": "k3eec8e6t828",
      "app_id": "test"
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + '9ebcc9ff80f84ef3a5ba793b7687fd87'
      },
      body: raw
  };

  return requestOptions;
}



// const particlesOptions = {
//   particles: {
//     numbers: {
//       values: 30,
//       density: {
//         enable: true,
//         value_area: 800
//       }
//     }
//   }
// }

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    const clarifyface = JSON.parse(data,null,2).outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width,height);
    return {
      leftCol: clarifyface.left_col * width,
      topRow: clarifyface.top_row * height,
      rightCol: width - (clarifyface.right_col * width),
      bottomRow: height - (clarifyface.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}) 
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, returnClarifaiRequestOptions(this.state.input))
    .then(response => response.text())
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
  }
  

  render(){
    return (
      <div className="App">
        <ParticlesBg type='square'
          bg={true}
          />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit = {this.onButtonSubmit}
          />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
