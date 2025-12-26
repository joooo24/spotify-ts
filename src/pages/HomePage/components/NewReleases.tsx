import { Typography } from '@mui/material';
import React from 'react'
import useGetNewReleases from '../../../hooks/useGetNewReleases';
import LoadingSppiners from '../../../common/components/LoadingSpinners/LoadingSpinners';

type Props = {}

const NewReleases = (props: Props) => {
    const {data, isLoading, isError, error} = useGetNewReleases();

    if (isLoading) {
        return <LoadingSppiners />;
    }

    if (isError) {
        return <div>Error: {(error as Error).message}</div>;
    }
    return (
        <div>
            <Typography variant="h1" paddingTop="8px" >
                New Released Albums
            </Typography>
        </div>
    )
}
export default NewReleases;