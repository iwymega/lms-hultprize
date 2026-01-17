import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './auth/context/AuthProvider';
import { Toaster } from 'sonner';
import AppRouter from './router/AppRouter';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './i18n';
import { NotificationProvider } from './shared/components/notification/context/NotificationContext';
import { ChatProvider } from './shared/components/facebook-style-chat/context/ChatContext';
import { QuizProvider } from './features/quiz/stores/quizStore';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              error: 'text-danger',
              success: 'text-success',
              warning: 'text-warning',
              info: 'text-info',
            },
          }} />
        <NotificationProvider>
          <ChatProvider>
            <QuizProvider>
              <AppRouter />
            </QuizProvider>
          </ChatProvider>
        </NotificationProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
