import {useEffect, useState} from 'react';
import AXIOS from '../../../services/http-axios'

export default function ModalRank (props) {
  
  const [rankList, setRankList] = useState([]);
  
  useEffect(()=> {
    console.log('Llamando resultados desde modalRAnk', {params: props.modalData});
    AXIOS.get('activity/results', {params: props.modalData})
      .then(res=> {
        console.log('Modal rank data: ', res.data);
        res.data.resultsData.sort((a, b) => b.calificacion - a.calificacion)
        setRankList(res.data.resultsData);
      }).catch(err=> {
        console.log(err.response, err.stack);
      });


  }, [props.modalData]);


  return(
    <div className="modal fade" id="stea-rank-modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Tabla de puntuaciones</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" align="middle">
            {rankList.map((v, idx) => {
              return <>
                <div className="stea-rank-modal-element">
                  <div><h2>{idx+1}</h2></div>
                  {/*<div><img src={props.avatars[v.idAvatar-1].avatarUrl} alt="avatar.jpg"/></div>*/}
                  <div>{v.nombre} {v.apellido}</div> 
                  <b>{v.calificacion}pts</b>
                </div>
              </>
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
