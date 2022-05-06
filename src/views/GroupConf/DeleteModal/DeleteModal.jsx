import {useState} from "react";


export default function DeleteModal (props) {

  const [groupName, setGroupName] = useState('');
  const [isDeletable, setIsDeletable] = useState(true);

  function onGroupName(e) {
    e.preventDefault();
    setGroupName(e.target.value);

    if(e.target.value === props.groupName) {
      setIsDeletable(false);
    }

  }

  function onDeleteGroup(e) {
    e.preventDefault();
    console.log('onCloseDeleteModal');
  }

  function onCloseModal(e) {
    e.preventDefault();
  }


  
  return(
    <div className="modal fade" id="stea-delete-modal" tabindex="-1" role="dialog" aria-hidden="true">
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
              <label htmlFor="groupName">Por favor escribe "{props.groupName}" </label>
              <input type="text"  name="groupName" id="groupName" value={groupName} onChange={onGroupName} placeholder="Historia" required/>
            </div>
            <div className="modal-footer">
              <button disabled={isDeletable} className="btn btn-dark" type="submit" onClick={onDeleteGroup} data-dismiss="modal">Crear Grupo </button>
              <button className="btn" data-dismiss="modal" aria-label="Close" onClick={onCloseModal}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
