
import http from '../http-common'



class PropertiesService{
    getAgencyProperties(){
        return http.get('/properties/agency/')
    }
    getProperties(){
        return http.get('/properties/')
    }    

    createProperty(data){
        return http.post('/properties/create/',data)
    }
    updateProperty(post){
        console.log('post updata',post)
        return http.put(`/properties/${post.get('id')}/update/`,post)
    }
    deleteProperty(postId){
        return http.delete(`/properties/${postId}/delete`)
    }
}
export default new PropertiesService();
