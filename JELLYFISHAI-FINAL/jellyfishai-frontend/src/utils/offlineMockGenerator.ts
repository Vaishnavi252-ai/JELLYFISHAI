/**
 * Enhanced Mock Data Generator for JellyfishAI
 * Works 100% offline without API key
 * Generates realistic project structure based on requirements
 */

import { ProjectRequirement, TechStack, GeneratedCode } from '../types';

/**
 * Intelligent mock code generator
 * Creates realistic project structure based on user requirements
 */
export function generateMockCodeOffline(
  requirements: ProjectRequirement[],
  techStack: TechStack[]
): GeneratedCode[] {
  
  // Detect what user wants to build
  const intent = detectRequirementIntent(requirements);
  const techStackNames = techStack.map(t => t.name).join(', ');
  
  // Generate appropriate project structure
  const files = generateProjectFiles(intent, techStack);
  
  // Add package.json
  files.unshift(generatePackageJson(techStack));
  
  // Add README
  files.push(generateReadme(requirements, techStackNames, intent));
  
  return files;
}

/**
 * Detect what type of application user wants to build
 */
function detectRequirementIntent(requirements: ProjectRequirement[]): string {
  const text = requirements
    .map(r => `${r.title} ${r.description}`)
    .join(' ')
    .toLowerCase();

  if (text.includes('login') || text.includes('auth') || text.includes('signup')) {
    return 'auth';
  }
  if (text.includes('cart') || text.includes('shop') || text.includes('ecommerce')) {
    return 'ecommerce';
  }
  if (text.includes('payment') || text.includes('transaction')) {
    return 'payment';
  }
  if (text.includes('chat') || text.includes('message') || text.includes('real-time')) {
    return 'chat';
  }
  if (text.includes('blog') || text.includes('article') || text.includes('post')) {
    return 'blog';
  }
  if (text.includes('todo') || text.includes('task') || text.includes('list')) {
    return 'todo';
  }
  if (text.includes('dashboard') || text.includes('analytics') || text.includes('report')) {
    return 'dashboard';
  }
  return 'general';
}

/**
 * Generate appropriate files based on project intent
 */
function generateProjectFiles(intent: string, techStack: TechStack[]): GeneratedCode[] {
  const files: GeneratedCode[] = [];

  switch (intent) {
    case 'auth':
      files.push(...generateAuthProject(techStack));
      break;
    case 'ecommerce':
      files.push(...generateEcommerceProject(techStack));
      break;
    case 'chat':
      files.push(...generateChatProject(techStack));
      break;
    case 'blog':
      files.push(...generateBlogProject(techStack));
      break;
    case 'todo':
      files.push(...generateTodoProject(techStack));
      break;
    case 'dashboard':
      files.push(...generateDashboardProject(techStack));
      break;
    default:
      files.push(...generateGeneralProject(techStack));
  }

  return files;
}

/**
 * Generate Auth/Login System
 */
function generateAuthProject(techStack: TechStack[]): GeneratedCode[] {
  return [
    {
      filename: 'src/pages/LoginPage.tsx',
      language: 'typescript',
      content: `import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}`,
      explanation: 'Login page component with form handling',
    },
    {
      filename: 'src/pages/SignupPage.tsx',
      language: 'typescript',
      content: `import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(email, password);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}`,
      explanation: 'Signup page with password validation',
    },
    {
      filename: 'src/hooks/useAuth.ts',
      language: 'typescript',
      content: `import { useState, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  token: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: '1',
        email,
        token: 'mock-token-' + Date.now(),
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockUser: User = {
        id: Math.random().toString(),
        email,
        token: 'mock-token-' + Date.now(),
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  return { user, isLoading, login, signup, logout };
}`,
      explanation: 'Authentication hook with login/signup logic',
    },
  ];
}

/**
 * Generate E-commerce/Shopping Cart Project
 */
function generateEcommerceProject(techStack: TechStack[]): GeneratedCode[] {
  return [
    {
      filename: 'src/pages/ProductsPage.tsx',
      language: 'typescript',
      content: `import { useState } from 'react';
import { useCart } from '../hooks/useCart';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Product 1', price: 29.99, image: '/p1.jpg' },
  { id: '2', name: 'Product 2', price: 39.99, image: '/p2.jpg' },
  { id: '3', name: 'Product 3', price: 49.99, image: '/p3.jpg' },
];

export function ProductsPage() {
  const { addToCart } = useCart();

  return (
    <div className="products-grid">
      {MOCK_PRODUCTS.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p className="price">\${product.price}</p>
          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}`,
      explanation: 'Products listing page with add to cart',
    },
    {
      filename: 'src/hooks/useCart.ts',
      language: 'typescript',
      content: `import { useState, useCallback } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: any) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { items, addToCart, removeFromCart, updateQuantity, total };
}`,
      explanation: 'Shopping cart state management',
    },
  ];
}

