import React, { Component } from 'react';
import { Container, Header, Icon, Segment, Button, Input, SemanticICONS } from 'semantic-ui-react'
import './App.css';

const iconName = (('video file outline') as SemanticICONS);

class App extends Component {
  handleFileChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (

      <React.Fragment>
        <Header attached="top" inverted={true} size="large">Video Thumbnailer</Header>
        <Container>

          <Segment placeholder>
            <Header icon>
              <Icon name={iconName} />

              Upload short video to trigger thumbnails generation in AWS Lambda.
              <br/>
              When the thumbnails are generated, they will appear here.
            </Header>

            <Input action='Upload video' placeholder='Select video...' type="file" onChange={this.handleFileChange}/>
          </Segment>
          
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
