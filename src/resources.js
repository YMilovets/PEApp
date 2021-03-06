export default function UseResource() {
    return {
        posts: wrapPromise(fetchPosts())
    }
}
function fetchPosts() {
    const src = "https://ymilovets.github.io/storageJSON/exercises.json";
    return fetch(src).then(result => result.json()); 
}
function wrapPromise(promise) {
    let status = "pending", result;
    const suspender = promise.then( r => {
        result = r;
        status = "success"
    }).catch( e => {
        result = "Не удается поключиться к json-файлу";
        status = "error"   
    })

    return {
        read() {
            switch (status) {
                case "pending":
                    throw suspender;
                case "error":
                    return status;
                case "success":
                    return result;
                default:
                    throw suspender;
            }
        }
    }
}