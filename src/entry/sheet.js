import { getFirebaseApp, getFirebaseAuth } from "../initFirebase";
import { getFirestore, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from "firebase/auth";

const app = getFirebaseApp();
const auth = getFirebaseAuth(app);
const db = getFirestore(app)

const docId = window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
const docRef = doc(db, 'characters', docId)

const $loading = $('#loading_h')
const $form = $('#sheet_form')

const $name = $('#name_h')

const $a_str = $('#a_str')
const $a_dex = $('#a_dex')
const $a_con = $('#a_con')
const $a_int = $('#a_int')
const $a_wis = $('#a_wis')
const $a_cha = $('#a_cha')

const $a_str_mod = $('#a_str_mod')
const $a_dex_mod = $('#a_dex_mod')
const $a_con_mod = $('#a_con_mod')
const $a_int_mod = $('#a_int_mod')
const $a_wis_mod = $('#a_wis_mod')
const $a_cha_mod = $('#a_cha_mod')

const $s_athletics = $('#s_athletics')
const $s_acrobatics = $('#s_acrobatics')
const $s_sleight = $('#s_sleight')
const $s_stealth = $('#s_stealth')
const $s_arcana = $('#s_arcana')
const $s_history = $('#s_history')
const $s_investigation = $('#s_investigation')
const $s_nature = $('#s_nature')
const $s_religion = $('#s_religion')
const $s_animal = $('#s_animal')
const $s_insight = $('#s_insight')
const $s_medicine = $('#s_medicine')
const $s_perception = $('#s_perception')
const $s_survival = $('#s_survival')
const $s_deception = $('#s_deception')
const $s_intimidation = $('#s_intimidation')
const $s_performance = $('#s_performance')
const $s_persuasion = $('#s_persuasion')

const $s_athletics_mod = $('#s_athletics_mod')
const $s_acrobatics_mod = $('#s_acrobatics_mod')
const $s_sleight_mod = $('#s_sleight_mod')
const $s_stealth_mod = $('#s_stealth_mod')
const $s_arcana_mod = $('#s_arcana_mod')
const $s_history_mod = $('#s_history_mod')
const $s_investigation_mod = $('#s_investigation_mod')
const $s_nature_mod = $('#s_nature_mod')
const $s_religion_mod = $('#s_religion_mod')
const $s_animal_mod = $('#s_animal_mod')
const $s_insight_mod = $('#s_insight_mod')
const $s_medicine_mod = $('#s_medicine_mod')
const $s_perception_mod = $('#s_perception_mod')
const $s_survival_mod = $('#s_survival_mod')
const $s_deception_mod = $('#s_deception_mod')
const $s_intimidation_mod = $('#s_intimidation_mod')
const $s_performance_mod = $('#s_performance_mod')
const $s_persuasion_mod = $('#s_persuasion_mod')

// prevent browser loading cache when navigating back to the page
window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload();
    }
};

$(() => {
    console.log(docId)
    getDoc(docRef)
        .then((snap) => {
            console.log(snap.data().name)
            document.title = snap.data().name + "'s Character Sheet"
            if (snap.data().owner != auth.currentUser.uid){
                $("#sheet_form input").prop("disabled", true);
            }
            populateSheet(snap.data())
        })
})


$form.on('submit', (e) => {
    e.preventDefault()
})

$('#sheet_form .abscore').on('change', (e) => {
    const $target = $(e.target)
    const val = parseInt($target.val())
    if (!isNaN(val)){
        $target.val(Math.min(Math.max(val,1), 30))
    }
    else{
        $target.val(10)
    }

    const newVal = $target.val()
    console.log(e.target.id + " changed to " + newVal)
    updateDoc(docRef, e.target.id, newVal, "last_edit", serverTimestamp())
    updateAbScoreMod(e.target.id, newVal)
})

$('#sheet_form .skill').on('change', (e) => {
    updateDoc(docRef, e.target.id, $(e.target).val())
})

$('#signOut_btn').on('click', () => {
    signOut(auth);
    location.reload();
})

function populateSheet(data){
    $name.text(data.name)

    $a_str.val(data.a_str)
    $a_dex.val(data.a_dex)
    $a_con.val(data.a_con)
    $a_int.val(data.a_int)
    $a_wis.val(data.a_wis)
    $a_cha.val(data.a_cha)

    updateAbScoreMod('a_str', data.a_str)
    updateAbScoreMod('a_dex', data.a_dex)
    updateAbScoreMod('a_con', data.a_con)
    updateAbScoreMod('a_int', data.a_int)
    updateAbScoreMod('a_wis', data.a_wis)
    updateAbScoreMod('a_cha', data.a_cha)

    $s_athletics.val(data.s_athletics)
    $s_acrobatics.val(data.s_acrobatics)
    $s_sleight.val(data.s_sleight)
    $s_stealth.val(data.s_stealth)
    $s_arcana.val(data.s_arcana)
    $s_history.val(data.s_history)
    $s_investigation.val(data.s_investigation)
    $s_nature.val(data.s_nature)
    $s_religion.val(data.s_religion)
    $s_animal.val(data.s_animal)
    $s_insight.val(data.s_insight)
    $s_medicine.val(data.s_medicine)
    $s_perception.val(data.s_perception)
    $s_survival.val(data.s_survival)
    $s_deception.val(data.s_deception)
    $s_intimidation.val(data.s_intimidation)
    $s_performance.val(data.s_performance)
    $s_persuasion.val(data.s_persuasion)

    $form.show()
    $loading.hide()
}

function updateAbScoreMod(abScoreId, score){
    const mod = Math.floor((score-10)/2)
    switch (abScoreId){
        case "a_str":
            $a_str_mod.text(mod)
            break;
        case "a_dex":
            $a_dex_mod.text(mod)
            break;
        case "a_con":
            $a_con_mod.text(mod)
            break;
        case "a_int":
            $a_int_mod.text(mod)
            break;
        case "a_wis":
            $a_wis_mod.text(mod)
            break;
        case "a_cha":
            $a_cha_mod.text(mod)
            break;
    }
}