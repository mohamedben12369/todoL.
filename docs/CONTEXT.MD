# To-Do List Web Application Documentation

## Overview
A full-stack JavaScript To-Do List application enabling users to efficiently manage their daily tasks with authentication, task management features, and a responsive interface.

## Technical Stack
- **Frontend**: 
  - Bootstrap
  - TailwindCSS
  - Redux Toolkit (State Management)
  - Axios (API Client)

- **Backend**: 
  - Node.js
  - Express.js
  - MySQL2
  - Sequelize ORM
  - JWT Authentication

- **Database**: 
  - MySQL

- **Development Tools**:
  - TypeScript
  - ESLint + Prettier
  - Jest + React Testing Library
  - Swagger (API Documentation)

- **DevOps**:
  - Docker
  - GitHub Actions (CI/CD)
  - PM2 (Process Manager)

## Core Features

### 1. User Authentication
- **Sign Up**
  - Email and password registration
  - OAuth integration (Google, GitHub)
  - Input validation and secure password hashing
  - Email verification
  - Profile setup

- **Login/Logout**
  - JWT-based authentication
  - Refresh token mechanism
  - Secure session management
  - Remember me functionality
  - Multi-device login support

- **Password Management**
  - Email-based password reset
  - Secure reset token generation
  - Time-limited reset links
  - Password strength requirements
  - Password change functionality

### 2. Task Management
- **Task Operations**
  - Create new tasks with rich text editor
  - Edit existing task details
  - Delete tasks (with soft delete option)
  - Mark tasks as complete/incomplete
  - Bulk actions support
  - Task templates

- **Organization**
  - Categorize tasks (Work, Personal, Shopping, etc.)
  - Add/remove tags
  - Priority levels (High, Medium, Low)
  - Due date management
  - Recurring tasks
  - Subtasks support
  - Drag & drop prioritization
  - Task dependencies

### 3. User Dashboard
- **Task Views**
  - Today's tasks
  - Upcoming tasks
  - Completed tasks
  - Overdue tasks
  - Calendar view
  - Kanban board
  - List view
  - Timeline view

- **Analytics**
  - Task completion statistics
  - Productivity trends
  - Time tracking
  - Priority distribution
  - Category-wise analysis

- **Filtering & Search**
  - Advanced search with multiple criteria
  - Filter by category, status, priority
  - Filter by date range
  - Sort by multiple fields
  - Saved filters
  - Recent searches

### 4. UI/UX Features
- **Responsive Design**
  - Mobile-first approach
  - Progressive Web App (PWA)
  - Tablet and desktop optimized
  - Cross-browser compatibility
  - Touch gestures support
  - Offline functionality

- **Theme Support**
  - Light/Dark mode toggle
  - Custom theme creation
  - Persistent theme preference
  - Customizable color schemes
  - Custom CSS variables
  - RTL support

- **Accessibility**
  - WCAG 2.1 compliance
  - Keyboard navigation
  - Screen reader support
  - High contrast mode
  - Font size adjustment
  - Focus management

### 5. Backend Architecture

#### API Endpoints

```
# Authentication
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
POST   /api/auth/refresh-token     # Refresh JWT token
POST   /api/auth/reset-password    # Request password reset
PUT    /api/auth/reset-password    # Process password reset
GET    /api/auth/verify-email      # Email verification

# User Management
GET    /api/users/me              # Get current user
PUT    /api/users/me              # Update user profile
PUT    /api/users/password        # Change password
GET    /api/users/settings        # Get user settings
PUT    /api/users/settings        # Update user settings

# Tasks
GET    /api/tasks                 # List tasks
POST   /api/tasks                 # Create task
GET    /api/tasks/:id            # Get task details
PUT    /api/tasks/:id            # Update task
DELETE /api/tasks/:id            # Delete task
POST   /api/tasks/bulk           # Bulk task operations
PUT    /api/tasks/:id/status     # Update task status
PUT    /api/tasks/:id/priority   # Update task priority

# Categories
GET    /api/categories           # List categories
POST   /api/categories           # Create category
PUT    /api/categories/:id       # Update category
DELETE /api/categories/:id       # Delete category

# Tags
GET    /api/tags                 # List tags
POST   /api/tags                 # Create tag
PUT    /api/tags/:id            # Update tag
DELETE /api/tags/:id            # Delete tag

# Comments
GET    /api/tasks/:id/comments   # List task comments
POST   /api/tasks/:id/comments   # Add comment
PUT    /api/comments/:id         # Update comment
DELETE /api/comments/:id         # Delete comment

# Sharing
POST   /api/tasks/:id/share      # Share task
PUT    /api/tasks/:id/share      # Update sharing
DELETE /api/tasks/:id/share      # Remove sharing

# Notifications
GET    /api/notifications        # List notifications
PUT    /api/notifications/:id    # Mark as read
DELETE /api/notifications/:id    # Delete notification
```

