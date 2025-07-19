import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "hello-world",
    version: "1.0.0"
});

server.registerResource(
    "user-profile",
    new ResourceTemplate("users://{userId}/profile", { list: undefined }),
    {
        title: "User Profile Resource",
        description: "Provides user profile information"
    },
    async (uri, { userId }) => {
        try {
            // Generate humorous profile data
            const funnyProfiles = [
                {
                    name: "Captain Keyboard",
                    bio: "Professional typo creator and coffee-to-code converter. Has a black belt in Ctrl+Z.",
                    hobbies: ["Debugging dreams", "Stack Overflow archaeology", "Rubber duck whispering"],
                    superpower: "Can spot a missing semicolon from 3 monitors away",
                    motto: "It works on my machine! 🤷‍♂️"
                },
                {
                    name: "The Code Whisperer",
                    bio: "Speaks fluent JavaScript and broken English. Dreams in binary.",
                    hobbies: ["Naming variables", "Fighting merge conflicts", "Explaining why it's not a bug, it's a feature"],
                    superpower: "Turns caffeine into code with 99.9% efficiency",
                    motto: "There are only 10 types of people in the world..."
                },
                {
                    name: "Syntax Error Sally",
                    bio: "Professional bracket matcher and indentation perfectionist. Once spent 3 hours debugging only to find a missing comma.",
                    hobbies: ["Collecting error messages", "Tab vs spaces debates", "Teaching computers to compute"],
                    superpower: "Can make any working code break just by looking at it",
                    motto: "If it compiles, ship it! 🚀"
                }
            ];

            // Pick a random profile
            const profileIndex = Math.floor(Math.random() * funnyProfiles.length);
            const profile = funnyProfiles[profileIndex];

            const profileText = `
🎭 User Profile for ID: ${userId}
👤 Name: ${userId}
📝 Bio: ${profile.bio}

🎯 Hobbies:
${profile.hobbies.map(hobby => `  • ${hobby}`).join('\n')}
💪 Superpower: ${profile.superpower}
🗣 Motto: "${profile.motto}"`;

            console.error(`Generated profile for userId ${userId}:`, profileText.trim());
            return {
                contents: [{
                    uri: uri.href,
                    text: profileText.trim()
                }]
            };
        } catch (error) {
            console.error(`Error generating profile for userId ${userId}:`, error);
            return {
                contents: [{
                    uri: uri.href,
                    text: `Profile data for user ${userId}`
                }]
            };
        }
    }
);

// Simple tool with parameters
server.registerTool(
    "calculate-bmi",
    {
        title: "BMI Calculator",
        description: "Calculate Body Mass Index (input: weight in kg, height in centimeters)",
        inputSchema: {
            weightKg: z.number(),
            heightCm: z.number()
        }
    },
    async ({ weightKg, heightCm }) => {
        // Convert height to meters        
        const heightM = heightCm / 100;
        // BMI range - kg/m^2
        const bmi = weightKg / (heightM * heightM);

        // Add some witty commentary based on BMI ranges
        let commentary = "";
        if (bmi < 18.5) {
            commentary = " 🍕 Time to befriend some pizza! You're in the underweight range.";
        } else if (bmi >= 18.5 && bmi < 25) {
            commentary = " 🎯 Goldilocks zone achieved! Just right in the normal range.";
        } else if (bmi >= 25 && bmi < 30) {
            commentary = " 🚶‍♂️ Maybe trade some Netflix time for nature walks? You're in the overweight range.";
        } else {
            commentary = " 🏃‍♂️ Your body is ready for a health adventure! You're in the obese range.";
        }

        return {
            content: [{
                type: "text",
                text: `BMI: ${bmi.toFixed(2)}${commentary}`
            }]
        };
    }
);

server.registerPrompt(
    "review-code",
    {
        title: "Code Review Prompt",
        description: "Creates a prompt to review a piece of code",
        argsSchema: { message: z.string() }
    },
    ({ message }) => ({
        messages: [{
            role: "user",
            content: {
                type: "text",
                text: `You are a world-class code reviewer with a knack for humor! Review the code in the files attached in the context. Your answer should be witty, light-hearted, and guaranteed to make the reader smile. If you spot any bugs, treat them like mischievous gremlins. If the code is perfect, shower it with comedic praise. \n User message is:
${message}`
            }
        }]
    })
);

async function main() {
    // Start receiving messages on stdin and sending messages on stdout
    // This is the standard way for VS Code extensions to communicate with language servers
    const transport = new StdioServerTransport();

    // Connect the MCP server to the transport
    await server.connect(transport);

    // For STDIO-based servers. Avoid console.log(). 
    // console.log("Hello MCP Server running on stdio");
    console.error("Hello MCP Server running on stdio");

    // Setup graceful shutdown handling
    const shutdown = async () => {
        console.error("Shutting down MCP server...");
        try {
            await server.close();
            console.error("MCP server shut down gracefully");
            process.exit(0);
        } catch (error) {
            console.error("Error during shutdown:", error);
            process.exit(1);
        }
    };

    // Handle shutdown signals
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

    // Handle stdin close (client initiated shutdown)
    process.stdin.on('close', () => {
        console.error("stdin closed, initiating shutdown");
        shutdown();
    });

    process.stdin.on('end', () => {
        console.error("stdin ended, initiating shutdown");
        shutdown();
    });
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});