import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Health extends React.Component{
  render(){
    return(
      <div className="container">
        <BmiForm/>
      </div>
    );
  }
}

class BmiForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      height:'',
      weight:'',
      scale:'',
      weight_scale:'',
      bmi:'',
      msg:''
    }
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    if(this.state.height==='' || this.state.weight==='' || this.state.scale==='' || this.state.weight_scale===''){
      this.setState({msg:<p className="alert alert-danger">All Fields Are Required</p>});
    }else{
      if(!Number(this.state.height)||!Number(this.state.weight)){
        this.setState({msg:<p className="alert alert-danger">Both Height And Weight Have To Be Numbers!</p>});
      }else{
        let bmi="";
        let bmi_msg="";
        let scale=this.state.scale;
        let weight_scale=this.state.weight_scale;
        if(scale==="m" && weight_scale==="kg"){
          bmi=calculateBMI(this.state.height,this.state.weight);
          bmi_msg=bmiMessage(bmi);
          this.setState({bmi:bmi,msg:bmi_msg});
        }else{
          let in_metres=toMetres(scale,this.state.height);
          let in_kgs=toKilograms(weight_scale,this.state.weight);
          bmi=calculateBMI(in_metres,in_kgs);
          bmi_msg=bmiMessage(bmi);
          this.setState({bmi:bmi,msg:bmi_msg});
        }
      }
    }
  }
  handleChange=(e)=>{
    let input=e.target.value;
    let inputName=e.target.name;
    this.setState({[inputName]:input});
  }
  render(){
  return(
    <div className="container-fluid bmi-wrap col-md-5">
        <form onSubmit={this.handleSubmit}>
          <h3>Body Mass Index(BMI) Check</h3>
          <label>Choose Height Measurements</label><br/>
          <input name="scale" value="m" onChange={this.handleChange} type="radio"/>Metres.
          <input name="scale" value="cm" onChange={this.handleChange} type="radio"/>Centimetres.
          <input name="scale" value="ft" onChange={this.handleChange} type="radio"/>Feet.<br/>
          <input className="form-control" onChange={this.handleChange} name="height" type="text" placeholder="Enter Your Height"/><br/>
          <label>Choose Weight Measurements</label><br/>
          <input name="weight_scale" value="kg" onChange={this.handleChange} type="radio"/>Kilograms.
          <input name="weight_scale" value="gm" onChange={this.handleChange} type="radio"/>Grams.<br/>
          <input className="form-control" onChange={this.handleChange}  name="weight" type="text" placeholder="Enter Your Weight"/><br/>
          <strong>BMI: {this.state.bmi}</strong><br/>
          {this.state.msg}<br/>
          <input className="form-control btn btn-info" type="submit" value="Calculate BMI"/>
        </form>
    </div>
  );}
}
function toMetres(unit,value){
    if(unit==="cm"){
      return(value/100);
    }else if(unit==="ft"){
      return(value/3.28084);
    }else if(unit==="m"){
      return value;
    }
}
function toKilograms(unit,value){
  if(unit==="gm"){
    return(value/1000);
  }else if(unit==="kg"){
    return value;
  }else{}
}
function calculateBMI(height,weight){
  let bmi=Math.round(weight/(height*height)*1000)/1000;
  return bmi;
}
function bmiMessage(e){
  if(e<18){
    return (<p className="alert alert-danger">You Are Underweight!</p>);
  }else if(e>=18 && e<=24){
    return (<p className="alert alert-success">Your BMI Is Normal</p>);
  }else if(e>24 && e<=30){
    return (<p className="alert alert-danger">You Are Overweight!</p>);
  }else{
    return (<p className="alert alert-danger">You Are Obese!</p>);
  }
}
ReactDOM.render(<Health/>,document.getElementById('root'));


