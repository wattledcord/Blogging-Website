import React, { Component } from 'react';
import './App.css';
import { Button, Form, Container, Segment, Icon, FormGroup } from 'semantic-ui-react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import Snackbar from '@material-ui/core/Snackbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { UserName: '', Password: '', FirstName: '', LastName: '', ContactNumber: '', LUserName: '', LPassword: '', editorHtml: '', Title: '', Description: '',postmsg:false }

  }

  handleClick = () => {
    axios.post("http://localhost:10010/api/login/", {
      UserName: this.state.UserName,
      Password: this.state.Password
    }).then((res) => {
      console.log(res.data.output)
    }).catch((err) => {
      console.log("Error", err)
    })
  }
  onSign = (e) => {

    axios.post("http://localhost:10010/api/SignUp", {
      UserName: this.state.UserName,
      Password: this.state.Password,
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      ContactNumber: this.state.ContactNumber
    }).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log("Error", err)
    })
  }

  AddPost = () => {
    axios.post("http://localhost:10010/api/addPost", {
      Author: "Madhava Reddy",
      Title:this.state.Title,
      Description:this.state.Description,
      Post: this.state.editorHtml
    }).then((res) => {
      this.setState({postmsg:true,snackbarmsg:"Post Added"})
      console.log(res.data)
    }).catch((err) => {
      console.log("Error", err)
    })
  }
  handleSnackBarClose = (event, reason) => {   

    this.setState({ postmsg: false });
  };
  handleQChange = (value) => {

    this.setState({ editorHtml: value });
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  render() {

    const { UserName, Password, FirstName, LastName, ContactNumber, LUserName, LPassword, Title, Description,postmsg,snackbarmsg } = this.state;
    return (
      <Container>
        <Segment inverted raised>
          <Form inverted>
            <Form.Group widths='equal'>
              <Form.Input placeholder='Username' name='UserName' value={UserName} onChange={this.handleChange} label='Username' />
              <Form.Input placeholder='Password' name='Password' value={Password} onChange={this.handleChange} label='Password' />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input placeholder='First Name' name='FirstName' value={FirstName} onChange={this.handleChange} label='First Name' />
              <Form.Input placeholder='Last Name' name='LastName' value={LastName} onChange={this.handleChange} label='Last Name' />
              <Form.Input placeholder='Contact Number' name='ContactNumber' value={ContactNumber} onChange={this.handleChange} label='Contact Number' />
            </Form.Group>
            <Form.Group widths='equal'>
              <Button onClick={this.onSign} fluid color='blue' icon labelPosition='right' >
                <Icon name='signup' />
                SignUp</Button>
            </Form.Group>
          </Form>
        </Segment>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input placeholder='Username' name='LUserName' value={LUserName} onChange={this.handleChange} label='Username' />
            <Form.Input placeholder='Password' name='LPassword' value={LPassword} onChange={this.handleChange} label='Password' />
          </Form.Group>
          <Button onClick={this.handleClick} fluid color='green' icon labelPosition='right'>
            <Icon name='sign-in' />Login</Button>
        </Form>

        <Form>
          <br></br>

          <Form.Input placeholder='Title' name='Title' value={Title} onChange={this.handleChange} label='Title' />
          <Form.TextArea placeholder='Give a short description' name='Description' value={Description} onChange={this.handleChange} label='Description' />

          <ReactQuill
            onChange={this.handleQChange}
            value={this.state.editorHtml}
            modules={App.modules}
            formats={App.formats}
            bounds={'.app'}
            placeholder='Write your post here!!!'
          />
          <br />
          <Button onClick={this.AddPost} fluid color='google plus' icon labelPosition='right'><Icon name='compose' />Add Post</Button>
        </Form>
        <Snackbar anchorOrigin={{vertical:'bottom',horizontal:'left'}} open={postmsg} autoHideDuration={500} message={snackbarmsg} onClose={this.handleSnackBarClose}/>

      </Container>
    );
  }
}

App.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
App.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]
export default App;
