import { Card, CardContent, Typography } from "@mui/material";

interface Props {
    title: string;
    value: string | number;
}

const StatsCard = ({ title, value }: Props) => {
    return (
        <Card sx={{ minWidth: 250, padding: 1 }}>
            <CardContent>
                <Typography variant="h6" color="text.secondary">
                    {title}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
