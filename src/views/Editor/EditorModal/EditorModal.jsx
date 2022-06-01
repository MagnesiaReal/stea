import {useState} from 'react';

export default function EditorModal(props) {
  
  const [title, setTitle] = useState('');
  const [type, setType] = useState(1);

  function onCloseModal() {
    console.log('EditorModal Close');
    const titleus = title, typeus = type;
    

    setTitle('');
    setType('');

  }


  return(
    <div className="modal fade" id="stea-add-editor-modal" tabIndex="-1" role="dialog" aria-hidden="true">
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
              <label htmlFor="sub-activity-title">
                Titulo: 
              </label>
              <input 
                type="text"
                id="sub-activity-title"
                className="form-control"
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}/>
              <label htmlFor="type">
                Tipo de Actividad:
              </label>
              <select name="" id="type" value={type} onChange={(e)=>{setType(e.target.value)}} className="form-control">
                <option value={1}>Mapas Interactivos</option>
                <option value={2}>Ordenamiento Jerárquico</option>
                <option value={3}>Respuestas Coincidentes</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn btn-dark" data-dismiss="modal" 
              onClick={(e)=>{
                props.addEditor({title: title, type: type});
                onCloseModal(e);
              }}>Crear</button>
              <button className="btn" data-dismiss="modal" aria-label="Close" onClick={onCloseModal}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
