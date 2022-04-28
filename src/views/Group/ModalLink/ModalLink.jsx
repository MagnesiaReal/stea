import {useState} from "react";


export default function ModalLink(props) {

  const [copyMessage, setCopyMessage] = useState();
    
  function onCopyCode(e) {
    e.preventDefault();
    navigator.clipboard.writeText(props.token);
    setCopyMessage(<h5>Codigo copiado !!!</h5>);
  }

  return(
    <div className="modal fade" id="stea-token-modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Codigo de acceso</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" align="middle">
            <small>Este codigo de acceso caduca en 3 dias, puedes consultarlo siempre que gustes.</small>
            <h1>{props.token}</h1>
          </div>
          <div className="modal-footer">
            {copyMessage}
            <button className="btn btn-dark" type="submit" onClick={onCopyCode}>Copiar</button>
            <button className="btn" data-dismiss="modal" aria-label="Close">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );

}