/**
 * Generate Chat Application
 */
function generateChatProject(techStack: TechStack[]): GeneratedCode[] {
  return [
    {
      filename: 'src/pages/ChatPage.tsx',
      language: 'typescript',
      content: `import { useState, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  user: string;
  timestamp: Date;
}

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      user: 'You',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: 'This is a mock response',
        user: 'Bot',
        timestamp: new Date(),
      }]);
    }, 500);
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className={\`message \${msg.user}\`}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}`,
      explanation: 'Chat interface with message handling',
    },
  ];
}

/**
 * Generate Blog/CMS Project
 */
function generateBlogProject(techStack: TechStack[]): GeneratedCode[] {
  return [
    {
      filename: 'src/pages/BlogPage.tsx',
      language: 'typescript',
      content: `import { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    content: 'Learn the basics of React development...',
    author: 'John Doe',
    date: '2024-03-19',
  },
  {
    id: '2',
    title: 'Advanced TypeScript Tips',
    content: 'Master advanced TypeScript concepts...',
    author: 'Jane Smith',
    date: '2024-03-18',
  },
];

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_POSTS);

  return (
    <div className="blog-container">
      <h1>Blog</h1>
      <div className="posts-list">
        {posts.map(post => (
          <article key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p className="meta">By {post.author} on {post.date}</p>
            <p>{post.content}</p>
            <a href={\`/post/\${post.id}\`}>Read More →</a>
          </article>
        ))}
      </div>
    </div>
  );
}`,
      explanation: 'Blog listing with posts display',
    },
  ];
}

/**
 * Generate Todo App
 */
function generateTodoProject(techStack: TechStack[]): GeneratedCode[] {
  return [
    {
      filename: 'src/pages/TodoPage.tsx',
      language: 'typescript',
      content: `import { useState } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [...prev, {
      id: Date.now().toString(),
      text: input,
      completed: false,
    }]);
    setInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>My Todos</h1>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      explanation: 'Todo application with add/delete functionality',
    },
  ];
}

/**
 * Generate Dashboard/Analytics Project
 */
function generateDashboardProject(techStack: TechStack[]): GeneratedCode[] {
  return [
    {
      filename: 'src/pages/DashboardPage.tsx',
      language: 'typescript',
      content: `import { useState, useEffect } from 'react';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 1250,
    activeUsers: 842,
    revenue: 45320,
    growth: 12.5,
  });

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="number">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p className="number">{stats.activeUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p className="number">\${stats.revenue}</p>
        </div>
        <div className="stat-card">
          <h3>Growth</h3>
          <p className="number">{stats.growth}%</p>
        </div>
      </div>
    </div>
  );
}`,
      explanation: 'Dashboard with statistics display',
    },
  ];
}

/**
 * Generate General Project
 */
function generateGeneralProject(techStack: TechStack[]): GeneratedCode[] {
  return [
    {
      filename: 'src/pages/HomePage.tsx',
      language: 'typescript',
      content: `export function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to Your App</h1>
      <p>This is your generated application</p>
      <section>
        <h2>Features</h2>
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      </section>
    </div>
  );
}`,
      explanation: 'Home page component',
    },
    {
      filename: 'src/App.tsx',
      language: 'typescript',
      content: `import { HomePage } from './pages/HomePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;`,
      explanation: 'Main App component',
    },
  ];
}

/**
 * Generate package.json
 */
function generatePackageJson(techStack: TechStack[]): GeneratedCode {
  const hasTailwind = techStack.some(t => t.name.toLowerCase().includes('tailwind'));
  const hasTypeScript = techStack.some(t => t.name.toLowerCase().includes('typescript'));

  return {
    filename: 'package.json',
    language: 'json',
    content: `{
  "name": "jellyfishai-generated-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src/"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
    ${hasTailwind ? ',"tailwindcss": "^3.4.0","postcss": "^8.4.0","autoprefixer": "^10.4.0"' : ''}
  }
}`,
    explanation: 'Project dependencies and scripts',
  };
}

/**
 * Generate README
 */
function generateReadme(
  requirements: ProjectRequirement[],
  techStack: string,
  intent: string
): GeneratedCode {
  const reqList = requirements
    .map(r => `- ${r.title}: ${r.description}`)
    .join('\n');

  return {
    filename: 'README.md',
    language: 'markdown',
    content: `# Generated Project

Generated with JellyfishAI - Offline Mode

## Requirements

${reqList}

## Tech Stack

${techStack}

## Project Type

${intent.toUpperCase()}

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit http://localhost:5173

## Build for Production

\`\`\`bash
npm run build
\`\`\`

## Features

- Responsive design
- Modern development setup
- Ready to customize

---

**Generated:** ${new Date().toLocaleDateString()}
**Mode:** Offline (No API required)
`,
    explanation: 'Project documentation',
  };
}
