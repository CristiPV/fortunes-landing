import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.responseType = "json";

const httpMethods = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,

    getAll: ( endpoint, callback ) => {
        axios.get( endpoint )
        .then( ( response ) => {
          console.log( "Response:", response.data );
          if ( callback )
            callback( response.data );
        } )
        .catch( ( e ) => {
          console.log( e );
        } );
    },

    create: ( endpoint, body, callback ) => {
        axios.post( endpoint, body )
        .then( ( response ) => {
            console.log( "Response:", response.data );
            if ( callback )
                callback( response.data )
        } )
        .catch( ( e ) => {
            console.log( e );
        } );
    }
};

export default httpMethods;
