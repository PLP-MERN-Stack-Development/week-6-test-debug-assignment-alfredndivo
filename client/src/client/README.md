## ✅ Testing Strategy

This project uses:

- **Jest** for unit and integration tests (client + server)
- **React Testing Library** for component testing
- **Supertest** for API endpoint testing
- **Cypress** for end-to-end tests

Tests are organized in:
- `src/tests/unit` (client)
- `src/tests/integration` (client)
- `server/tests/unit` and `server/tests/integration`

---

## 📊 Test Coverage

- Code coverage: **>70%**
- See coverage summary screenshots below.

![Client Coverage](./client/screenshots/coverage-client.png)
![Server Coverage](./server/screenshots/coverage-server.png)

---

## 🐛 Debugging Techniques Used

- Used `console.log()` and `debugger` to trace data flow
- Handled errors using custom Express middleware
- React error boundaries implemented (optional)
- Used browser dev tools (e.g., inspecting API calls)

---

## 🚀 How to Run

```bash
# Start backend
cd server
pnpm install
pnpm dev

# Start frontend
cd client
pnpm install
pnpm dev

# Run tests
pnpm test