#### Database Schema

```sql
-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    is_email_verified BOOLEAN DEFAULT false,
    verification_token VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expires TIMESTAMP,
    refresh_token VARCHAR(255),
    settings JSON,
    INDEX idx_email (email)
);

-- Categories table
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    color VARCHAR(7),
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT,
    is_default BOOLEAN DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

-- Tasks table
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP,
    reminder_date TIMESTAMP,
    status ENUM('pending', 'in_progress', 'completed', 'archived') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    category_id INT,
    user_id INT NOT NULL,
    parent_task_id INT,
    is_recurring BOOLEAN DEFAULT false,
    recurrence_pattern JSON,
    estimated_time INT,
    actual_time INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    INDEX idx_user_status (user_id, status),
    INDEX idx_due_date (due_date)
);

-- Tags table
CREATE TABLE tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

-- Task Tags (Junction table)
CREATE TABLE task_tags (
    task_id INT,
    tag_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (task_id, tag_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Task Comments
CREATE TABLE task_comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    attachment_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_task_id (task_id)
);

-- Task Sharing
CREATE TABLE task_shares (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT NOT NULL,
    shared_by INT NOT NULL,
    shared_with INT NOT NULL,
    permission ENUM('view', 'edit', 'admin') DEFAULT 'view',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_shared_with (shared_with)
);

-- Notifications
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT,
    type ENUM('due_soon', 'task_updated', 'task_shared', 'comment_added', 'mention') NOT NULL,
    message TEXT NOT NULL,
    data JSON,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    INDEX idx_user_read (user_id, is_read)
);

-- Activity Log
CREATE TABLE activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT,
    action VARCHAR(50) NOT NULL,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    INDEX idx_task_id (task_id)
);

-- User Sessions
CREATE TABLE user_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    refresh_token VARCHAR(255) NOT NULL,
    device_info JSON,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_refresh_token (refresh_token)
);
```

### 6. Security Measures
- **Authentication & Authorization**
  - JWT with refresh tokens
  - Role-based access control
  - Session management
  - API key authentication for external services

- **Data Protection**
  - Password hashing with bcrypt
  - Data encryption at rest
  - HTTPS enforcement
  - Secure cookie settings

- **Request Security**
  - Input validation
  - SQL injection prevention
  - XSS protection
  - CSRF tokens
  - Rate limiting
  - Request size limiting

- **Monitoring & Logging**
  - Error logging
  - Security audit logs
  - Rate limit monitoring
  - Failed login attempts tracking

### 7. Performance Optimizations
- **Frontend**
  - Code splitting
  - Lazy loading
  - Image optimization
  - Caching strategies
  - Bundle size optimization
  - Virtual scrolling for large lists

- **Backend**
  - Database indexing
  - Query optimization
  - Connection pooling
  - Response caching
  - Compression
  - Load balancing

### 8. Development Workflow
1. **Setup**
   ```bash
   git clone https://github.com/your-repo/todo-app.git
   cd todo-app
   npm install
   cp .env.example .env
   ```

2. **Environment Configuration**
   ```env
   # App
   NODE_ENV=development
   PORT=3000
   API_URL=http://localhost:3000
   
   # Database
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=todo_app
   DB_USER=root
   DB_PASS=password
   
   # JWT
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=15m
   REFRESH_TOKEN_EXPIRES_IN=7d
   
   # Email
   SMTP_HOST=smtp.mailtrap.io
   SMTP_PORT=2525
   SMTP_USER=user
   SMTP_PASS=pass
   
   # Redis
   REDIS_URL=redis://localhost:6379
   ```

3. **Development**
   ```bash
   # Start development servers
   npm run dev         # Frontend
   npm run server:dev  # Backend
   
   # Database migrations
   npm run db:migrate
   npm run db:seed
   
   # Testing
   npm run test
   npm run test:e2e
   
   # Linting
   npm run lint
   npm run format
   ```

4. **Production Build**
   ```bash
   npm run build
   npm run start
   ```

### 9. Deployment
1. **Prerequisites**
   - Node.js 16+
   - MySQL 8+
   - Redis (optional)
   - SSL certificate

2. **Build Process**
   - Frontend asset optimization
   - Environment configuration
   - Database migrations
   - Service deployment

3. **Monitoring**
   - Application metrics
   - Error tracking
   - Performance monitoring
   - User analytics

### 10. Contributing
Please refer to CONTRIBUTING.md for:
- Code style guide
- Branch naming conventions
- Commit message format
- Pull request process
- Code review guidelines

### 11. License
MIT License - See LICENSE.md for details
