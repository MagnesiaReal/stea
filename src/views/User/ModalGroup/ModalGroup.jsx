import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';

import AXIOS from '../../../services/http-axios';


export default function ModalGroup(props) {
  
  const navigation = useNavigate();

  const cookie = new Cookies();
  const [groupName, setGroupName] = useState('');
  const [group, setGroup] = useState('');

  const onCloseModal = (e) => {
    e.preventDefault();
    console.log('onCloseModal');
  }

  const onSubmitGroup = function(e) {
    e.preventDefault();
    console.log('onSubmitGroup');
    const credentials= {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      groupName: groupName,
      group: group
    };

    AXIOS.post('/group/create', credentials)
      .then((res)=> {
      console.log("MODALGROUP>> ", res.data.message);
      navigation(`/group/${res.data.idGrupo}`);

      }).catch((err)=> {
      console.log('MODALGROUP>> Error Status: ', err.response.status, err.response.message);
      if(err) throw err;
      });
  }

  function onGroupName(e) {
    e.preventDefault();
    setGroupName(e.target.value);
  }

  function onGroup(e){
    e.preventDefault();
    setGroup(e.target.value);
  }

  // ModalGroup
  return(
    <div className="modal fade" id="stea-group-modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Crear Grupo</h5>
            <button type="button" onClick={onCloseModal} className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
            <div className="modal-body">
              <label htmlFor="groupName">Nombre de Grupo: </label>
              <input type="text"  name="groupName" id="groupName" value={groupName} onChange={onGroupName} placeholder="Historia" required/>
              <br/>
              <label htmlFor="group">Grupo: </label>
              <input type="text" name="group" id="group" value={group} onChange={onGroup} placeholder="1CM3" required/>
            
            </div>
            <div className="modal-footer">
              <button className="btn btn-dark" type="submit" onClick={onSubmitGroup} data-dismiss="modal">Crear Grupo </button>
              <button className="btn" data-dismiss="modal" aria-label="Close" onClick={onCloseModal}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
