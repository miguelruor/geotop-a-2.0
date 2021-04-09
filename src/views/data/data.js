import {db} from '../../ConfigFirebase';

export default async function getData(){
    var speakers = {};

    await db.collection('speakers').get()
    .then(function(querySnapshot){
        querySnapshot.forEach(async function(doc){
            var mi = doc.data().middle_initial;
            speakers[doc.id] = {
                surname: doc.data().surname,
                completeName: doc.data().name + " " + 
                (mi != null ? mi : "") + " " + doc.data().surname,
                middle_initial: mi,
                name: doc.data().name,
                institution: doc.data().place,
                country: "",
                state: "",
                city: "",
                research_interests: [""],
                email: "",
                homepage: "",
                google_scholar_url: ""
            };
        })
    })
    .catch(function(error){
        alert("Some speakers cannot load.");
    });

    var talks = {};

    await db.collection("talks").get()
    .then(function(querySnapshot){
        querySnapshot.forEach(async function(doc){
            var date = doc.data().date.toDate();

            talks[doc.id] = {
                speaker_id: doc.data().speaker,
                date: doc.data().date,
                video: doc.data().video,
                title: doc.data().title,
                keywords: doc.data().keywords,
                slides: doc.data().presentation,
                abstract: doc.data().abstract,
                warning: doc.data().warning,
                season: doc.data().season,
                numberViewsYoutube: 0,
                numberLikesYoutube: 0,
                numberDislikesYoutube: 0
            };
            
        });
    })
    .catch(function(error){
        alert("Cannot load some talk")
    });

    var json1 = JSON.stringify(talks);
    var json2 = JSON.stringify(speakers)

    return(
        <>
        <h1>{"JSON platicas"}</h1>
        <p>
        {json1}
        </p>
        <h1>{"JSON speakers"} </h1>
        <p>
        {json2}
        </p>
        </>
    );
}