import react from 'react'
import { Link } from 'react-router-dom'

export default class Home extends react.Component {
  constructor(props){
    super(props);

    this.state = {valor1 : "xd"};
  }

  render(){

    return(
      <div>
        <Link to='/login'><button className="btn btn-dark">Acceder</button></Link>
      </div>
    )
  }

}
