import React, { Component } from 'react';
import { Container, Header, Icon, Segment, Table, Input, SemanticICONS, Button } from 'semantic-ui-react'
import './App.css';

const iconName = (('video file outline') as SemanticICONS);
const emptyObject = {};

class App extends Component {
  
  state = {
    selectedVideo: emptyObject
  }

  handleFileChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const file = event.target.files[0];

    console.log("Filename: " + file.name);
    console.log("Type: " + file.type);
    console.log("Size: " + file.size + " bytes");

    this.setState({
      selectedVideo: file
    });
  }

  upload = () => {
    alert('todo: implement upload to AWS S3');
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

            <Input placeholder='Select video...' type="file" onChange={this.handleFileChange} name="selectedVideo"/>
          </Segment>

          {/* Display file info before uploading */}
          {this.state.selectedVideo != emptyObject && 
          <Segment>

            <Table celled>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    Filename
                  </Table.Cell>
                  <Table.Cell>
                    {(this.state.selectedVideo as File).name}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Filesize</Table.Cell>
                  <Table.Cell>
                  {(this.state.selectedVideo as File).size} bytes
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Last modified</Table.Cell>
                  <Table.Cell>
                  {(this.state.selectedVideo as any).lastModifiedDate.toLocaleDateString()}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <Button primary onClick={this.upload}>Upload video</Button>

          </Segment>}
          
          
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
