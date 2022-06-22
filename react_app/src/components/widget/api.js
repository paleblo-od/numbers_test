class API{

async getAPI(){
return await fetch('http://127.0.0.1:5000/api/users/register').then(res=>res.json())
}


}
export default new API()