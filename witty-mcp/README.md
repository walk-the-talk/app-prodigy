# Witty MCP Server

A humorous MCP server that demonstrates how to build tools using the Model Context Protocol (MCP). This server provides witty user profiles, BMI calculations, and comedic code review prompts that AI assistants can use.

## What is this?

This is a **beginner-friendly example** of an MCP server that:
- Generates humorous user profiles with witty developer personas
- Provides a BMI (Body Mass Index) calculator with encouraging and funny health commentary
- Offers comedic code review prompts to make feedback more enjoyable
- Demonstrates how to connect custom tools to AI applications like VS Code Copilot

Think of it as a bridge that lets AI assistants access your custom functions and data.

## Prerequisites

Before you start, make sure you have:
- **Node.js 18 or newer** installed on your computer
  - Check by running: `node --version`
  - Download from [nodejs.org](https://nodejs.org/) if needed
- **npm** (comes with Node.js)
  - Check by running: `npm --version`

## Quick Start

### Step 1: Install Dependencies
Open your terminal in this folder and run:
```bash
npm install
```
*This downloads all the required packages for the server to work.*

### Step 2: Test the Server
Run the server to make sure everything works:
```bash
npm start
```
*You should see the server start up. Press `Ctrl+C` to stop it.*

## How to Use with VS Code

### Auto-Discovery (Recommended for Beginners)
The server is already configured to work with VS Code! The configuration is in `.vscode/mcp.json`:

```json
{
  "servers": {
    "witty-mcp": {
      "type": "stdio",
      "command": "npm",
      "cwd": "${workspaceFolder}/witty-mcp",
      "args": ["start"]
    }
  }
}
```

**What this means:** VS Code will automatically find and start this server when you use MCP-compatible features.

## Building for Production

Once you've finished developing and want to build a production version:

1. **Build the project** (converts TypeScript to JavaScript):
   ```bash
   npm run build
   ```
   *This creates optimized JavaScript files in the `dist/` folder.*

2. **Update your MCP configuration** to use the built version for better performance:
   ```json
   {
     "servers": {
       "witty-mcp": {
         "type": "stdio",
         "command": "node",
         "cwd": "${workspaceFolder}/witty-mcp",
         "args": ["./dist/index.js"]
       }
     }
   }
   ```

**Why build?** The built version runs faster and doesn't need TypeScript compilation at runtime.

## Available Commands

- `npm start` - Run the server directly (for testing)
- `npm run build` - Build the TypeScript code into JavaScript
- `npm run witty-mcp` - Alternative way to start the server

## What Can This Server Do?

Once connected, AI assistants can:
1. **Generate humorous developer profiles** with witty personas and coding superpowers
2. **Calculate BMI** using weight and height with encouraging and funny commentary
3. **Create comedic code reviews** that make feedback fun and engaging
4. **Learn from this example** to build more complex tools

## Troubleshooting

### "Command not found" errors
- Make sure Node.js and npm are installed
- Restart your terminal after installing Node.js

### Server won't start
- Check if you're in the right folder (`witty-mcp`)
- Run `npm install` first
- Make sure no other process is using the same port

### VS Code doesn't see the server
- Make sure the `.vscode/mcp.json` file exists in your project root
- Restart VS Code
- Check that the file paths in the configuration are correct

## Next Steps

Want to build your own MCP server? 
1. Study the code in `src/witty-mcp-server.ts`
2. Read the [Model Context Protocol documentation](https://modelcontextprotocol.io/)
3. Check out the [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## License

MIT - Feel free to use this code for learning and building your own projects!
