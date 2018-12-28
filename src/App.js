import React, { Component } from 'react';
import logo from './logo.svg';
import { Container, Header, Icon, Segment, Button } from 'semantic-ui-react'
import './App.css';

class App extends Component {
  render() {
    return (

      <React.Fragment>
        <Header attached="top" inverted="true" size="large">Video Thumbnailer</Header>
        <Container>

          <Segment placeholder>
            <Header icon>
              <Icon name='video file outline' />
              Upload short video to trigger thumbnails generation in AWS Lambda.
              <br/>
              When the thumbnails are generated, they will appear here.
            </Header>
            <Button primary>Upload (short) video</Button>
          </Segment>
          
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
