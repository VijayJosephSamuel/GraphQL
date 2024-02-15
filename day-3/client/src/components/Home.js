import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_ALL_QUOTES } from "../gqlOperations/queries";

export default function Home() {
    const{loading,error, data} = useQuery(GET_ALL_QUOTES)
    if(loading) return <h2>Loading....</h2>
    if(error){console.log(error)}
    return (
    <div className="container">
        {
            data.comments.map(comment => {
                return(
                    <blockquote>
                        <h6>{comment.comment}</h6>
                        <p className="right-align">{comment.by.firstName}</p>
                    </blockquote>
                )
            })
        }
    </div>
  );
}
