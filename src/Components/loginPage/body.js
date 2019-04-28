import React, { Component } from 'react'
import '../../styles/Login.css'
import {userSignup} from '../../Actions/accountActions'
import { FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
class body extends Component {
    constructor(props){
        super(props);
        this.state={
            name: "",
            email: "",
            password: "",
            nameError: false,
            emailError: false,
            passError: false,
            modalErr: false,
            checkAccount: false //biến phụ để componentdidupdate không maximumloop
        }
    }
    //Name
    onChangeName = (event)=>{
        this.setState({name: event.target.value}, ()=>{
            this.validateName()
        }) 
    }
    validateName = () => {
        const { name } = this.state;
        this.setState({
          nameError:
            name.length > 0 ? null : true
        });
      }
    onChangeEmail = (event)=>{
        this.setState({email: event.target.value}, ()=>{this.validateEmail()})
    }
    validateEmail = () => {
        const { email } = this.state;
        this.setState({
          emailError:
            email.length > 0 ? null : true
        });
      }
     
    onChangePassword = (event)=>{
        this.setState({password: event.target.value}, ()=>{this.validatePassword()})
    }
    validatePassword = () => {
        const { password } = this.state;
        this.setState({
         passError:
            password.length > 0 ? null : true
        });
      }

    handleRegister=()=>{
        if(!this.state.name){
            this.setState({
                nameError: true
            })
        }
        if(!this.state.password){
            this.setState({
                passError: true
            })
        }
        if(!this.state.email){
            this.setState({
                emailError: true
            })
        }
       if(this.state.name&&this.state.email&&this.state.password){
           this.props.userSignup(this.state.name, this.state.email, this.state.password)
           this.setState({
            name: "",
            email: "",
            password: "",
            checkAccount: true
        })
       }
    }

    componentDidUpdate(){
        if(this.props.account.callapidone){
        if(this.state.checkAccount&&!this.props.account.signupSuccess){
                this.setState({
                    modalErr: true,
                    checkAccount: false
                })
        }else if(this.props.account.signupSuccess){
            if(this.state.checkAccount){
                this.setState({
                    modalErr: true,
                    checkAccount: false
                })
            }
        }}
    }
    toggle = ()=>{
        this.setState({
            modalErr: !this.state.modalErr,
            
        })
        if(this.props.account.signUpErr === false){
            this.props.history.push('/home')
        }
    }
    render() {
        return (
            <div id="body" className="row">
                <div style={{ fontSize: "25px" }} className="col-md-7">
                    <p style={{ margin: "35%", marginLeft: "20%", fontSize: "30px" }}>
                        <b>EASY WAY TO MANAGE <br /> YOUR PROJECT</b>
                        <p style={{ fontSize: "20px" }}>
                            Our website provides you <br />
                            an easy way to manage  <br />
                            your project and to do list everyday.</p>
                    </p>
                </div>
                {/* sign up form */}
                <div className="col-md-5" style={{ paddingTop: "15%" }}>
                    <div className="col-md-8">
                   <b style={{fontSize: "35px"}}> REGISTER </b>
                        <FormGroup>
                            <Label for="input" >Name</Label>
                            <br />
                            {this.state.nameError? 
                            <b style={{color: "#ac2403", fontSize: "15px"}}>* Cannot be blank</b>                         
                            : null}
                            <Input type="text" id="input" name="input" placeholder="Proman Team"
                            onChange={this.onChangeName} value={this.state.name}
                            onBlur={this.validateName}></Input>       
                        </FormGroup>
                        <FormGroup>
                            <Label for="input">Email</Label>
                            <br />
                            {this.state.emailError? 
                            <b style={{color: "#ac2403", fontSize: "15px"}}>* Cannot be blank</b>                         
                            : null}
                            <Input type="text" id="input" name="input" placeholder="promanteam@proman.com"
                            onChange={this.onChangeEmail} onBlur={this.validateEmail} value={this.state.email}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="input">Password</Label>
                            <br/>
                            {this.state.passError? 
                            <b style={{color: "#ac2403", fontSize: "15px"}}>* Cannot be blank</b>                         
                            : null}
                            <Input type="password" id="input" name="input" placeholder="********"
                            onChange={this.onChangePassword} onBlur={this.validatePassword} value={this.state.password}></Input>
                        </FormGroup>
                        
                        <div>
                        <Button onClick={this.handleRegister}>Sign up</Button>
                        </div> 
                     <Modal isOpen={this.state.modalErr}>
                            <ModalHeader>Register Error</ModalHeader>
                            <ModalBody>
                          {  this.props.account.signupSuccess? 
                            <div>Register Successfully</div>:
                            <div style={{color: "red"}}>
                            <i className="fas fa-exclamation-triangle"></i>
                               Email is existed
                               </div>
                               }
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={this.toggle}>OK</Button>
                            </ModalFooter>
                        </Modal>
                    
                    </div>
                </div>
            </div>
        )
    }
}
const mapStatetoProps = state =>({
    account: state.account
})
export default connect(mapStatetoProps, {userSignup})(withRouter(body))