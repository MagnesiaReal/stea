import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Cookies from "universal-cookie";
import AXIOS from '../../../services/http-axios'

export default function DeleteModal (props) {

  const cookie = new Cookies();
  const params = useParams();
  const navigation = useNavigate();

  const [groupName, setGroupName] = useState('');
  const [isDeletable, setIsDeletable] = useState(true);

  function onGroupName(e) {
    e.preventDefault();
    setGroupName(e.target.value);

    if(e.target.value === props.groupName) {
      setIsDeletable(false);
    } else {
      setIsDeletable(true);
    }

  }

  function onDeleteGroup(e) {
    e.preventDefault();
    console.log('onCloseDeleteModal');

    AXIOS.delete('/group/delete', {data: {userId: cookie.get('userId'), groupId: params.groupId, UUID: cookie.get('UUID')}})
      .then((res)=> {
        console.log('DELETEMODAL>> message: ', res.data.message);
        navigation('/');
      }).catch((err)=> {
        console.log(err.stack);
        console.log(err.status);
        if(err) throw err;
      });

  }

  function onCloseModal(e) {
    e.preventDefault();
  }


  
  return(
    <div className="modal fade" id="stea-delete-modal" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Borrar Grupo</h5>
            <button type="button" onClick={onCloseModal} className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
            <div className="modal-body">
              <label htmlFor="groupName">Por favor escribe "{props.groupName}" </label>
              <input type="text"  name="groupName" id="groupName" value={groupName} onChange={onGroupName} placeholder="Historia" required/>
            </div>
            <div className="modal-footer">
              <button disabled={isDeletable} className="btn btn-danger" onClick={onDeleteGroup} data-dismiss="modal"> Borrar !!! </button>
              <button className="btn" data-dismiss="modal" aria-label="Close" onClick={onCloseModal}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
