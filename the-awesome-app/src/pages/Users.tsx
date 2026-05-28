import { useEffect, useState, useTransition } from "react";
import type { User } from "../models/User";

function Users(){

    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchKey, setSearchKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isPending, setTransition] = useTransition();

    useEffect(() => {

        async function fetchUsers(){
            try {
                setIsLoading(true);
                setErrorMessage("");

                const url = "https://randomuser.me/api/?results=4000";
                const response = await fetch(url, {method: "GET"});
                const data = await response.json();
                console.log("data", data);
                const _users = data.results.map((result: any, index: number) => ({
                    
                    id: index,
                    name: `${result.name.title} ${result.name.first} ${result.name.last}`,
                    email: result.email,
                    phone: result.phone,
                    city: result.location.city
                
                }));
                setUsers(_users);
                setFilteredUsers(_users);
            } catch (error) {
                console.log("users error", error);
                setUsers([]);
                setFilteredUsers([]);
                setErrorMessage("Unable to load users right now.");
            } finally {
                setIsLoading(false);
            }


        }

        fetchUsers();

    }, [])

    // function handleSearch(e: ChangeEvent<HTMLInputElement>){

    //     setSearchKey(e.target.value);
    //     //filtering logic
    //     console.log(searchKey);
    // }

    useEffect(() => {

        if(searchKey){

            setTransition(() => {
                const _filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchKey.toLowerCase()));
                setFilteredUsers(_filteredUsers)
            })
        }
        else{

             setTransition(() => {
                 setFilteredUsers(users);
            })   
        }

    }, [searchKey, users])

    return (
        <div>
            <h3>Users</h3>

            <div>
                <input className="form-control" type="search" placeholder="SearchByName" 
                        value={searchKey} 
                        //onChange={handleSearch}
                        onChange={e => setSearchKey(e.target.value)}
                        />
            </div>
            { searchKey && <div className="alert alert-warning">Search Results for: {searchKey}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {isLoading && (
                <div className="d-flex align-items-center gap-2 my-3">
                    <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
                    <span>Loading users...</span>
                </div>
            )}

            <table className="table" style={{opacity: isPending || isLoading ? 0.6 : 1}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>   
                            <td>{user.phone}</td>
                            <td>{user.city}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Users;
