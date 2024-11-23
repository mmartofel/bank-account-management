import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { theme } from './theme';
import { UserSearchPage } from './pages/UserSearchPage';
import { UserDetailsPage } from './pages/UserDetailsPage';
import { AccountsListPage } from './pages/AccountsListPage';
import { Layout } from './components/Layout';
import { TransactionsPage } from './pages/TransactionsPage';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<UserSearchPage />} />
                            <Route path="/users/:userId" element={<UserDetailsPage />} />
                            <Route path="/accounts" element={<AccountsListPage />} />
                            <Route path="/transactions" element={<TransactionsPage />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Layout>
                </Router>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
