import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import  useToken  from '../../useToken';
import { Typography } from '@mui/material';

const UserAppliedJobs = () => {
    const { token } = useToken();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/get-applied-jobs', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                setJobs(response.data);
            } catch (error) {
                setError(error.response?.data?.error || 'Error fetching jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchAppliedJobs();
    }, [token]);

    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'jobId', headerName: 'Job ID', width: 200},
        { field: 'companyName', headerName: 'Company', width: 200},
        { field: 'role', headerName: 'Role', width: 200},
        { field: 'appliedDate', headerName: 'Applied Date', width: 200 },
        { field: 'status', headerName: 'Status', width: 150 },
    ];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{textAlign:"center"}}> Applied Jobs</Typography>
            <DataGrid
                rows={jobs}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                disableSelectionOnClick
                getRowId={(row) => row._id}
            />
        </div>
    );
};

export default UserAppliedJobs;
