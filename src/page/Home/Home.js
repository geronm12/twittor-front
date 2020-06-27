import React, {useState, useEffect} from 'react'
import BasicLayout from "../../layout/BasicLayout";
import {Button, Spinner} from "react-bootstrap";
import {getTweetsFollowersApi} from "../../api/tweet";
import ListTweets from "../../components/ListTweets";
import "./Home.scss";

export default function Home(props) {
    const {setRefreshCheckLogin} = props; 

     const [tweets, setTweets] = useState(null);

     const [page, setPage] = useState(1);

     const [loading, setLoading] = useState(false);


     useEffect(() => {
      getTweetsFollowersApi(page)
          .then(response => {
               if(!tweets && response){
               
               setTweets(formatModel(response));
                    
               }else {
                    if(!response){
                         setLoading(0);
                    }else{
                         const data = formatModel(response);
                         setTweets([...tweets, ...data]);
                         setLoading(false);
                    }
               }
          }).catch(() => {
               
          });
     }, [page])

     const moreData = () => {
          setLoading(true);
          setPage(page + 1);
     }

    return (
         <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
              <div className="home__title">
               <h2>Inicio</h2>
              </div>
              {tweets && <ListTweets tweets={tweets}/>}
              <Button onClick={moreData} className="load-more">
               {!loading ?  (
                  loading !== 0 ? "Más" :"No hay más tweets"   
               ): <Spinner 
               as = "span"
               animation="grow"
               size="sm"
               role="status"
               aria-hidden="true"
               />}
              </Button>
         </BasicLayout>
         );
}


function formatModel(tweets) {
     const tweetsTemp = [];
     
     tweets.forEach(tweet => {
     
          tweetsTemp.push({
            _id: tweet._id,
            userId: tweet.userRelationId,
            mensaje: tweet.Tweet.mensaje,
            fecha: tweet.Tweet.fecha
          });

          
     });

     return tweetsTemp;
}