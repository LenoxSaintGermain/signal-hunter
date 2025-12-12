const apiKey = process.env.GEMINI_API_KEY;
const baseUrl = "https://generativelanguage.googleapis.com/v1beta";

async function testInteractionsAPI() {
    console.log("Testing Gemini Interactions API...\n");
    
    // Step 1: Start a research task
    const startUrl = `${baseUrl}/interactions?key=${apiKey}`;
    console.log("1. Starting research task...");
    
    try {
        const startResponse = await fetch(startUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                input: "Find 3 SaaS companies for sale in Georgia",
                agent: "deep-research-pro-preview-12-2025",
                background: true,
                stream: false
            })
        });
        
        console.log("Start Response Status:", startResponse.status);
        const startData = await startResponse.json();
        console.log("Start Response Data:", JSON.stringify(startData, null, 2));
        
        // Step 2: Try to get status
        if (startData.name) {
            const interactionId = startData.name.split('/').pop();
            console.log("\n2. Polling for status with ID:", interactionId);
            
            const statusUrl = `${baseUrl}/interactions/${interactionId}?key=${apiKey}`;
            const statusResponse = await fetch(statusUrl, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            
            console.log("Status Response Status:", statusResponse.status);
            const statusData = await statusResponse.json();
            console.log("Status Response Data:", JSON.stringify(statusData, null, 2));
        }
        
    } catch (error) {
        console.error("Error:", error.message);
        console.error("Stack:", error.stack);
    }
}

testInteractionsAPI();
