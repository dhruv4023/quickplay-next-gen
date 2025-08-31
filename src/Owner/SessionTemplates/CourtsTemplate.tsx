import { useEffect, useState } from 'react';
import { Court, SessionTemplate } from '../../schemas/SessionTemplate/SessionTemplate';
import FlexBetween from '../../components/Containers/FlexBetween';
import {
    Typography,
    IconButton,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type Props = {
    isEdit: boolean;
    data: SessionTemplate;
    setData: (data: SessionTemplate) => void;
};

const CourtsTemplate = ({ isEdit, data, setData }: Props) => {
    const [courts, setCourts] = useState<Court[]>(data.courts || []);

    useEffect(() => {
        setData({ ...data, courts });
    }, [courts, setData]);

    const handleAddCourt = () => {
        setCourts(prev => [...prev, { courtName: '', numberOfCourt: 0, price: 0 }]);
    };

    const handleChange = (index: number, field: keyof Court, value: string | number) => {
        const updated = [...courts];
        if (field === 'numberOfCourt' || field === 'price') {
            value = Number(value);
        }
        (updated[index] as any)[field] = value;
        setCourts(updated);
    };

    return (
        <FlexBetween flexDirection="column" alignItems="flex-start" gap={2} width="100%">
            <FlexBetween width="100%">
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Courts
                </Typography>
                {isEdit && (
                    <IconButton onClick={handleAddCourt} color="primary">
                        <AddIcon />
                    </IconButton>
                )}
            </FlexBetween>

            <TableContainer component={Paper} sx={{ width: '100%' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                        <TableCell><strong>Court Name</strong></TableCell>
                            <TableCell><strong>No of Courts</strong></TableCell>
                        <TableCell><strong>Price per hour</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courts.map((court, index) => (
                            <TableRow key={index}>
                                {
                                    isEdit ?
                                        <>
                                            < TableCell >
                                                <TextField
                                                    variant="standard"
                                                    value={court.courtName}
                                                    onChange={(e) => handleChange(index, 'courtName', e.target.value)}
                                                    fullWidth
                                                /></TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant="standard"
                                                    type="number"
                                                    value={court.numberOfCourt}
                                                    onChange={(e) => handleChange(index, 'numberOfCourt', e.target.value)}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant="standard"
                                                    type="number"
                                                    value={court.price}
                                                    onChange={(e) => handleChange(index, 'price', e.target.value)}
                                                    fullWidth
                                                />
                                            </TableCell>
                                        </> :
                                        <>
                                            <TableCell>{court.courtName}</TableCell>
                                            <TableCell>{court.numberOfCourt}</TableCell>
                                            <TableCell>{court.price}</TableCell>
                                        </>
                                }
                            </TableRow>
                        ))}
                        {courts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={2} align="center">
                                    No courts available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer >

        </FlexBetween >
    );
};

export default CourtsTemplate;
