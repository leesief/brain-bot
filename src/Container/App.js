import React, {Component} from 'react';
import Navigation from '../Components/Nav/Navigation';
import Logo from '../Components/Logo/Logo';
import Register from '../Components/Register/Register'
import FaceRecognition from '../Components/FaceRecognition/FaceRecognition';
import ImageLinkForm from '../Components/ImageLinkForm/ImageLinkForm';
import Rank from '../Components/Rank/Rank';
import SignIn from '../Components/SignIn/SignIn';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css'

const particleOption = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: 'a43809e05d41446f86adfc4d83e98b09'
})

class App extends Component {
  constructor(){
    super()
    this.wrapper = React.createRef()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calcFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width)
    const height = Number(image.height)
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = box => {
    this.setState({box: box})
  }

onInputChange = (event) => {
  this.setState({
    input: event.target.value
  });
  console.log(this.state.input)
}

onButtonSubmit = () =>{
  this.setState({
    imageUrl: this.state.input
  });
  app.models
      .initModel({
        id: Clarifai.FACE_DETECT_MODEL,
      })
      .then((faceDetectModel) => {
        return faceDetectModel.predict(
         this.state.input
        );
      }).then((response) =>this.displayFaceBox(this.calcFaceLocation(response)));
      
}

onRouteChange = (route) =>{
  if(route === 'signout'){

    this.setState({
      isSignedIn: false
    })
  }
   else if(route === 'home'){
    this.setState({
      isSignedIn: true
    })
  }

  this.setState({
    route: route,
  })
}

  render() {
    const {isSignedIn, box, imageUrl, route} = this.state
    return (
      <div className='App'>
        <Particles  className='particles' 
        params={particleOption}/>
        <Navigation isSignedIn = {isSignedIn} onRouteChange={this.onRouteChange}/>

        {route === 'home' ? 
        <div>
          <Logo />
          <Rank />
            <ImageLinkForm onInputChange = {this.onInputChange}
             onButtonSubmit = {this.onButtonSubmit}/>
            <FaceRecognition box = {box}
             imageUrl={imageUrl}/>
         </div>
         :(
           route === 'signin'
         ? <SignIn onRouteChange ={this.onRouteChange}/>
         :<Register onRouteChange ={this.onRouteChange}/>
           )
        } 
      </div>
    )
  }
}


export default App;
