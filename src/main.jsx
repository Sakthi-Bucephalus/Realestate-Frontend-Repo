import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';

// Initialize TanStack Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

// Ant Design Gold Theme Tokens according to Section 2 of requirements
const goldTheme = {
  token: {
    colorPrimary: '#B88A2E',
    colorLink: '#8C671D',
    colorLinkHover: '#B88A2E',
    colorSuccess: '#10B981',
    colorWarning: '#F59E0B',
    colorError: '#EF4444',
    colorInfo: '#8C671D',
    borderRadius: 6,
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    colorBgBase: '#FFFFFF',
    colorTextBase: '#262626',
    colorBorder: '#E8E2D5',
  },
  components: {
    Button: {
      colorPrimary: '#B88A2E',
      colorPrimaryHover: '#8C671D',
      borderRadius: 6,
    },
    Table: {
      headerBg: '#FCF8EF',
      headerColor: '#8C671D',
      rowHoverBg: '#FCF8EF',
      borderColor: '#E8E2D5',
    },
    Menu: {
      itemSelectedBg: '#FCF8EF',
      itemSelectedColor: '#8C671D',
    },
    Card: {
      borderColor: '#E8E2D5',
    },
    Modal: {
      headerBg: '#FFFFFF',
    },
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={goldTheme}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
