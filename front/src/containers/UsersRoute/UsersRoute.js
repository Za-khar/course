import React from 'react';
import {Switch, Route} from 'react-router-dom';
// "/users/:id(\d+)?/(edit|avatar|avatar/edit|avatar/delete|file/\d+/[a-zA-Z]{1,10}/)?"

function UsersRoute(){
    return(
        <Switch>
            <Route path={
                [
                    "/users/:id(\\d+)?",
                    "/users/:id(\\d+)/edit", 
                    "/users/:id(\\d+)/avatar/(edit|delete)?",
                    `/users/:id(\\d+)/file/:fileID(\\d+)/:fileName([a-zA-Z]{1,10})/:date([1-2][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]).:format(docx|jpeg|pdf|txt)/v.([0-9]\\.[0-9]\\.[0-9])`,
                ]
            } exact strict sensitive 
            render={({ match }) => {
                if(match.params.date) {
                    let dateArray = match.params.date.split('-');
                    let fileDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
                    let dateNow = new Date();

                    if(fileDate <= dateNow){
                        return <h1>Good</h1>; 
                    }
                    else{
                        return <h1>404</h1>;
                    }
                }
                return <h1>Good</h1>;
                }}/>

            <Route render={() => <h1>404</h1>}/>
            
        </Switch>
        
    );
}

export default UsersRoute;