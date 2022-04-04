import react from 'react'

export default class User extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      something: 1
    }
  }

  render() {
    return(
      <div>
        <h2>Estas en user alv</h2>
      </div>
    );
  }
  
}
