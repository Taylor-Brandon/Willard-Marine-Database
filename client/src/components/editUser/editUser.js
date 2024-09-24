import React from "react";
import { Link } from "react-router-dom";
import LinkBar from '../linkBar/linkBar';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import { REMOVE_USER } from "../../utils/mutations";
import '../../styles/style.css';

const EditUser = () => {
    const { loading, error, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];

    const [removeUser] = useMutation(REMOVE_USER, {
        onCompleted: () => {
            window.alert("User Removed Successfully");
        },
        onError: (error) => {
            window.alert(error.message);
        },
        refetchQueries: [{ query: QUERY_USERS }]
    });

    const handleRemoveUser = (userId) => {
        if (window.confirm("Are you sure you want to remove this user?")) {
            removeUser({ variables: { userId } });
        }
    };

    if (error) return <h1>Error: {error.message}</h1>;

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 my-3">
                    {loading ? (
                        <div>Loading. . .</div>
                    ) : (
                        <div>
                            <div id="editUser-links">
                             <LinkBar />
                             </div>
                            <div id="user-list" className="flex-row justify-space-between my-4">
                                {users.map((user) => (
                                    <div key={user._id} className="col-12 col-xl-6 ms-2">
                                        <div className="card mb-3">
                                            <nav className="card-heading">
                                            <h4 id="card-header" className="card-header">
                                                {user.firstName} {user.lastName} <br />
                                                </h4>
                                                <div id="admin-card" style={{ backgroundColor: user.admin ? 'grey' : 'orange' }}></div>
                                                <div id="link-box">
                                                <div className="links">
                                                <Link id='edit-link' to={`/user/${user._id}`}><i className="bi bi-pen"></i></Link>
                                                <button 
                                                    onClick={() => handleRemoveUser(user._id)} 
                                                    id='delete-btn'
                                                    className="btn ml-3">
                                                    <i className="bi bi-x"></i>
                                                </button>
                                                </div>
                                                </div>
                                                </nav>
                                                <span id="card-text" className="text-black" style={{ fontSize: '1rem' }}>
                                                <div id="email-text">
                                                    Email: {user.email}
                                                    </div>
                                                    <div id="admin-text">
                                                    Admin: {user.admin.toString()}
                                                    </div>
                                                </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default EditUser;