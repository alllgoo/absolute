import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

/**
 * Professional HTML template with Server-Side Rendering (SSR) for OG Tags.
 * This is what Discord sees when it fetches the link.
 */
const renderOGPage = (title: string, description: string, color: string = "#97f9ff", image: string = "") => {
    // Basic Markdown to HTML converter for Discord-like styles
    const formattedDesc = description
        .replace(/\n/g, '<br>') // New lines
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/__(.*?)__/g, '<u>$1</u>') // Underline
        .replace(/`(.*?)`/g, '<code>$1</code>') // Code
        .replace(/^> (.*)/gm, '<blockquote>$1</blockquote>'); // Blockquotes

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Critical Open Graph Tags for Discord -->
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="https://absolute-seven.vercel.app/" />
    <meta property="og:type" content="website" />
    <meta name="theme-color" content="${color}">
    
    <title>${title}</title>
    <style>
        body { 
            background-color: #0f0f0f; 
            color: #dbdee1; 
            font-family: 'gg sans', 'Noto Sans', sans-serif; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            height: 100vh; 
            margin: 0; 
        }
        .card { 
            border-left: 4px solid ${color}; 
            padding: 16px 20px; 
            background: #1e1f22; 
            border-radius: 4px; 
            width: 450px; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.5); 
            display: flex;
            flex-direction: column;
        }
        .content-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        .text-content {
            flex: 1;
            margin-right: 15px;
        }
        .avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid ${color};
        }
        .author { font-size: 0.8rem; font-weight: 600; color: #fff; margin-bottom: 8px; }
        .title { font-weight: bold; font-size: 1rem; margin-bottom: 8px; color: #00a8fc; text-decoration: none; display: block; }
        .desc { color: #dbdee1; font-size: 0.9rem; line-height: 1.4; white-space: pre-wrap; }
        .desc strong { color: #fff; }
        .desc u { text-decoration: underline; }
        .desc code { background: #2b2d31; padding: 2px 4px; border-radius: 3px; font-family: monospace; }
        .desc blockquote { border-left: 4px solid #4e5058; margin: 4px 0; padding-left: 8px; color: #b5bac1; }
        .footer { font-size: 0.75rem; color: #949ba4; margin-top: 12px; }
    </style>
</head>
<body>
    <div class="card">
        <div class="author">☁️ ﾟılı ﾟ.Tokyo aid ϑρ System</div>
        <div class="content-wrapper">
            <div class="text-content">
                <div class="title">${title}</div>
                <div class="desc">${formattedDesc}</div>
            </div>
            ${image ? `<img src="${image}" class="avatar" alt="User Avatar">` : ''}
        </div>
        <div class="footer">☁️ ﾟılı ﾟ.Tokyo aid ϑρ is ready to serve</div>
    </div>
</body>
</html>`;
};


// Route for dynamic embeds -> /embed?title=TITLE&desc=DESC&image=URL
app.get('/embed', (req: Request, res: Response) => {
    const { title = "System", desc = "No description provided", image = "" } = req.query;
    res.send(renderOGPage(title as string, desc as string, "#97f9ff", image as string));
});


// Route for &join -> /join?user=NAME&vc=VC&image=URL
app.get('/join', (req: Request, res: Response) => {
    const { user = "Someone", vc = "a voice channel", image = "" } = req.query;
    res.send(renderOGPage("Voice System", `${user} has joined ${vc}`, "#97f9ff", image as string));
});


app.get('/ping', (req: Request, res: Response) => {
    const { latency = "0", api = "0", image = "" } = req.query;
    res.send(renderOGPage("Ping System", `🏓 Pong!\nLatency: ${latency}ms\nAPI Latency: ${api}ms`, "#97f9ff", image as string));
});

// Route for &play -> /play?song=NAME&user=NAME&image=URL
app.get('/play', (req: Request, res: Response) => {
    const { song = "Unknown Track", user = "Someone", image = "" } = req.query;
    res.send(renderOGPage("Music System", `🎶 Now Playing: **${song}**\nRequested by: ${user}`, "#97f9ff", image as string));
});

// Route for &uptime -> /uptime?time=TEXT&image=URL
app.get('/uptime', (req: Request, res: Response) => {
    const { time = "0s", image = "" } = req.query;
    res.send(renderOGPage("Uptime System", `🕒 Online for: ${time}`, "#97f9ff", image as string));
});

// Route for generic messages -> /message?text=TEXT&image=URL
app.get('/message', (req: Request, res: Response) => {
    const { text = "Hello from Tokyo aid ϑρ", image = "" } = req.query;
    res.send(renderOGPage("Message System", text as string, "#97f9ff", image as string));
});


app.get('/error', (req: Request, res: Response) => {
    const { msg = "An unknown error occurred", image = "" } = req.query;
    res.send(renderOGPage("Notice", msg as string, "#97f9ff", image as string));
});


app.get('/', (req: Request, res: Response) => {
    res.send(renderOGPage("ℤ𝖊𝖑𝖉𝖗𝖎𝖘 System", "System ready to serve.", "#97f9ff"));
});

app.listen(port, () => {
    console.log(`[SERVER] OG Meta Server running at http://localhost:${port}`);
});
