import React, {useState, useEffect} from 'react'
import { getTasks } from '../services/TaskService'
import momment from 'moment'

export default function TaskList() {

    const [tasks, setTasks] = useState([])
    const [taskError, setTaskError] = useState('')

    useEffect(() => {
        reloadTasks()
    }, [])

    const reloadTasks = () => {
        getTasks()
            .then(res => setTasks(res))
            .catch(err => setTaskError(err))
    }

    return (
        <div>
            { 
                taskError 
                ? ( 
                    <div>
                        <h2>Something is wrong, notify your System Administrator</h2>
                    </div>
                )
                : tasks.map(t => (
                    <div className="col-md-3 p2" key={t.id}>
                        <div className="card">
                            <div className="card-header text-white text-weight-bold text-uppercase">
                                <h3 className="card-text text-center">{t.title}</h3>
                            </div>
                            <div className="card-body">
                                <p>{t.description}</p>
                                <p>{
                                    t.status === 1 ? 'To do'    
                                    : t.status === 2 ? 'Doing'
                                    : t.status === 3 ? 'Done'
                                    : ''
                                }</p>
                            </div>
                            <div className="card-body">
                                <p>Created at {momment(t.created_at).fromNow()}</p>
                                <p>Updated at {momment(t.updated_at).fromNow()}</p>
                            </div>
                            <div className="card-footer"></div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
