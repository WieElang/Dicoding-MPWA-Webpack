import "materialize-css/dist/css/materialize.min.css"
import "./style/style.css"
import main from "./script/main.js"

const public_key = "BAj7TiNavaNOgDJhYwoLu3YWmNY_7hCQw9Lb6AZ2cBFXOszoyVBOxsH74mJ76IS9Z5x3odXnEJjeTZO7JONT-PQ"
if ('serviceWorker' in navigator){
    window.addEventListener("load", () =>{
        navigator.serviceWorker.register('/sw.js')
        .then(() =>{
            console.log("Service Worker Success")
        })
        .catch(() =>{
            console.log("Service Worker Failed")
        })
    })
}else{
    console.log("This Browser doesn't support Service Worker")
}

if ("Notification" in window){
    Notification.requestPermission()
    .then(result =>{
        if (result === "denied"){
            console.log("Notification Denied")
            return
        }else if (result === "default"){
            console.log("User close dialog")
            return
        }

        if ("PushManager" in window){
            navigator.serviceWorker.getRegistration()
            .then(registration =>{
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(public_key)
                })
                .then(subscribe =>{
                    console.log("Berhasil melakukan subscribe dengan endpoint: ", subscribe.endpoint)
                    console.log("Berhasil melakukan subscribe dengan p256dh key: ", btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey("p256dh"))
                    )))
                    console.log("Berhasil melakukan subscribe dengan auth key: ", btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey("auth"))
                    )))
                })
                .catch(error =>{
                    console.log("Tidak dapat melakukan subscribe ", error.message)
                })
            })
        }

        function urlBase64ToUint8Array(base64String){
            const padding = "=".repeat((4 - base64String.length % 4) % 4)
            const base64 = (base64String + padding)
                .replace(/-/g, "+")
                .replace(/_/g, "/")
            const rawData = window.atob(base64)
            const outputArray = new Uint8Array(rawData.length)
            for (let i = 0; i < rawData.length; i++){
                outputArray[i] = rawData.charCodeAt(i)
            }
            return outputArray
        }
    })
}

document.addEventListener("DOMContentLoaded", main)