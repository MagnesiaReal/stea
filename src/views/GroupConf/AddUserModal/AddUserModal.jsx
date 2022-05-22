import {useState} from 'react';
import Cookies from 'universal-cookie';
import AXIOS from '../../../services/http-axios'

export default function AddUserModal(props) {
  const cookie = new Cookies();

  const [email, setEmail] = useState('');
  

  function onCloseModal(e){
    e.preventDefault();
    console.log('onCloseAddUserModal');
  }

  function onAddUser(e) {
    e.preventDefault();
    const credentials = {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      email: email,
      groupId: props.groupId
    };
    AXIOS.post('/groupconf/adduser', credentials)
    .then((res)=> {
      console.log(res.data.message);
      props.onUpdateComponent();
      props.onError(<b style={{color: "green"}}>Usuario agregado con éxito</b>);
      setTimeout(()=> {
        props.onError(null);
      }, 10000);
    }).catch((err)=> {
      console.log('ADDUSER>> Error: ', err.response.status, err.response.data.message);

      if(err.response.status === 409) {
        props.onError(<b style={{color: "blue"}}>El usuario ya existe en el grupo</b>);
      } else if (err.response.status === 404) {
        props.onError(<b style={{color: "red"}}>El usuario no existe</b>);
      } else {
        props.onError(<b style={{color: "blue"}}>No sé que paso</b>);
      }     
      setTimeout(()=> {
        props.onError(null);
      }, 10000); 
    });
  }

  return (
    <div className="modal fade" id="stea-add-user-modal" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Agregar miembro</h5>
            <button type="button" onClick={onCloseModal} className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <label htmlFor="email">Email: </label>
            <input className="form-control" type="text" id="email" value={email} onChange={({target:{value}})=> {setEmail(value)}} placeholder="Email del nuevo miembro"/>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={onAddUser} data-dismiss="modal">Agregar</button>
            <button className="btn" data-dismiss="modal" aria-label="Close" onClick={onCloseModal}>Cancelar</button>
          </div>

        </div>
      </div>
    </div>
  );
}
