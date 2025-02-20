# Coding Rules and Standards

## General Principles
- Write clean, maintainable, and self-documenting code
- Follow SOLID principles
- Use meaningful variable and function names
- Keep methods focused and small
- Write unit tests for critical functionality

## Backend (.NET)
### Architecture
- Follow Clean Architecture principles
- Use Domain-Driven Design (DDD) concepts
- Implement Repository pattern for data access
- Use dependency injection

### Code Organization
- One class per file
- Group related functionality in namespaces
- Keep controllers thin, business logic in services
- Use interfaces for dependency injection

### Naming Conventions
- PascalCase for class names and public members
- camelCase for private members and local variables
- Use descriptive, intention-revealing names
- Prefix interfaces with 'I' (e.g., IUserService)

### Error Handling
- Use custom exception types for domain-specific errors
- Implement global exception handling
- Log errors appropriately
- Return proper HTTP status codes

### API Design
- Follow RESTful principles
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Version APIs when making breaking changes
- Use meaningful endpoint names

## Frontend (React)
### Component Structure
- Use functional components with hooks
- Keep components small and focused
- Implement proper prop validation
- Follow container/presenter pattern

### State Management
- Use React Context for global state
- Implement Redux for complex state management
- Keep state as local as possible
- Use proper state initialization

### Styling
- Use CSS modules or styled-components
- Follow BEM naming convention
- Maintain consistent spacing and layout
- Implement responsive design principles

### Performance
- Implement lazy loading where appropriate
- Use React.memo for performance optimization
- Optimize images and assets
- Minimize bundle size

## Testing
### Unit Tests
- Write tests for business logic
- Follow AAA pattern (Arrange, Act, Assert)
- Use meaningful test names
- Maintain test independence

### Integration Tests
- Test API endpoints
- Verify database operations
- Test authentication flows
- Check error handling

## Git Workflow
### Commits
- Write clear, imperative commit messages
- Keep commits focused and atomic
- Reference issue numbers in commits
- Sign your commits

### Branching
- Use feature branches
- Follow git-flow branching model
- Keep branches up to date with main
- Delete merged branches

## Security
- Never commit secrets or credentials
- Implement proper authentication
- Use HTTPS everywhere
- Validate all user inputs

## Documentation
- Document public APIs
- Keep README up to date
- Document setup procedures
- Include necessary diagrams

## Code Review
- Review all pull requests
- Use pull request templates
- Check for security issues
- Verify test coverage
