
import http from '../http-common'




class AgenciesService{
    getAgencyInfo(){
        return http.get('/agencies/settings/')
    }         
    updateAgencyInfo(data:any){        
        return http.put(`/agencies/settings/`,data)
    }  
}
export default new AgenciesService();
