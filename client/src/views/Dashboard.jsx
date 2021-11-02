import {Switch, Route} from 'react-router-dom'
import { EditPost } from '../components/EditPost';
import { MyList } from "../components/MyList";
import { NewPost } from "../components/NewPost";
import "../styles/dashboard.css"


export const Dashboard = () => {



    return(
        <div className="dashboard">
            <Switch>
                <Route exact path ="/home" component={MyList}/>
                <Route exact path ="/home/new" component={NewPost}/>
                <Route exact path ="/home/edit/:id" component={EditPost}/>
            </Switch>
        </div>
    )
}