import { useEffect, useState } from "react";
import UserService from "../../services/user.service";

const Dashboard = () => {

    const [users, setUser] = useState([]);

    useEffect(() => {
        UserService.getAllUser().then((response) => {
            // console.log(response.data.data.records);
            setUser((response.data.data.records));
        },
            (error) => {
                const users =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setUser(users);
            }
        );
    }, [])

  

      
            return (
                <div>
                    <h3>Users</h3>
                    <table>
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                 <tbody>
                     {
                        users &&
                        (users).map((user) => {
                            return <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>
                                    {user.created_at}
                                </td>
                                <td>{user.is_active == 1 ? 'ACTIVE' : 'INACTIVE'}</td>
                                <td></td>
                            </tr>;
                     })
                    }
                 </tbody>
                    </table>

                </div>

            )
        
            
};

export default Dashboard;