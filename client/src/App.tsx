import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NewsFeed } from './components/NewsFeed';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <NewsFeed />
      </div>
    </QueryClientProvider>
  );
}

export default App;