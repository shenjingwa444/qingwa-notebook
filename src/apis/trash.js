import request from '../helpers/request'
import {friendlyDate} from '../helpers/util'
const URL = {
  GET:'/notes/trash',
  REVERT:'/notes/:noteId/revert',
  DELETE:'/notes/:noteID/confirm'
}

export default {
  getAll(){
    return new Promise((resolve,reject)=>{
      request(URL.GET)
        .then(res=>{
          res.data = res.data.sort((note1,note2)=> note1.createdAt > note2.createdAt ? -1 : 1)
          res.data.forEach(note =>{
            note.createdAtFriendly = friendlyDate(note.createdAt)
            note.updatedAtFriendly = friendlyDate(note.updatedAt)
          })
          resolve(res)
        }).catch(err=>{
          reject(err)
      })
    })
  },
  deleteTrashNote({noteId}){
    return request(URL.DELETE.replace(':noteID',noteId),'DELETE')
  },
  revertTrashNote({noteId}){
    return request(URL.REVERT.replace(':noteId',noteId),'PATCH')
  }
}
