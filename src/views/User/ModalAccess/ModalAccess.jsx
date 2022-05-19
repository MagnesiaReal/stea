
import {useState} from 'react';
import Cookies from 'universal-cookie'
import AXIOS from '../../../services/http-axios'
import {useNavigate} from 'react-router-dom';

export default function ModalAccess(props) {
  const navigation = useNavigate();
  const cookie = new Cookies();
  const [code, setCode] = useState('');
    
  function onSubmitAccess(e) {
    e.preventDefault();
    console.log('onSubmitAcess');
    
    const credentials = {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      code: code
    };

    AXIOS.post('/group/access', credentials)
      .then((res)=>{
      console.log('MODALACCESS>> ', res.data.message);
      navigation(`/group/${res.data.idGrupo}`);
      }).catch(err => {
      console.log('MODALACCESS>> Error status code: ', err.response.status, err.response.data.message);
      });
  }

  function onCloseModal(e) {
    e.preventDefault();
    setCode('');
  }

  function onCode(e) {
    e.preventDefault();
    setCode(e.target.value);
  }

  return(
    <div className="modal fade" id="stea-access-modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Acceder a Grupo</h5>
            <button type="button" onClick={onCloseModal} className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
            <div className="modal-body">
              <label htmlFor="groupName">Codigo de Acceso: </label><br/>
              <input type="text"  name="groupName" id="groupName" value={code} onChange={onCode} placeholder="Codigo" required/>
            </div>
            <div className="modal-footer">
              <input className="btn btn-dark" data-dismiss="modal" type="submit" value="Acceder" onClick={onSubmitAccess}/>
              <button className="btn" data-dismiss="modal" aria-label="Close" onClick={onCloseModal}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );


}
