//import FirebaseKeys from "./App";
import firebase from 'firebase';


class Fire{

    // constructor(){
    //     firebase.initializeApp(firebaseConfig)
    // }

    addPost = async({text, localUrl, type})=>{
        console.log("type  "+ type);
        let remoteUri;
        if(type != "link" ){ 
        remoteUri = await this.uploadPhotoAsync(localUrl,`Photos/${Date.now()}` );
        }
        else{
        remoteUri = localUrl;
        }
        //console.log(remoteUri);
        return new Promise((res, rej) => {
            this.firestore.collection("posts")
            .add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                image: remoteUri,
                type: type
            })
            .then(ref =>{
                res(ref)
            })
            .catch(error =>{
                rej(error);
            });
            
        })
    }

    addTextPost = async({text})=>{
        //const remoteUri = await this.uploadPhotoAsync(localUrl,`Photos/${Date.now()}` );
        //console.log(remoteUri);
        return new Promise((res, rej) => {
            this.firestore.collection("posts")
            .add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
               // image: remoteUri,
                type: "text"
            })
            .then(ref =>{
                res(ref)
            })
            .catch(error =>{
                rej(error);
            });
            
        })
    }

    uploadPhotoAsync = async (uri,filename) => {
        //const path = `Photos/${this.uid}/${Date.now()}.jpg`;
        return new Promise(async (res,rej)=>{
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase
            .storage()
            .ref(filename)
            .put(file);

            upload.on(
                "state_changed",
                snapshot => {},
                err =>{
                    rej(err);
                },
                async () =>{
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                } 
            )

        });
    };

    get firestore(){
        return firebase.firestore();
    }
    get uid(){
        return (firebase.auth().currentUser || {}).uid
    }
    get timestamp(){
        return Date.now()
    }
}
Fire.shared = new Fire()
export default Fire;