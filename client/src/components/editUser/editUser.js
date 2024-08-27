import React from "react";
import { Link } from "react-router-dom";
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
                            <h3 className="text-primary">Here is the current roster of profiles</h3>
                            <div className="flex-row justify-space-between my-4">
                                {users.map((user) => (
                                    <div key={user._id} className="col-12 col-xl-6">
                                        <div className="card mb-3">
                                            <h4 className="card-header p-2 m-0">
                                                {user.firstName} {user.lastName} <br />
                                                <span className="text-black" style={{ fontSize: '1rem' }}>
                                                    Admin: {user.admin.toString()}, 
                                                    Email: {user.email}
                                                </span>
                                                <Link to={`/user/${user._id}`}>Edit User</Link>
                                                <button 
                                                    onClick={() => handleRemoveUser(user._id)} 
                                                    className="btn btn-danger ml-3">
                                                    <i className="bi bi-x"></i>
                                                </button>
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/home">Home</Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default EditUser;
