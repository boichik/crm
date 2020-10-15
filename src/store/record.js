/* eslint-disable */
import firebase from 'firebase/app'

export default{
    actions:{
        async createRecord({dispatch, commit}, record){
            try{
              const uid= await dispatch('getUid')
              return await firebase.database().ref(`/users/${uid}/records`).push(record)
              

            }catch(e){
                commit('setError',e)
                throw e
            }
        },
        async fetchRecords({dispatch, commit}){
            try{
                const uid = await dispatch('getUid')
                const records =  (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
                return Object.keys(records).map(key => ({...records[key], id:key}))
                // const recs=[]
                // Object.keys(records).forEach(key =>{
                //   recs.push({
                //       title:records[key].title,
                //       limit:records[key].limit,
                //       id:key
                //   })
                // })
                // return recs 

            }catch(e){
                commit('setError',e)
                throw e 
            }
        }
    }
}