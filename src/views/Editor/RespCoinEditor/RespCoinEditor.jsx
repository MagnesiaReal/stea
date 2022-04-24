import { Component } from 'react';

import AXIOS from '../../../components';


export default class RespCoinEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value1 : 1
    };
      
    
  }


  componentDidMount() {
    
    // perfom something here

  }


  render() {


    return(
      <div>
        Soy un Editor
      </div>
    );
  }
}
