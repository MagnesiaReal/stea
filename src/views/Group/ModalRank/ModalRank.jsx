import {useEffect, useState} from 'react';
import AXIOS from '../../../services/http-axios'

export default function ModalRank (props) {
  
  const [rankList, setRankList] = useState([]);

  
  useEffect(()=> {
    
    AXIOS.get('activity/results');


  }, [])


  return(
    <div className="modal fade" id="stea-rank-modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Codigo de acceso</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" align="middle">
            {rankList.map((v, idx) => {
               
            })
            }

          </div>
          <div className="modal-footer">


            <button className="btn" data-dismiss="modal" aria-label="Close">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );

}
