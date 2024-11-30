import React from 'react';
import { Box, Container, Link, Typography, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';

const mainLinks = [
  { name: 'Customer Service', href: '#' },
  { name: 'Security', href: '#' },
  { name: 'Press Office', href: '#' },
  { name: 'Careers', href: '#' },
  { name: 'About Us', href: '#' },
];

const contactInfo = [
  { icon: <PhoneIcon />, text: '800 302 302' },
  { icon: <LocationOnIcon />, text: 'Find a Branch' },
  { icon: <LanguageIcon />, text: 'Choose Language' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Fees & Commissions', href: '#' },
  { name: 'Banking Law', href: '#' },
  { name: 'GDPR', href: '#' },
];

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#F5F5F5',
        pt: 4,
        pb: 2,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        {/* Main Links */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: 2, md: 4 },
            mb: 4,
          }}
        >
          {mainLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              sx={{
                color: 'secondary.main',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'none',
                },
              }}
            >
              {link.name}
            </Link>
          ))}
        </Box>

        {/* Contact Info */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: 2, md: 4 },
            mb: 4,
          }}
        >
          {contactInfo.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'secondary.main',
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {item.icon}
              <Typography variant="body2" fontWeight={500}>
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Legal Links */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
            mb: 3,
          }}
        >
          {legalLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline',
                },
              }}
            >
              {link.name}
            </Link>
          ))}
        </Box>

        {/* Copyright */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.75rem',
            }}
          >
            {new Date().getFullYear()} PKO Bank Polski SA. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.75rem',
              mt: 1,
            }}
          >
            PKO IKO Lite is a simplified version of the PKO BP banking system.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
