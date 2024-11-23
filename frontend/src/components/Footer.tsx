import React from 'react';
import { Box, Container, Typography, Link, Divider, useTheme } from '@mui/material';

export const Footer: React.FC = () => {
    const theme = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: theme.palette.primary.main,
                color: 'white',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ mb: { xs: 2, md: 0 } }}>
                        <Typography variant="h6" gutterBottom>
                            PKO Bank Polski
                        </Typography>
                        <Typography variant="body2" color="rgba(255,255,255,0.7)">
                            ul. Puławska 15
                        </Typography>
                        <Typography variant="body2" color="rgba(255,255,255,0.7)">
                            02-515 Warszawa
                        </Typography>
                    </Box>

                    <Box sx={{ mb: { xs: 2, md: 0 } }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link href="https://www.pkobp.pl/" target="_blank" color="inherit" sx={{ display: 'block', mb: 1 }}>
                            Main Website
                        </Link>
                        <Link href="https://www.pkobp.pl/kontakt/" target="_blank" color="inherit" sx={{ display: 'block', mb: 1 }}>
                            Contact
                        </Link>
                        <Link href="https://www.pkobp.pl/o-nas/" target="_blank" color="inherit">
                            About Us
                        </Link>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Support
                        </Typography>
                        <Typography variant="body2" color="rgba(255,255,255,0.7)">
                            Infolinia: 800 302 302
                        </Typography>
                        <Typography variant="body2" color="rgba(255,255,255,0.7)">
                            +48 81 535 60 60
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)">
                        {currentYear} PKO Bank Polski. All rights reserved.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, mt: { xs: 2, sm: 0 } }}>
                        <Link href="https://www.pkobp.pl/rodo/" target="_blank" color="inherit" sx={{ fontSize: '0.875rem' }}>
                            Privacy Policy
                        </Link>
                        <Link href="https://www.pkobp.pl/regulamin/" target="_blank" color="inherit" sx={{ fontSize: '0.875rem' }}>
                            Terms of Service
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
