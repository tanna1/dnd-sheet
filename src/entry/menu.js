import { getFirebaseApp, getFirebaseAuth } from "../initFirebase";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from "firebase/auth";
// import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const app = getFirebaseApp();
const auth = getFirebaseAuth(app);
const db = getFirestore(app)

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Logged In")

        loadCharacters()
    } else {
        console.log("Not Logged In; Redirecting to login")
        document.location.href = '/login'
    }
});

$('#signOut_btn').on('click', () => {
    signOut(auth);
    location.reload();
})


async function loadCharacters(){
    //retrieve characters

    const q = query(collection(db, "characters"), where("owner", "==", auth.currentUser.uid))

    getDocs(q).then((snapshot) => {
        $.get('html/sheetListTemplate.html', (templateData) => {
            snapshot.forEach((doc) => {
                let data = doc.data();
                console.log(data.name)
    
                let template = $.parseHTML(templateData);
                $(template)
                    .find('[data-name="name"]')
                    .text(data.name)

                let classLabel = data.class0 + " " + data.level0 + 
                        (data.class1 != "" ? data.class1 + " " + data.level1 : "") + 
                        (data.class2 != "" ? data.class2 + " " + data.level2 : "")
                $(template)
                    .find('[data-name="class"]')
                    .text(classLabel)
                $(template)
                    .find('[data-name="button"]')
                    .attr("onclick", "document.location.href = \"/characters/" + doc.id + "\"")

                $('#characterList').append(template)
            })
        })
        
    })
}