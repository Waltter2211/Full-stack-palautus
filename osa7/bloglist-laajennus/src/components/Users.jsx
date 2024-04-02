import React, { useEffect, useState } from 'react'
import usersService from '../services/users'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../reducers/usersReducer'

const Users = () => {

    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch()

    useEffect(() => {
       usersService.getAllUsers().then((users) => {
        dispatch(setUsers(users))
       })
    }, [blogs])

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <td></td><th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                        <tr key={user.id}>
                            <td>{user.name}</td><td>{user.blogs.length}</td>
                        </tr>
                        ) 
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Users