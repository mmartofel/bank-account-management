import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { UserSearchPage } from './pages/UserSearchPage';
import { UserDetailsPage } from './pages/UserDetailsPage';
import { AccountsListPage } from './pages/AccountsListPage';
import { Layout } from './components/Layout';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<UserSearchPage />} />
                        <Route path="/users/:userId" element={<UserDetailsPage />} />
                        <Route path="/accounts" element={<AccountsListPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
