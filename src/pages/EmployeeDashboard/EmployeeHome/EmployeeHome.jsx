import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'black',
};


const EmployeeHome = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = (assetId) => {
        setOpen(assetId);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const axiosSecure = useAxiosSecure();
    const { data: assets = [] } = useQuery({
        queryKey: ['assets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/v1/assets');
            return res.data;
        }
    })

    return (
        <>
            <Helmet>
                <title>Employee Home | DigitalHub</title>
            </Helmet>
            <div className="mb-11 ml-9">
                <h3 className="text-3xl font-bold text-center mb-9">My Custom Requests</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Asset Name</th>
                                <th>Price</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                assets.map((asset) => <tr key={asset._id}>
                                    <th>{asset.assetName}</th>
                                    <td>{asset.assetPrice}</td>
                                    <td>{asset.assetType}</td>
                                    <td>{asset.status}</td>
                                    <td>
                                        <Button onClick={() => handleOpen(asset._id)} variant="contained" size="small" color="error">View Details</Button>
                                        <Modal
                                            open={open === asset._id}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    <img className="w-80 h-3/5 object-cover" src={asset.assetImage} alt="Image" />
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    Asset name: {asset.assetName}
                                                    <br />
                                                    Price: {asset.assetPrice} <br />
                                                    Type: {asset.assetType}
                                                    <br />
                                                    Why needed: {asset.whyNeeded}
                                                    <br />
                                                    Additional information: {asset.additionalInfo}
                                                    <br />
                                                    Request date: {new Date().getUTCFullYear()}
                                                    <br />
                                                    Status: {asset.status}
                                                </Typography>
                                            </Box>
                                        </Modal>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default EmployeeHome;